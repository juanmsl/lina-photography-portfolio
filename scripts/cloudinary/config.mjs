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
  `l_${WATERMARK_ID.replace(/\//g, ':')}/c_scale,fl_relative,w_${width}/o_40/fl_layer_apply,fl_tiled`;

/** The only versions of a photo that can be delivered (Settings → Security → Strict transformations). */
export const TRANSFORMATIONS = {
  /** Lina's own portrait (hero): up to 1600 px, without watermark. */
  lina_page: 'c_limit,w_1600,h_1600/q_auto:good/f_auto',
  /**
   * Every photo of Lina's work on the pages (galleries, covers, services,
   * quote…): up to 1600 px with the watermark. They are shown small, so the
   * tile is bigger (16 % of the width) for the marks to stay recognizable.
   */
  lina_thumb: `c_limit,w_1600,h_1600/${tiledWatermark(0.16)}/q_auto:good/f_auto`,
  /** Enlarged photo (/proyectos/:slug/foto/:n): up to 2560 px with the watermark (tile 10 % of the width). */
  lina_view: `c_limit,w_2560,h_2560/${tiledWatermark(0.1)}/q_auto:good/f_auto`,
};
