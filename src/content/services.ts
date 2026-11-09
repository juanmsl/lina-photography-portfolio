import type { PhotoId } from './photos';

export type Service = { name: string; description: string; photo: PhotoId };

export const services: Array<Service> = [
  {
    name: 'Paisaje y naturaleza',
    description: 'Campañas de turismo, hoteles y proyectos que necesitan mostrar un lugar.',
    photo: 'paramo',
  },
  {
    name: 'Arquitectura e interiores',
    description: 'Espacios, fachadas y detalles para estudios, inmobiliarias y marcas.',
    photo: 'stairs',
  },
  {
    name: 'Retrato',
    description: 'Sesiones personales y de equipo, en locación y con luz natural.',
    photo: 'portrait',
  },
  {
    name: 'Moda y campañas',
    description: 'Lookbooks, campañas y editoriales para marcas de ropa y accesorios.',
    photo: 'fashion',
  },
  {
    name: 'Producto',
    description: 'Fotos de producto para tienda en línea, catálogo y redes.',
    photo: 'product',
  },
  {
    name: 'Editorial y turismo',
    description: 'Reportajes de lugar para revistas, guías y destinos.',
    photo: 'clouds',
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
  { value: 'Paisaje', photo: 'paramo' },
  { value: 'Naturaleza', photo: 'forest' },
  { value: 'Arquitectura', photo: 'brick' },
  { value: 'Retrato', photo: 'portrait' },
  { value: 'Moda', photo: 'fashion' },
  { value: 'Producto', photo: 'product' },
];
