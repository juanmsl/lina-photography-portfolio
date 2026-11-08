import type { FotoId } from './fotos';

export type Servicio = { nombre: string; descripcion: string; foto: FotoId };

export const servicios: Array<Servicio> = [
  {
    nombre: 'Paisaje y naturaleza',
    descripcion: 'Campañas de turismo, hoteles y proyectos que necesitan mostrar un lugar.',
    foto: 'paramo',
  },
  {
    nombre: 'Arquitectura e interiores',
    descripcion: 'Espacios, fachadas y detalles para estudios, inmobiliarias y marcas.',
    foto: 'escalera',
  },
  {
    nombre: 'Retrato',
    descripcion: 'Sesiones personales y de equipo, en locación y con luz natural.',
    foto: 'retrato',
  },
  {
    nombre: 'Moda y campañas',
    descripcion: 'Lookbooks, campañas y editoriales para marcas de ropa y accesorios.',
    foto: 'moda',
  },
  {
    nombre: 'Producto',
    descripcion: 'Fotos de producto para tienda en línea, catálogo y redes.',
    foto: 'producto',
  },
  {
    nombre: 'Editorial y turismo',
    descripcion: 'Reportajes de lugar para revistas, guías y destinos.',
    foto: 'nubes',
  },
];

export const pasos = [
  { titulo: 'Conversación', texto: 'Me cuentas qué necesitas, dónde y cuándo.' },
  { titulo: 'Propuesta', texto: 'Alcance, fechas y valor por escrito.' },
  { titulo: 'Sesión', texto: 'En el lugar o en estudio.' },
  { titulo: 'Entrega', texto: 'Selección editada en alta resolución.' },
];

export const preguntas = [
  {
    pregunta: '¿Cuánto cuesta una sesión?',
    respuesta:
      'Depende del alcance, el lugar y el uso de las fotos. Te envío una propuesta con el valor antes de empezar.',
  },
  {
    pregunta: '¿Qué necesito para empezar?',
    respuesta: 'Contarme qué quieres fotografiar, para qué usarás las fotos y una fecha aproximada.',
  },
  {
    pregunta: '¿Cuándo recibo las fotos?',
    respuesta: 'La fecha de entrega queda escrita en la propuesta, antes de la sesión.',
  },
  {
    pregunta: '¿Cómo te contacto?',
    respuesta: 'Por el formulario de cotización o por WhatsApp. Respondo por el canal que prefieras.',
  },
];

/** Opciones del selector con fotos de Cotizar. */
export const opcionesCotizar: Array<{ valor: string; foto: FotoId }> = [
  { valor: 'Paisaje', foto: 'paramo' },
  { valor: 'Naturaleza', foto: 'bosque' },
  { valor: 'Arquitectura', foto: 'ladrillo' },
  { valor: 'Retrato', foto: 'retrato' },
  { valor: 'Moda', foto: 'moda' },
  { valor: 'Producto', foto: 'producto' },
];
