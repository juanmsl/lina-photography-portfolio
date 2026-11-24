import type { PhotoId } from './photos';

export type Service = { name: string; description: string; photo: PhotoId };

export const services: Array<Service> = [
  {
    name: 'Paisaje y naturaleza',
    description: 'Campañas de turismo, hoteles y proyectos que necesitan mostrar un lugar.',
    photo: 'riverSunset',
  },
  {
    name: 'Arquitectura e interiores',
    description: 'Espacios, fachadas y detalles para estudios, inmobiliarias y marcas.',
    photo: 'restaurantBar',
  },
  {
    name: 'Retrato y eventos',
    description: 'Sesiones personales y de equipo, en locación y con luz natural.',
    photo: 'coupleHug',
  },
  {
    name: 'Moda y campañas',
    description: 'Lookbooks, campañas y editoriales para marcas de ropa y accesorios.',
    photo: 'leafPortrait',
  },
  {
    name: 'Producto',
    description: 'Fotos de producto para tienda en línea, catálogo y redes.',
    photo: 'necklace',
  },
];

export const steps = [
  { title: 'Conversación', text: 'Me cuentas qué necesitas, dónde y cuándo.' },
  { title: 'Propuesta', text: 'Alcance, fechas y valor por escrito.' },
  { title: 'Sesión', text: 'En el lugar o en estudio.' },
  { title: 'Entrega', text: 'Selección editada en alta resolución.' },
];

export const faqs = [
  {
    question: '¿Cuánto cuesta una sesión?',
    answer:
      'Depende del alcance, el lugar y el uso de las fotos. Te envío una propuesta con el valor antes de empezar.',
  },
  {
    question: '¿Qué necesito para empezar?',
    answer: 'Contarme qué quieres fotografiar, para qué usarás las fotos y una fecha aproximada.',
  },
  {
    question: '¿Cuándo recibo las fotos?',
    answer: 'La fecha de entrega queda escrita en la propuesta, antes de la sesión.',
  },
  {
    question: '¿Cómo te contacto?',
    answer: 'Por el formulario de cotización o por WhatsApp. Respondo por el canal que prefieras.',
  },
];

/** Options for the photo tile picker on the quote page. */
export const quoteOptions: Array<{ value: string; photo: PhotoId }> = [
  { value: 'Paisaje', photo: 'goldenSky' },
  { value: 'Naturaleza', photo: 'rainFlower' },
  { value: 'Arquitectura', photo: 'restaurantBar' },
  { value: 'Retrato', photo: 'handPortrait' },
  { value: 'Moda', photo: 'leafPortrait' },
  { value: 'Producto', photo: 'necklace' },
];
