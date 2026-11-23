/**
 * Shared Cloudinary settings for the setup script and the build plugins.
 * Changing a transformation here needs `pnpm cloudinary:setup` to update it in Cloudinary.
 */

import { WATERMARK, watermarkGeometry } from './watermark.mjs';

/** Public ID of the watermark tile (an ordinary "upload" asset). */
export const WATERMARK_ID = 'lina/watermark';

/** Folder of the photos (stored as "authenticated" assets). */
export const photoPublicId = name => `lina/photos/${name}`;

/** The tile laid over the whole photo at its fixed pixel size (no fl_relative: it does not scale with the photo). */
const tiledWatermark = `l_${WATERMARK_ID.replace(/\//g, ':')}/c_scale,w_${watermarkGeometry().tile.width}/o_${WATERMARK.opacity}/fl_layer_apply,fl_tiled`;

/** The only versions of a photo that can be delivered (Settings → Security → Strict transformations). */
export const TRANSFORMATIONS = {
  /** Lina's own portrait (hero): up to 1600 px, without watermark. */
  lina_page: 'c_limit,w_1600,h_1600/q_auto:good/f_auto',
  /*
   * Every photo of Lina's work on the pages (galleries, covers, services,
   * quote…), with the watermark: a ladder of sizes, like a srcset. Photo
   * picks the smallest one that is sharp for its box on that screen (size,
   * crop and pixel density; see src/photoLoader.ts), after showing the tiny
   * one blurred while it loads.
   */
  /** Placeholder shown blurred while the right size loads: up to 480 px, lighter quality. */
  lina_tiny: `c_limit,w_480,h_480/${tiledWatermark}/q_auto:eco/f_auto`,
  /** Up to 900 px. */
  lina_small: `c_limit,w_900,h_900/${tiledWatermark}/q_auto:good/f_auto`,
  /** Up to 1600 px. */
  lina_thumb: `c_limit,w_1600,h_1600/${tiledWatermark}/q_auto:good/f_auto`,
  /** Up to 2400 px. */
  lina_large: `c_limit,w_2400,h_2400/${tiledWatermark}/q_auto:good/f_auto`,
  /** The uploaded file at its own resolution (up to 3000 px), for the biggest boxes on dense screens. */
  lina_full: `${tiledWatermark}/q_auto:good/f_auto`,
  /** Enlarged photo (/proyectos/:slug/foto/:n): up to 2560 px with the watermark. */
  lina_view: `c_limit,w_2560,h_2560/${tiledWatermark}/q_auto:good/f_auto`,
};
