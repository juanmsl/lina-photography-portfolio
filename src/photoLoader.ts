import { photoUrls } from 'virtual:lina-photos';

import { photos, type PhotoId } from './content/photos';

/**
 * page: Lina's portrait, no watermark. small / thumb: watermarked, up to 900 /
 * 1600 px (`Photo` picks one from the box's width). view: the enlarged photo.
 */
export type PhotoSize = 'page' | 'small' | 'thumb' | 'view';

/** Widest box, in device pixels, served with the `small` version. */
const SMALL_MAX_WIDTH = 900;

/** URL of a photo in a size: the signed Cloudinary URL, or the local file when Cloudinary is not configured. */
export const photoSrc = (id: PhotoId, size: PhotoSize) =>
  photoUrls?.[id][size] ?? `${import.meta.env.BASE_URL}photos/${photos[id].file}`;

/** The watermarked version that is sharp enough for a box this wide (CSS px) on this screen. */
export const sizeForWidth = (cssWidth: number): 'small' | 'thumb' =>
  cssWidth * (window.devicePixelRatio || 1) <= SMALL_MAX_WIDTH ? 'small' : 'thumb';

const loaded = new Map<string, string>();
const loading = new Map<string, Promise<string>>();

/** `blob:` URL of a photo that was already downloaded during this visit, if any. */
export const loadedPhoto = (src: string) => loaded.get(src);

/**
 * Downloads a photo once per visit and resolves to a `blob:` URL, so "copy
 * image address" and the element inspector do not show the Cloudinary URL.
 * Simultaneous and later calls for the same URL share the download, and the
 * blob is kept for the whole visit (never revoked): a photo seen before, or
 * preloaded, shows instantly. If the download fails it resolves to the plain
 * URL (a missing photo then shows the placeholder) and is not cached, so a
 * later call tries again.
 */
export const loadPhoto = (src: string): Promise<string> => {
  const done = loaded.get(src);

  if (done) return Promise.resolve(done);

  const current = loading.get(src);

  if (current) return current;

  const promise = fetch(src)
    .then(response => {
      if (!response.ok) throw new Error(String(response.status));

      return response.blob();
    })
    .then(blob => {
      const url = URL.createObjectURL(blob);

      loaded.set(src, url);

      return url;
    })
    .catch(() => src)
    .finally(() => loading.delete(src));

  loading.set(src, promise);

  return promise;
};

/** Starts downloading a photo in the background (the viewer's neighbors, a gallery photo on hover). */
export const preloadPhoto = (id: PhotoId, size: PhotoSize) => {
  void loadPhoto(photoSrc(id, size));
};
