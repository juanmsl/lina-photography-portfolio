import { photoUrls } from 'virtual:lina-photos';

import { photos, type PhotoId } from './content/photos';

/**
 * page: Lina's portrait, no watermark. tiny, small, thumb, large, full: Lina's
 * work with the watermark, from 480 px to the uploaded resolution (`Photo`
 * picks one with `sizeFor`). view: the enlarged photo.
 */
export type PhotoSize = 'page' | 'tiny' | 'small' | 'thumb' | 'large' | 'full' | 'view';

/** The watermarked sizes from sharpest to lightest, with the longest side each one can reach. */
export const LADDER: Array<[PhotoSize, number]> = [
  ['full', Infinity],
  ['large', 2400],
  ['thumb', 1600],
  ['small', 900],
  ['tiny', 480],
];

/** URL of a photo in a size: the signed Cloudinary URL, or the local file when Cloudinary is not configured. */
export const photoSrc = (id: PhotoId, size: PhotoSize) =>
  photoUrls?.[id][size] ?? `${import.meta.env.BASE_URL}photos/${photos[id].file}`;

/**
 * The lightest watermarked size that is sharp in a box of this size (CSS px),
 * like the browser does with srcset/sizes: the photo covers the box (cropped,
 * object-cover), so it needs its longest side scaled by the larger of the two
 * ratios, times the screen's pixel density (capped at 3).
 */
export const sizeFor = (id: PhotoId, boxWidth: number, boxHeight: number): PhotoSize => {
  const [width, height] = photos[id].dimensions;
  const density = Math.min(window.devicePixelRatio || 1, 3);
  const needed = Math.max(width, height) * Math.max(boxWidth / width, boxHeight / height) * density;
  const fitting = LADDER.filter(([size, max]) => size !== 'tiny' && needed <= max);

  return fitting.at(-1)?.[0] ?? 'full';
};

/** Position of a size in the ladder (higher is sharper); -1 for page and view. */
export const sharpness = (size: PhotoSize) => {
  const index = LADDER.findIndex(([s]) => s === size);

  return index < 0 ? -1 : LADDER.length - index;
};

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
