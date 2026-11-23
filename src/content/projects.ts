import type { PhotoId } from './photos.ts';

export type RowPhoto = {
  id: PhotoId;
  /** Relative width within the row (design px at 1360). */
  width: number;
};

export type PhotoRow = {
  /** Row height in the desktop design (px at 1360 wide). */
  height: number;
  photos: Array<RowPhoto>;
};

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
    slug: 'rio',
    category: 'landscape',
    title: 'Río',
    subtitle: 'Paisaje y naturaleza',
    summary:
      'Un río ancho en medio de la selva, del cielo gris al dorado del atardecer: casas sobre el agua, canoas y la primera luna de la noche.',
    facts: [
      { label: 'Tipo', value: 'Paisaje y naturaleza' },
      { label: 'Fotos', value: '5' },
    ],
    preview: [
      { height: 600, photos: [{ id: 'riverSunset', width: 1360 }] },
      {
        height: 664,
        photos: [
          { id: 'riverHouses', width: 443 },
          { id: 'riverCanoe', width: 443 },
          { id: 'crescentMoon', width: 442 },
        ],
      },
    ],
    cover: 'riverSunset',
    gallery: [
      { height: 760, photos: [{ id: 'riverSunset', width: 1360 }] },
      {
        height: 840,
        photos: [
          { id: 'riverHouses', width: 672 },
          { id: 'riverCanoe', width: 672 },
        ],
      },
      {
        height: 840,
        photos: [
          { id: 'goldenSky', width: 672 },
          { id: 'crescentMoon', width: 672 },
        ],
      },
    ],
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
      {
        height: 620,
        photos: [
          { id: 'restaurantBar', width: 930 },
          { id: 'barDining', width: 414 },
        ],
      },
      {
        height: 437,
        photos: [
          { id: 'barCounter', width: 685 },
          { id: 'restaurantHall', width: 659 },
        ],
      },
    ],
    cover: 'restaurantBar',
    gallery: [
      {
        height: 620,
        photos: [
          { id: 'restaurantBar', width: 930 },
          { id: 'barDining', width: 414 },
        ],
      },
      {
        height: 437,
        photos: [
          { id: 'barCounter', width: 685 },
          { id: 'restaurantHall', width: 659 },
        ],
      },
      {
        height: 620,
        photos: [
          { id: 'lakeHouses', width: 930 },
          { id: 'caneCorridor', width: 414 },
        ],
      },
    ],
  },
  {
    slug: 'pareja',
    category: 'people',
    title: 'Pareja',
    subtitle: 'Sesión de pareja',
    summary: 'Una sesión de pareja con luz baja y velas: las manos, los anillos y los abrazos cuentan la historia.',
    facts: [
      { label: 'Tipo', value: 'Retrato de pareja' },
      { label: 'Fotos', value: '4' },
    ],
    preview: [
      {
        height: 600,
        photos: [
          { id: 'coupleHands', width: 443 },
          { id: 'coupleGuitar', width: 443 },
          { id: 'coupleEmbrace', width: 442 },
        ],
      },
    ],
    cover: 'coupleHug',
    gallery: [
      { height: 760, photos: [{ id: 'coupleHug', width: 1360 }] },
      {
        height: 664,
        photos: [
          { id: 'coupleHands', width: 443 },
          { id: 'coupleGuitar', width: 443 },
          { id: 'coupleEmbrace', width: 442 },
        ],
      },
    ],
  },
  {
    slug: 'retratos',
    category: 'fashion',
    title: 'Retratos',
    subtitle: 'Retrato y moda',
    summary: 'Retratos de estudio con luz controlada: el gesto, la piel y la textura, del color al blanco y negro.',
    facts: [
      { label: 'Tipo', value: 'Retrato y moda' },
      { label: 'Fotos', value: '4' },
    ],
    preview: [
      {
        height: 520,
        photos: [
          { id: 'leafPortrait', width: 358 },
          { id: 'monochromePortrait', width: 358 },
          { id: 'handPortrait', width: 298 },
          { id: 'whiteShirt', width: 298 },
        ],
      },
    ],
    cover: 'leafPortrait',
    coverPosition: '50% 35%',
    gallery: [
      {
        height: 840,
        photos: [
          { id: 'leafPortrait', width: 672 },
          { id: 'monochromePortrait', width: 672 },
        ],
      },
      {
        height: 840,
        photos: [
          { id: 'handPortrait', width: 672 },
          { id: 'whiteShirt', width: 672 },
        ],
      },
    ],
  },
  {
    slug: 'bodegones',
    category: 'product',
    title: 'Bodegones',
    subtitle: 'Producto',
    summary: 'Bebidas, perfume, comida y joyería: cada producto con una luz y un color pensados para él.',
    facts: [
      { label: 'Tipo', value: 'Producto' },
      { label: 'Fotos', value: '4' },
    ],
    preview: [
      {
        height: 520,
        photos: [
          { id: 'beer', width: 358 },
          { id: 'perfume', width: 358 },
          { id: 'iceCream', width: 298 },
          { id: 'necklace', width: 298 },
        ],
      },
    ],
    cover: 'necklace',
    coverPosition: '50% 55%',
    gallery: [
      {
        height: 840,
        photos: [
          { id: 'beer', width: 672 },
          { id: 'perfume', width: 672 },
        ],
      },
      {
        height: 840,
        photos: [
          { id: 'iceCream', width: 672 },
          { id: 'necklace', width: 672 },
        ],
      },
    ],
  },
  {
    slug: 'de-cerca',
    category: 'personal',
    title: 'De cerca',
    subtitle: 'Serie personal',
    summary: 'Mi serie personal: flores, hojas y gotas de lluvia vistas muy de cerca.',
    facts: [
      { label: 'Tipo', value: 'Naturaleza y macro' },
      { label: 'Fotos', value: '5' },
    ],
    preview: [
      {
        height: 620,
        photos: [
          { id: 'rainFlower', width: 930 },
          { id: 'yellowFlower', width: 414 },
        ],
      },
    ],
    cover: 'rainFlower',
    gallery: [
      {
        height: 620,
        photos: [
          { id: 'rainFlower', width: 930 },
          { id: 'yellowFlower', width: 414 },
        ],
      },
      {
        height: 514,
        photos: [
          { id: 'dryLeaf', width: 343 },
          { id: 'leafDrops', width: 343 },
          { id: 'glassRoses', width: 642 },
        ],
      },
    ],
  },
];

export const findProject = (slug?: string) => projects.find(p => p.slug === slug);

/** The project's unique photos, in the order they appear on its page. */
export const projectPhotos = (p: Project): Array<PhotoId> => {
  const all = [p.cover, ...p.gallery.flatMap(f => f.photos.map(x => x.id))];

  return all.filter((id, i) => all.indexOf(id) === i);
};

export const nextProject = (p: Project) => projects[(projects.indexOf(p) + 1) % projects.length];

export const categoryOf = (p: Project) => categories.find(c => c.id === p.category)!;
