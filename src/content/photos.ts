/**
 * Photo catalog.
 *
 * All of them except `lina` are PROVISIONAL: reference images from the mockups
 * ("Fotos provisionales" page in the Figma file). Replace them with Lina's real
 * photographs before publishing by placing the file at `public/photos/<file>`.
 * If a file is missing, the `Photo` component shows a dark placeholder with the
 * description.
 */
export type PhotoId =
  | 'lina'
  | 'paramo'
  | 'cocora'
  | 'clouds'
  | 'forest'
  | 'brick'
  | 'stairs'
  | 'portrait'
  | 'fashion'
  | 'product'
  | 'camera';

export type PhotoInfo = {
  file: string;
  /** Alt text. */
  description: string;
  /** Short name for the enlarged-photo caption. */
  title: string;
  /** Caption's second voice (region, client, technique). */
  region?: string;
  /** Coordinates in degrees and minutes, e.g. [4, 38, 75, 29] = 4°38′N 75°29′W. */
  coordinates?: [number, number, number, number];
  altitude?: string;
  provisional: boolean;
};

export const photos: Record<PhotoId, PhotoInfo> = {
  lina: {
    file: 'lina.jpg',
    description: 'Retrato de Lina Nieto con gafas y cabello rizado',
    title: 'Lina Nieto',
    provisional: false,
  },
  paramo: {
    file: 'paramo.jpg',
    description: 'Páramo con frailejones al amanecer',
    title: 'Páramo de Chingaza',
    region: 'Cundinamarca, Colombia',
    coordinates: [4, 31, 73, 45],
    altitude: '3.200 m',
    provisional: true,
  },
  cocora: {
    file: 'cocora.jpg',
    description: 'Valle con palmas de cera entre la niebla',
    title: 'Valle del Cocora',
    region: 'Quindío, Colombia',
    coordinates: [4, 38, 75, 29],
    altitude: '2.400 m',
    provisional: true,
  },
  clouds: {
    file: 'clouds.jpg',
    description: 'Mar de nubes sobre la cordillera',
    title: 'Mar de nubes',
    region: 'Cordillera Oriental, Colombia',
    coordinates: [4, 33, 73, 47],
    provisional: true,
  },
  forest: {
    file: 'forest.jpg',
    description: 'Bosque de niebla con musgo en los troncos',
    title: 'Bosque de niebla',
    region: 'Cundinamarca, Colombia',
    coordinates: [4, 32, 73, 44],
    provisional: true,
  },
  brick: {
    file: 'brick.jpg',
    description: 'Edificio de ladrillo con luz de media tarde',
    title: 'Muro de ladrillo',
    region: 'La Candelaria, Bogotá',
    coordinates: [4, 35, 74, 4],
    provisional: true,
  },
  stairs: {
    file: 'stairs.jpg',
    description: 'Escalera de concreto con sombras marcadas',
    title: 'Escalera',
    region: 'La Candelaria, Bogotá',
    coordinates: [4, 35, 74, 4],
    provisional: true,
  },
  portrait: {
    file: 'portrait.jpg',
    description: 'Retrato con luz natural entre plantas',
    title: 'Invernadero',
    region: 'Bogotá, Colombia',
    provisional: true,
  },
  fashion: {
    file: 'fashion.jpg',
    description: 'Prenda en movimiento en exteriores',
    title: 'Campaña textil',
    region: 'Bogotá, Colombia',
    provisional: true,
  },
  product: {
    file: 'product.jpg',
    description: 'Producto sobre fondo limpio con luz suave',
    title: 'Bodegón',
    region: 'Estudio, Chapinero',
    provisional: true,
  },
  camera: {
    file: 'camera.jpg',
    description: 'Cámara analógica sobre una mesa',
    title: 'Cámara',
    region: 'Estudio, Chapinero',
    provisional: true,
  },
};

export const formatCoordinates = ([latG, latM, lonG, lonM]: [number, number, number, number]) =>
  `${latG}°${String(latM).padStart(2, '0')}′N ${lonG}°${String(lonM).padStart(2, '0')}′O`;
