import type { PhotoId } from './photos.ts';

/**
 * A row of photos. Each one keeps its own proportions (`dimensions` in the
 * photo catalog): they share the row's height and split its width, so none is
 * cropped. On mobile, rows of three or four photos are split in two.
 */
export type PhotoRow = Array<PhotoId>;

export type Fact = { label: string; value: string };

export type Category = {
  id: 'landscape' | 'architecture' | 'people' | 'fashion' | 'product' | 'personal';
  /** First word of the divider, in Bricolage. */
  title: string;
  /** Second voice of the divider, in Instrument Serif. Named like the folders of the original photos. */
  voice: string;
};

export type Project = {
  slug: string;
  category: Category['id'];
  title: string;
  subtitle: string;
  summary: string;
  /** Extra paragraphs on the project page. */
  text?: Array<string>;
  facts: Array<Fact>;
  /** Rows shown in the portfolio (home page). */
  preview: Array<PhotoRow>;
  /** Full-bleed photo on the project page. */
  cover: PhotoId;
  /** Crop of the cover (CSS object-position), for vertical photos in the wide frame. */
  coverPosition?: string;
  /** Rows on the project page. */
  gallery: Array<PhotoRow>;
  /** Shows the same photo as a cyanotype and in color. */
  blueToColor?: PhotoId;
  /** The series reveals from blue to color on hover. */
  cyanotype?: boolean;
  /** Example project (not real work yet). */
  isExample?: boolean;
};

export const categories: Array<Category> = [
  { id: 'landscape', title: 'Fotografía', voice: 'de paisaje' },
  { id: 'architecture', title: 'Fotografía', voice: 'de arquitectura' },
  { id: 'people', title: 'Fotografía', voice: 'de personas' },
  { id: 'fashion', title: 'Fotografía', voice: 'de moda' },
  { id: 'product', title: 'Fotografía', voice: 'de producto' },
  { id: 'personal', title: 'Fotografía', voice: 'personal' },
];

export const projects: Array<Project> = [
  {
    slug: 'amazonas',
    category: 'landscape',
    title: 'Amazonas',
    subtitle: 'La magia del pulmon del mundo',
    summary:
      'Un río ancho en medio de la selva, del cielo gris al dorado del atardecer: casas sobre el agua, canoas y la primera luna de la noche.',
    facts: [
      { label: 'Tipo', value: 'Paisaje y naturaleza' },
      { label: 'Fotos', value: '5' },
    ],
    preview: [['riverSunset', 'riverHouses'], ['riverCanoe', 'crescentMoon']],
    cover: 'riverSunset',
    gallery: [['riverSunset'], ['riverHouses', 'riverCanoe'], ['goldenSky', 'crescentMoon']],
  },
  {
    slug: 'interiores',
    category: 'architecture',
    title: 'Interiores',
    subtitle: 'Arquitectura e interiores',
    summary:
      'Bares y restaurantes con su propia luz: madera, bombillos y el ambiente de cada lugar. También casas frente a un lago y un pasillo de guadua que se abre hacia la luz.',
    facts: [
      { label: 'Tipo', value: 'Arquitectura e interiores' },
      { label: 'Fotos', value: '6' },
    ],
    preview: [
      ['restaurantBar', 'barDining'],
      ['barCounter', 'restaurantHall'],
    ],
    cover: 'restaurantBar',
    gallery: [
      ['restaurantBar', 'barDining'],
      ['barCounter', 'restaurantHall'],
      ['lakeHouses', 'caneCorridor'],
    ],
  },
  {
    slug: 'compromise',
    category: 'people',
    title: 'Compromiso',
    subtitle: 'Sesión de pareja',
    summary: 'Una sesión de pareja con luz baja y velas: las manos, los anillos y los abrazos cuentan la historia.',
    facts: [
      { label: 'Tipo', value: 'Retrato de pareja' },
      { label: 'Fotos', value: '4' },
    ],
    preview: [['coupleHands', 'coupleGuitar', 'coupleEmbrace']],
    cover: 'coupleHug',
    gallery: [['coupleHug'], ['coupleHands', 'coupleGuitar', 'coupleEmbrace']],
  },
  {
    slug: 'portraits',
    category: 'fashion',
    title: 'Retratos',
    subtitle: 'Retrato y moda',
    summary: 'Retratos de estudio con luz controlada: el gesto, la piel y la textura, del color al blanco y negro.',
    facts: [
      { label: 'Tipo', value: 'Retrato y moda' },
      { label: 'Fotos', value: '4' },
    ],
    preview: [['leafPortrait', 'monochromePortrait', 'handPortrait', 'whiteShirt']],
    cover: 'leafPortrait',
    coverPosition: '50% 35%',
    gallery: [
      ['leafPortrait', 'monochromePortrait'],
      ['handPortrait', 'whiteShirt'],
    ],
  },
  {
    slug: 'gastronomy',
    category: 'product',
    title: 'Gastronomía',
    subtitle: 'Bebidas y alimentos',
    summary: 'Bebidas y alimentos: resaltando frescura, temperatura y texturas.',
    facts: [
      { label: 'Tipo', value: 'Producto' },
      { label: 'Fotos', value: '2' },
    ],
    preview: [['beer', 'iceCream']],
    cover: 'iceCream',
    coverPosition: '50% 10%',
    gallery: [
      ['beer', 'iceCream'],
    ],
  },
  {
    slug: 'beauty',
    category: 'product',
    title: 'Belleza',
    subtitle: 'Producto',
    summary: 'Perfumes y joyería: destacando colores, reflejos y detalles finos',
    facts: [
      { label: 'Tipo', value: 'Producto' },
      { label: 'Fotos', value: '2' },
    ],
    preview: [['perfume', 'necklace']],
    cover: 'necklace',
    coverPosition: '50% 60%',
    gallery: [
      ['perfume', 'necklace'],
    ],
  },
  {
    slug: 'macro',
    category: 'personal',
    title: 'Macro',
    subtitle: 'Serie personal',
    summary: 'Mi serie personal: flores, hojas y gotas de lluvia vistas muy de cerca.',
    facts: [
      { label: 'Tipo', value: 'Naturaleza y macro' },
      { label: 'Fotos', value: '5' },
    ],
    preview: [['rainFlower', 'leafDrops', 'yellowFlower']],
    cover: 'rainFlower',
    gallery: [
      ['yellowFlower', 'dryLeaf'],
      ['leafDrops', 'glassRoses'],
    ],
  },
];

export const findProject = (slug?: string) => projects.find(p => p.slug === slug);

/** The project's unique photos, in the order they appear on its page. */
export const projectPhotos = (p: Project): Array<PhotoId> => {
  const all = [p.cover, ...p.gallery.flat()];

  return all.filter((id, i) => all.indexOf(id) === i);
};

export const nextProject = (p: Project) => projects[(projects.indexOf(p) + 1) % projects.length];

export const categoryOf = (p: Project) => categories.find(c => c.id === p.category)!;
