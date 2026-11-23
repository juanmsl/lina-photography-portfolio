/**
 * Shared Cloudinary settings for the setup script and the build plugins.
 * Changing a transformation here needs `pnpm cloudinary:setup` to update it in Cloudinary.
 */

/** Public ID of the watermark tile (an ordinary "upload" asset). */
export const WATERMARK_ID = 'lina/watermark';

/** Folder of the photos (stored as "authenticated" assets). */
export const photoPublicId = name => `lina/photos/${name}`;

/**
 * Watermark repeated as a grid over the whole photo. The tile
 * (scripts/cloudinary/watermark.svg) holds the LN mark already rotated -30° with
 * a transparent margin, which sets the gap between repetitions. `width` is the
 * tile's width relative to the photo's (fl_relative), so the mark keeps the same
 * relative size on every photo. The mark is white, at 40 % opacity.
 */
const tiledWatermark = width =>
  `l_${WATERMARK_ID.replace(/\//g, ':')}/c_scale,fl_relative,w_${width}/o_20/fl_layer_apply,fl_tiled`;

/** The only versions of a photo that can be delivered (Settings → Security → Strict transformations). */
export const TRANSFORMATIONS = {
  /** Lina's own portrait (hero): up to 1600 px, without watermark. */
  lina_page: 'c_limit,w_1600,h_1600/q_auto:good/f_auto',
  /*
   * Every photo of Lina's work on the pages (galleries, covers, services,
   * quote…), with the watermark: a ladder of sizes, like a srcset. Photo
   * picks the smallest one that is sharp for its box on that screen (size,
   * crop and pixel density; see src/photoLoader.ts), after showing the tiny
   * one blurred while it loads. The tile is 16 % of the width, so the marks
   * stay recognizable on photos shown small.
   */
  /** Placeholder shown blurred while the right size loads: up to 480 px, lighter quality. */
  lina_tiny: `c_limit,w_480,h_480/${tiledWatermark(0.05)}/q_auto:eco/f_auto`,
  /** Up to 900 px. */
  lina_small: `c_limit,w_900,h_900/${tiledWatermark(0.05)}/q_auto:good/f_auto`,
  /** Up to 1600 px. */
  lina_thumb: `c_limit,w_1600,h_1600/${tiledWatermark(0.05)}/q_auto:good/f_auto`,
  /** Up to 2400 px. */
  lina_large: `c_limit,w_2400,h_2400/${tiledWatermark(0.05)}/q_auto:good/f_auto`,
  /** The uploaded file at its own resolution (up to 3000 px), for the biggest boxes on dense screens. */
  lina_full: `${tiledWatermark(0.05)}/q_auto:good/f_auto`,
  /** Enlarged photo (/proyectos/:slug/foto/:n): up to 2560 px with the watermark (tile 10 % of the width). */
  lina_view: `c_limit,w_2560,h_2560/${tiledWatermark(0.05)}/q_auto:good/f_auto`,
};
