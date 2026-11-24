/**
 * Photo catalog: Lina's photographs.
 *
 * Each file lives in `public/photos/<file>` (not committed to git: only the
 * reduced copies, ready to upload) and is uploaded with
 * `pnpm cloudinary:setup` (README → Photos on Cloudinary). If a file is
 * missing, the `Photo` component shows a dark placeholder with the description.
 */
export type PhotoId =
  | 'lina'
  | 'riverHouses'
  | 'riverCanoe'
  | 'riverSunset'
  | 'goldenSky'
  | 'crescentMoon'
  | 'barCounter'
  | 'barDining'
  | 'lakeHouses'
  | 'restaurantBar'
  | 'restaurantHall'
  | 'caneCorridor'
  | 'coupleHands'
  | 'coupleGuitar'
  | 'coupleHug'
  | 'coupleEmbrace'
  | 'leafPortrait'
  | 'monochromePortrait'
  | 'handPortrait'
  | 'whiteShirt'
  | 'beer'
  | 'perfume'
  | 'iceCream'
  | 'necklace'
  | 'glassRoses'
  | 'yellowFlower'
  | 'rainFlower'
  | 'dryLeaf'
  | 'leafDrops';

export type PhotoInfo = {
  file: string;
  /** Width and height of the file, so the enlarged view shows the whole photo without waiting for it to load. */
  dimensions: [number, number];
  /** Alt text. */
  description: string;
  /** Short name for the enlarged-photo caption. */
  title: string;
  /** Caption's second voice (region, client, technique). */
  region?: string;
  /**
   * Coordinates in degrees and minutes: [latitude degrees, minutes, longitude
   * degrees, minutes]. North and west are positive; south and east take
   * negative degrees: [4, 38, 75, 29] = 4°38′N 75°29′O, [-1, 30, 71, 30] =
   * 1°30′S 71°30′O. Below one degree south, write -0: [-0, 30, 71, 30].
   */
  coordinates?: [number, number, number, number];
  altitude?: string;
  provisional: boolean;
};

