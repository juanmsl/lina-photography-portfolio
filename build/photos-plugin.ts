import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

import { v2 as cloudinary } from 'cloudinary';

import { photoPublicId } from '../scripts/cloudinary/config.mjs';
import { photos, type PhotoId } from '../src/content/photos.ts';

import type { Plugin, ResolvedConfig } from 'vite';

const VIRTUAL_ID = 'virtual:lina-photos';
const RESOLVED_ID = `\0${VIRTUAL_ID}`;

export type PhotoSize = 'page' | 'thumb' | 'view';
export type PhotoUrls = Record<PhotoId, Record<PhotoSize, string>>;

/**
 * Signed Cloudinary URL of every photo in each allowed size, or `null` without
 * CLOUDINARY_URL. Signed here, at build time, with the API secret from the
 * environment: only the finished URLs reach the browser and the HTML, never the
 * secret and never an URL to the original. Each URL uses a named transformation
 * (page: no watermark, for photos that cannot be enlarged; thumb: watermarked,
 * for photos that open the enlarged view; view: the enlarged photo, bigger and
 * watermarked), so editing it does not give access to anything else.
 */
export const signPhotoUrls = (cloudinaryUrl?: string): PhotoUrls | null => {
  if (!cloudinaryUrl) return null;

  const { hostname: cloud_name, username: api_key, password: api_secret } = new URL(cloudinaryUrl);
  const urls = {} as PhotoUrls;

  for (const [id, info] of Object.entries(photos) as Array<[PhotoId, (typeof photos)[PhotoId]]>) {
    const publicId = photoPublicId(info.file.replace(/\.[^.]+$/, ''));
    const url = (name: string) =>
      cloudinary.url(publicId, {
        cloud_name,
        api_key,
        api_secret: decodeURIComponent(api_secret),
        type: 'authenticated',
        sign_url: true,
        secure: true,
        transformation: [{ transformation: name }],
      });

    urls[id] = { page: url('lina_page'), thumb: url('lina_thumb'), view: url('lina_view') };
  }

  return urls;
};

/**
 * Exposes `virtual:lina-photos` with the signed URLs (see `signPhotoUrls`), or
 * `null` when CLOUDINARY_URL is not set: the site then uses the local files in
 * public/photos.
 */
export const photosPlugin = (cloudinaryUrl?: string): Plugin => {
  let config: ResolvedConfig;

  return {
    name: 'lina-photos',
    configResolved(resolved) {
      config = resolved;
    },
    /*
     * With Cloudinary the originals in public/photos must not be published:
     * remove the copy Vite makes in the build output.
     */
    async closeBundle() {
      if (cloudinaryUrl && config.command === 'build') {
        await rm(resolve(config.root, config.build.outDir, 'photos'), { recursive: true, force: true });
      }
    },
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined;
    },
    load(id) {
      if (id !== RESOLVED_ID) return undefined;

      return `export const photoUrls = ${JSON.stringify(signPhotoUrls(cloudinaryUrl))};`;
    },
  };
};
