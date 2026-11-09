import type { PhotoId } from './photos';

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
  id: 'landscape' | 'architecture' | 'people' | 'product' | 'personal';
  /** First word of the divider, in Bricolage. */
  title: string;
  /** Second voice of the divider, in Instrument Serif. */
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
  { id: 'product', title: 'Fotografía', voice: 'de producto' },
  { id: 'personal', title: 'Proyectos', voice: 'personales' },
];

export const projects: Array<Project> = [
  {
    slug: 'cordillera',
    category: 'landscape',
    title: 'Cordillera',
    subtitle: 'Serie personal',
    summary:
      'Madrugadas en el páramo y en los valles de la cordillera. Fotos hechas esperando a que la niebla se abra y la luz encuentre el relieve.',
    text: [
      'Trabajo con luz natural y sin prisa: llego antes del amanecer, observo cómo cambia el clima y vuelvo las veces que haga falta. La serie existe también en cianotipia, el azul con el que empieza cada imagen.',
    ],
    facts: [
      { label: 'Lugar', value: 'Páramo de Chingaza y Valle del Cocora' },
      { label: 'Coordenadas', value: '4°31′N 73°45′O' },
      { label: 'Rol', value: 'Fotografía y edición' },
      { label: 'Tipo', value: 'Paisaje y naturaleza' },
    ],
    preview: [
      { height: 760, photos: [{ id: 'paramo', width: 1360 }] },
      {
        height: 560,
        photos: [
          { id: 'cocora', width: 443 },
          { id: 'clouds', width: 443 },
          { id: 'forest', width: 442 },
        ],
      },
    ],
    cover: 'paramo',
    gallery: [
      {
        height: 860,
        photos: [
          { id: 'cocora', width: 672 },
          { id: 'clouds', width: 672 },
        ],
      },
      { height: 720, photos: [{ id: 'forest', width: 1360 }] },
      {
        height: 560,
        photos: [
          { id: 'paramo', width: 443 },
          { id: 'cocora', width: 443 },
          { id: 'clouds', width: 442 },
        ],
      },
    ],
    blueToColor: 'paramo',
  },
  {
    slug: 'la-candelaria',
    category: 'architecture',
    title: 'La Candelaria',
    subtitle: 'Serie personal',
    summary: 'Muros de ladrillo, escaleras y patios del centro de Bogotá. Composición limpia y luz de media tarde.',
    facts: [
      { label: 'Lugar', value: 'La Candelaria, Bogotá' },
      { label: 'Coordenadas', value: '4°35′N 74°04′O' },
      { label: 'Rol', value: 'Fotografía y edición' },
      { label: 'Tipo', value: 'Arquitectura' },
    ],
    preview: [
      {
        height: 860,
        photos: [
          { id: 'brick', width: 672 },
          { id: 'stairs', width: 672 },
        ],
      },
      { height: 520, photos: [{ id: 'brick', width: 1360 }] },
    ],
    cover: 'brick',
    gallery: [
      {
        height: 860,
        photos: [
          { id: 'stairs', width: 672 },
          { id: 'brick', width: 672 },
        ],
      },
    ],
  },
  {
    slug: 'invernadero',
    category: 'people',
    title: 'Invernadero',
    subtitle: 'Retrato · proyecto de ejemplo',
    summary: 'Retrato con luz natural entre plantas: una sesión tranquila, sin flash, donde la persona marca el ritmo.',
    facts: [
      { label: 'Lugar', value: 'Bogotá' },
      { label: 'Luz', value: 'Natural' },
      { label: 'Rol', value: 'Fotografía y edición' },
      { label: 'Tipo', value: 'Retrato' },
    ],
    preview: [
      {
        height: 760,
        photos: [
          { id: 'portrait', width: 560 },
          { id: 'portrait', width: 784 },
        ],
      },
    ],
    cover: 'portrait',
    gallery: [
      {
        height: 760,
        photos: [
          { id: 'portrait', width: 560 },
          { id: 'portrait', width: 784 },
        ],
      },
    ],
    isExample: true,
  },
  {
    slug: 'campana-textil',
    category: 'people',
    title: 'Campaña textil',
    subtitle: 'Moda · proyecto de ejemplo',
    summary: 'Lookbook en exteriores para una marca de ropa: prendas en movimiento y color del lugar.',
    facts: [
      { label: 'Lugar', value: 'Bogotá' },
      { label: 'Formato', value: 'Lookbook' },
      { label: 'Rol', value: 'Fotografía y dirección de arte' },
      { label: 'Tipo', value: 'Moda' },
    ],
    preview: [
      {
        height: 600,
        photos: [
          { id: 'fashion', width: 443 },
          { id: 'fashion', width: 443 },
          { id: 'fashion', width: 442 },
        ],
      },
    ],
    cover: 'fashion',
    gallery: [
      {
        height: 600,
        photos: [
          { id: 'fashion', width: 443 },
          { id: 'fashion', width: 443 },
          { id: 'fashion', width: 442 },
        ],
      },
    ],
    isExample: true,
  },
  {
    slug: 'bodegon',
    category: 'product',
    title: 'Bodegón',
    subtitle: 'Producto · proyecto de ejemplo',
    summary: 'Producto en estudio con luz suave y fondos limpios, pensado para tienda en línea, catálogo y redes.',
    facts: [
      { label: 'Lugar', value: 'Estudio, Chapinero' },
      { label: 'Formato', value: 'Catálogo y tienda en línea' },
      { label: 'Rol', value: 'Fotografía y edición' },
      { label: 'Tipo', value: 'Producto' },
    ],
    preview: [
      {
        height: 600,
        photos: [
          { id: 'product', width: 896 },
          { id: 'camera', width: 448 },
        ],
      },
      {
        height: 328,
        photos: [
          { id: 'product', width: 328 },
          { id: 'camera', width: 328 },
          { id: 'product', width: 328 },
          { id: 'camera', width: 328 },
        ],
      },
    ],
    cover: 'product',
    gallery: [
      {
        height: 600,
        photos: [
          { id: 'camera', width: 448 },
          { id: 'product', width: 896 },
        ],
      },
    ],
    isExample: true,
  },
  {
    slug: 'cianotipias',
    category: 'personal',
    title: 'Cianotipias',
    subtitle: 'del azul al color',
    summary:
      'Mi serie personal: cada foto existe primero en azul de Prusia, como una cianotipia, y después en color. Pasa el cursor sobre una foto para revelarla.',
    facts: [
      { label: 'Técnica', value: 'Cianotipia digital' },
      { label: 'Serie', value: 'Paisaje, arquitectura y retrato' },
    ],
    preview: [
      {
        height: 440,
        photos: [
          { id: 'paramo', width: 328 },
          { id: 'stairs', width: 328 },
          { id: 'portrait', width: 328 },
          { id: 'clouds', width: 328 },
        ],
      },
    ],
    cover: 'clouds',
    gallery: [
      {
        height: 560,
        photos: [
          { id: 'paramo', width: 443 },
          { id: 'stairs', width: 443 },
          { id: 'portrait', width: 442 },
        ],
      },
      {
        height: 560,
        photos: [
          { id: 'cocora', width: 672 },
          { id: 'brick', width: 672 },
        ],
      },
    ],
    cyanotype: true,
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