export const photos: Record<PhotoId, PhotoInfo> = {
  lina: {
    file: 'lina.jpg',
    dimensions: [863, 863],
    description: 'Esta soy yo',
    title: 'Lina Nieto',
    provisional: false,
  },
  riverHouses: {
    file: 'river-houses.jpg',
    dimensions: [2000, 3000],
    description: 'Casas de madera sobre un río ancho, con plantas flotantes y el cielo nublado',
    title: 'La orilla del cielo',
    region: 'Puerto Nariño, Amazonas',
    coordinates: [-3, 47, 70, 22],
    altitude: '80m',
    provisional: false,
  },
  riverCanoe: {
    file: 'river-canoe.jpg',
    dimensions: [2000, 3000],
    description:
      'Dos personas en una canoa sobre un río ancho, con la selva al fondo bajo un cielo con nubes, compartiendo el mismo camino',
    title: 'Dos almas y un horizonte',
    region: 'Triple Frontera, Amazonas',
    coordinates: [-4, 14, 69, 58],
    altitude: '80m',
    provisional: false,
  },
  riverSunset: {
    file: 'river-sunset.jpg',
    dimensions: [3000, 2000],
    description:
      'El sol se oculta detrás de la selva y se refleja dorado en el agua del río, como una despedida cálida antes de que llegue la noche',
    title: 'Ultimo abrazo del sol',
    region: 'Triple Frontera, Amazonas',
    coordinates: [-4, 14, 69, 58],
    altitude: '80m',
    provisional: false,
  },
  goldenSky: {
    file: 'golden-sky.jpg',
    dimensions: [2000, 3000],
    description:
      'Cielo dorado con nubes oscuras sobre la línea de árboles y el río al atardecer, donde la luz encuentra refugio en el horizonte',
    title: 'Despues del último rayo',
    region: 'Triple Frontera, Amazonas',
    coordinates: [-4, 14, 69, 58],
    altitude: '80m',
    provisional: false,
  },
  crescentMoon: {
    file: 'crescent-moon.jpg',
    dimensions: [2000, 3000],
    description:
      'Luna creciente en el cielo del anochecer, sobre la silueta de un árbol y una casa, donde dos mundos se encuentran durante unos instantes',
    title: 'El susurro de la noche',
    region: 'Amazonas, Colombia',
    coordinates: [-4, 8, 70, 1],
    altitude: '80m',
    provisional: false,
  },
  barCounter: {
    file: 'bar-counter.jpg',
    dimensions: [3000, 1916],
    description: 'Barra de un bar con banquetas de madera, estanterías de botellas iluminadas y avisos de neón',
    title: 'Detrás de la barra',
    region: 'Bogotá, Colombia',
    coordinates: [4, 36, 74, 4],
    altitude: '2600m',
    provisional: false,
  },
  barDining: {
    file: 'bar-dining.jpg',
    dimensions: [2000, 3000],
    description: 'Mesas junto a la ventana bajo lámparas de bombillos, en un bar de madera oscura con piso de baldosa',
    title: 'Junto a la ventana',
    region: 'Bogotá, Colombia',
    coordinates: [4, 36, 74, 4],
    altitude: '2600m',
    provisional: false,
  },
  lakeHouses: {
    file: 'lake-houses.jpg',
    dimensions: [3000, 2000],
    description:
      'Casas blancas con techo de teja entre los árboles, con un lago y montañas al fondo, un espacio entre tejados y montañas',
    title: 'Geografía de un hogar',
    region: 'Guatavita, Colombia',
    coordinates: [4, 56, 73, 50],
    altitude: '2668m',
    provisional: false,
  },
  restaurantBar: {
    file: 'restaurant-bar.jpg',
    dimensions: [3000, 2000],
    description: 'Restaurante con pared verde, barra de madera con botellas, mesas puestas y luces colgantes',
    title: 'Una mesa, mil historias',
    region: 'Bogotá, Colombia',
    coordinates: [4, 36, 74, 4],
    altitude: '2600m',
    provisional: false,
  },
  restaurantHall: {
    file: 'restaurant-hall.jpg',
    dimensions: [3000, 1990],
    description: 'Salón de restaurante con sillas oscuras, ventanales y un mural de pizarra con los cortes de la res',
    title: 'Corte a la carta',
    region: 'Bogotá, Colombia',
    coordinates: [4, 36, 74, 4],
    altitude: '2600m',
    provisional: false,
  },
  caneCorridor: {
    file: 'cane-corridor.jpg',
    dimensions: [2000, 3000],
    description: 'Pasillo con muros de guadua y puertas de madera que se repiten hasta una salida llena de luz',
    title: 'Geometria del silencio',
    region: 'Amazonas, Colombia',
    coordinates: [-4, 8, 70, 1],
    altitude: '80m',
    provisional: false,
  },
  coupleHands: {
    file: 'couple-hands.jpg',
    dimensions: [2000, 3000],
    description: 'Manos de una pareja entrelazadas sobre fondo oscuro; ella lleva un anillo de compromiso',
    title: 'La forma de una promesa',
    provisional: false,
  },
  coupleGuitar: {
    file: 'couple-guitar.jpg',
    dimensions: [2000, 3000],
    description: 'Manos de una pareja con sus anillos de compromiso sobre el mástil de una guitarra',
    title: 'Balada de una promesa',
    provisional: false,
  },
  coupleHug: {
    file: 'couple-hug.jpg',
    dimensions: [3000, 2000],
    description: 'Pareja abrazándose y sonriendo en un balcón de madera decorado con velas y enredaderas',
    title: 'Sin cortes ni ensayos',
    provisional: false,
  },
  coupleEmbrace: {
    file: 'couple-embrace.jpg',
    dimensions: [2000, 3000],
    description: 'Pareja abrazada con los ojos cerrados; ella apoya la mano en el pecho de él',
    title: 'A un latido de distancia',
    provisional: false,
  },
  leafPortrait: {
    file: 'leaf-portrait.jpg',
    dimensions: [1638, 2048],
    description:
      'Mujer de labios rojos con el brazo tatuado sosteniendo una hoja verde sobre su cabeza, en fondo negro',
    title: 'La piel también florece',
    provisional: false,
  },
  monochromePortrait: {
    file: 'monochrome-portrait.jpg',
    dimensions: [1638, 2048],
    description:
      'Retrato en blanco y negro de un hombre sin camisa, con los ojos cerrados y los brazos cruzados alrededor de la cabeza y sobre el pecho',
    title: 'El peso de lo invisible',
    provisional: false,
  },
  handPortrait: {
    file: 'hand-portrait.jpg',
    dimensions: [2000, 3000],
    description: 'Hombre con barba que se cubre parte del rostro con la mano y mira entre los dedos en fondo blanco',
    title: 'Donde los ojos no ceden',
    provisional: false,
  },
  whiteShirt: {
    file: 'white-shirt.jpg',
    dimensions: [2000, 3000],
    description: 'Mujer de cabello largo con camisa blanca, la mano en el mentón y la mirada hacia arriba',
    title: 'En algun lugar de la mente',
    provisional: false,
  },
  beer: {
    file: 'beer.jpg',
    dimensions: [1638, 2048],
    description: 'Botella, vaso y lata de cerveza rubia suspendidos sobre un fondo amarillo y blanco',
    title: 'Dulce desobediencia',
    provisional: false,
  },
  perfume: {
    file: 'perfume.jpg',
    dimensions: [1638, 2048],
    description: 'Frasco de perfume azul sobre un fondo turquesa cubierto de gotas de agua',
    title: 'Una dosis de eternidad',
    provisional: false,
  },
  iceCream: {
    file: 'ice-cream.jpg',
    dimensions: [2000, 3000],
    description: 'Bola de helado en un vaso de cristal tallado, con flores rosadas sobre una base de mármol',
    title: 'Donde florece el sabor',
    provisional: false,
  },
  necklace: {
    file: 'necklace.jpg',
    dimensions: [2000, 3000],
    description: 'Collar dorado con un dije azul sobre una superficie clara, con margaritas y luz de ventana',
    title: 'Jardín de bolsillo',
    provisional: false,
  },
  glassRoses: {
    file: 'glass-roses.jpg',
    dimensions: [2048, 1638],
    description: 'Vasos de vidrio con agua y rosas rosadas sumergidas, sobre un fondo blanco',
    title: 'Botánica experimental',
    provisional: false,
  },
  yellowFlower: {
    file: 'yellow-flower.jpg',
    dimensions: [2000, 3000],
    description: 'Flor amarilla en espiga sobre un fondo verde oscuro',
    title: 'Naturaleza en claroscuro',
    provisional: false,
  },
  rainFlower: {
    file: 'rain-flower.jpg',
    dimensions: [3000, 2000],
    description: 'Flor morada que cuelga con gotas de lluvia en los pétalos',
    title: 'La fragilidad como manifiesto',
    provisional: false,
  },
  dryLeaf: {
    file: 'dry-leaf.jpg',
    dimensions: [2000, 3000],
    description: 'Hoja seca que cuelga de una rama delgada',
    title: 'La última forma de existir',
    provisional: false,
  },
  leafDrops: {
    file: 'leaf-drops.jpg',
    dimensions: [1080, 1620],
    description: 'Hoja café cubierta de gotas de agua, vista muy de cerca',
    title: 'Pequeñas formas del infinito',
    provisional: false,
  },
};

/** Negative degrees are south (latitude) or east (longitude); -0 counts too. */
const isNegative = (degrees: number) => degrees < 0 || Object.is(degrees, -0);

/** Signed minutes of a coordinate: north and west positive, south and east negative. */
export const toMinutes = (degrees: number, minutes: number) =>
  (isNegative(degrees) ? -1 : 1) * (Math.abs(degrees) * 60 + minutes);

const formatPart = (degrees: number, minutes: number, positive: string, negative: string) =>
  `${Math.abs(degrees)}°${String(minutes).padStart(2, '0')}′${isNegative(degrees) ? negative : positive}`;

/** [-1, 30, 71, 30] → "1°30′S 71°30′O". */
export const formatCoordinates = ([latG, latM, lonG, lonM]: [number, number, number, number]) =>
  `${formatPart(latG, latM, 'N', 'S')} ${formatPart(lonG, lonM, 'O', 'E')}`;
