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
  riverHouses: {
    file: 'river-houses.jpg',
    description: 'Casas de madera sobre un río ancho, con plantas flotantes y el cielo nublado',
    title: 'Casas sobre el agua',
    provisional: false,
  },
  riverCanoe: {
    file: 'river-canoe.jpg',
    description: 'Dos personas en una canoa sobre un río ancho, con la selva al fondo bajo un cielo con nubes',
    title: 'Canoa',
    provisional: false,
  },
  riverSunset: {
    file: 'river-sunset.jpg',
    description: 'El sol se oculta detrás de la selva y se refleja dorado en el agua del río',
    title: 'Atardecer en el río',
    provisional: false,
  },
  goldenSky: {
    file: 'golden-sky.jpg',
    description: 'Cielo dorado con nubes oscuras sobre la línea de árboles y el río al atardecer',
    title: 'Cielo dorado',
    provisional: false,
  },
  crescentMoon: {
    file: 'crescent-moon.jpg',
    description: 'Luna creciente en el cielo del anochecer, sobre la silueta de un árbol y una casa',
    title: 'Luna creciente',
    provisional: false,
  },
  barCounter: {
    file: 'bar-counter.jpg',
    description: 'Barra de un bar con banquetas de madera, estanterías de botellas iluminadas y avisos de neón',
    title: 'Barra',
    provisional: false,
  },
  barDining: {
    file: 'bar-dining.jpg',
    description: 'Mesas junto a la ventana bajo lámparas de bombillos, en un bar de madera oscura con piso de baldosa',
    title: 'Junto a la ventana',
    provisional: false,
  },
  lakeHouses: {
    file: 'lake-houses.jpg',
    description: 'Casas blancas con techo de teja entre los árboles, con un lago y montañas al fondo',
    title: 'Casas frente al lago',
    provisional: false,
  },
  restaurantBar: {
    file: 'restaurant-bar.jpg',
    description: 'Restaurante con pared verde, barra de madera con botellas, mesas puestas y luces colgantes',
    title: 'Restaurante',
    provisional: false,
  },
  restaurantHall: {
    file: 'restaurant-hall.jpg',
    description: 'Salón de restaurante con sillas oscuras, ventanales y un mural de pizarra con los cortes de la res',
    title: 'Salón',
    provisional: false,
  },
  caneCorridor: {
    file: 'cane-corridor.jpg',
    description: 'Pasillo con muros de guadua y puertas de madera que se repiten hasta una salida llena de luz',
    title: 'Pasillo de guadua',
    provisional: false,
  },
  coupleHands: {
    file: 'couple-hands.jpg',
    description: 'Manos de una pareja entrelazadas sobre fondo oscuro; ella lleva un anillo de compromiso',
    title: 'Anillo',
    provisional: false,
  },
  coupleGuitar: {
    file: 'couple-guitar.jpg',
    description: 'Manos de una pareja con sus anillos sobre el mástil de una guitarra',
    title: 'Guitarra',
    provisional: false,
  },
  coupleHug: {
    file: 'couple-hug.jpg',
    description: 'Pareja abrazándose y sonriendo en un balcón de madera decorado con velas y enredaderas',
    title: 'Abrazo',
    provisional: false,
  },
  coupleEmbrace: {
    file: 'couple-embrace.jpg',
    description: 'Pareja abrazada con los ojos cerrados; ella apoya la mano en el pecho de él',
    title: 'Juntos',
    provisional: false,
  },
  leafPortrait: {
    file: 'leaf-portrait.jpg',
    description:
      'Mujer de labios rojos con el brazo tatuado sosteniendo una hoja verde sobre su cabeza, en fondo negro',
    title: 'Bajo la hoja',
    provisional: false,
  },
  monochromePortrait: {
    file: 'monochrome-portrait.jpg',
    description:
      'Retrato en blanco y negro de un hombre sin camisa, con los ojos cerrados y los brazos cruzados alrededor de la cabeza',
    title: 'Blanco y negro',
    provisional: false,
  },
  handPortrait: {
    file: 'hand-portrait.jpg',
    description: 'Hombre con barba que se cubre parte del rostro con la mano y mira entre los dedos',
    title: 'Entre los dedos',
    provisional: false,
  },
  whiteShirt: {
    file: 'white-shirt.jpg',
    description: 'Mujer de cabello largo con camisa blanca, la mano en el mentón y la mirada hacia arriba',
    title: 'Camisa blanca',
    provisional: false,
  },
  beer: {
    file: 'beer.jpg',
    description: 'Botella, vaso y lata de cerveza rubia de miel suspendidos sobre un fondo amarillo y blanco',
    title: 'Cerveza de miel',
    provisional: false,
  },
  perfume: {
    file: 'perfume.jpg',
    description: 'Frasco de perfume azul sobre un fondo turquesa cubierto de gotas de agua',
    title: 'Perfume',
    provisional: false,
  },
  iceCream: {
    file: 'ice-cream.jpg',
    description: 'Bola de helado en un vaso de cristal tallado, con flores rosadas sobre una base de mármol',
    title: 'Helado',
    provisional: false,
  },
  necklace: {
    file: 'necklace.jpg',
    description: 'Collar dorado con un dije azul sobre una superficie clara, con margaritas y luz de ventana',
    title: 'Collar',
    provisional: false,
  },
  glassRoses: {
    file: 'glass-roses.jpg',
    description: 'Vasos de vidrio con agua y rosas rosadas sumergidas, sobre un fondo blanco',
    title: 'Rosas en el agua',
    provisional: false,
  },
  yellowFlower: {
    file: 'yellow-flower.jpg',
    description: 'Flor amarilla en espiga sobre un fondo verde oscuro',
    title: 'Flor amarilla',
    provisional: false,
  },
  rainFlower: {
    file: 'rain-flower.jpg',
    description: 'Flor morada que cuelga con gotas de lluvia en los pétalos',
    title: 'Después de la lluvia',
    provisional: false,
  },
  dryLeaf: {
    file: 'dry-leaf.jpg',
    description: 'Hoja seca que cuelga de una rama delgada',
    title: 'Hoja seca',
    provisional: false,
  },
  leafDrops: {
    file: 'leaf-drops.jpg',
    description: 'Hoja café cubierta de gotas de agua, vista muy de cerca',
    title: 'Gotas',
    provisional: false,
  },
};

export const formatCoordinates = ([latG, latM, lonG, lonM]: [number, number, number, number]) =>
  `${latG}°${String(latM).padStart(2, '0')}′N ${lonG}°${String(lonM).padStart(2, '0')}′O`;
