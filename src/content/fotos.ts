/**
 * Catálogo de fotografías.
 *
 * Todas, salvo `lina`, son PROVISIONALES: imágenes de referencia de los mockups
 * (página "Fotos provisionales" del archivo de Figma). Reemplazarlas por las
 * fotografías reales de Lina antes de publicar, dejando el archivo en
 * `public/fotos/<archivo>`. Si un archivo no existe, el componente `Foto`
 * muestra un marcador oscuro con la descripción.
 */
export type FotoId =
  | 'lina'
  | 'paramo'
  | 'cocora'
  | 'nubes'
  | 'bosque'
  | 'ladrillo'
  | 'escalera'
  | 'retrato'
  | 'moda'
  | 'producto'
  | 'camara';

export type FotoInfo = {
  archivo: string;
  /** Texto alternativo. */
  descripcion: string;
  /** Nombre corto para el pie de la foto ampliada. */
  titulo: string;
  /** Segunda voz del pie (región, cliente, técnica). */
  region?: string;
  /** Coordenadas en grados y minutos, p. ej. [4, 38, 75, 29] = 4°38′N 75°29′O. */
  coordenadas?: [number, number, number, number];
  altitud?: string;
  provisional: boolean;
};

export const fotos: Record<FotoId, FotoInfo> = {
  lina: {
    archivo: 'lina.jpg',
    descripcion: 'Retrato de Lina Nieto con gafas y cabello rizado',
    titulo: 'Lina Nieto',
    provisional: false,
  },
  paramo: {
    archivo: 'paramo.jpg',
    descripcion: 'Páramo con frailejones al amanecer',
    titulo: 'Páramo de Chingaza',
    region: 'Cundinamarca, Colombia',
    coordenadas: [4, 31, 73, 45],
    altitud: '3.200 m',
    provisional: true,
  },
  cocora: {
    archivo: 'cocora.jpg',
    descripcion: 'Valle con palmas de cera entre la niebla',
    titulo: 'Valle del Cocora',
    region: 'Quindío, Colombia',
    coordenadas: [4, 38, 75, 29],
    altitud: '2.400 m',
    provisional: true,
  },
  nubes: {
    archivo: 'nubes.jpg',
    descripcion: 'Mar de nubes sobre la cordillera',
    titulo: 'Mar de nubes',
    region: 'Cordillera Oriental, Colombia',
    coordenadas: [4, 33, 73, 47],
    provisional: true,
  },
  bosque: {
    archivo: 'bosque.jpg',
    descripcion: 'Bosque de niebla con musgo en los troncos',
    titulo: 'Bosque de niebla',
    region: 'Cundinamarca, Colombia',
    coordenadas: [4, 32, 73, 44],
    provisional: true,
  },
  ladrillo: {
    archivo: 'ladrillo.jpg',
    descripcion: 'Edificio de ladrillo con luz de media tarde',
    titulo: 'Muro de ladrillo',
    region: 'La Candelaria, Bogotá',
    coordenadas: [4, 35, 74, 4],
    provisional: true,
  },
  escalera: {
    archivo: 'escalera.jpg',
    descripcion: 'Escalera de concreto con sombras marcadas',
    titulo: 'Escalera',
    region: 'La Candelaria, Bogotá',
    coordenadas: [4, 35, 74, 4],
    provisional: true,
  },
  retrato: {
    archivo: 'retrato.jpg',
    descripcion: 'Retrato con luz natural entre plantas',
    titulo: 'Invernadero',
    region: 'Bogotá, Colombia',
    provisional: true,
  },
  moda: {
    archivo: 'moda.jpg',
    descripcion: 'Prenda en movimiento en exteriores',
    titulo: 'Campaña textil',
    region: 'Bogotá, Colombia',
    provisional: true,
  },
  producto: {
    archivo: 'producto.jpg',
    descripcion: 'Producto sobre fondo limpio con luz suave',
    titulo: 'Bodegón',
    region: 'Estudio, Chapinero',
    provisional: true,
  },
  camara: {
    archivo: 'camara.jpg',
    descripcion: 'Cámara analógica sobre una mesa',
    titulo: 'Cámara',
    region: 'Estudio, Chapinero',
    provisional: true,
  },
};

export const formatoCoordenadas = ([latG, latM, lonG, lonM]: [number, number, number, number]) =>
  `${latG}°${String(latM).padStart(2, '0')}′N ${lonG}°${String(lonM).padStart(2, '0')}′O`;
