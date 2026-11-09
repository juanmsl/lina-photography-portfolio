/**
 * Datos de contacto. Los tres valores son los del mockup y están PENDIENTES:
 * reemplazar por los reales de Lina antes de publicar.
 */
/** Dominio público del sitio (GitHub Pages con dominio propio). */
export const SITIO_URL = 'https://lina.aureostudio.co';

export const contacto = {
  whatsappVisible: '+57 300 000 0000',
  /** Solo dígitos, con indicativo de país, para wa.me. */
  whatsappNumero: '573000000000',
  correo: 'correo@linanieto.com',
  instagram: '@linanieto',
  instagramUrl: 'https://instagram.com/linanieto',
  base: 'Bogotá, Colombia',
  coordenadasBase: '4°36′N 74°04′O',
};

export const enlaceWhatsApp = (mensaje: string) =>
  `https://wa.me/${contacto.whatsappNumero}?text=${encodeURIComponent(mensaje)}`;

export const mensajeWhatsApp = (servicio = '[servicio]', fecha = '[fecha]') =>
  `Hola Lina, vi tu portafolio y quiero cotizar una sesión de ${servicio} para ${fecha}. ¿Hablamos?`;

export const abrirWhatsApp = (mensaje = mensajeWhatsApp()) =>
  window.open(enlaceWhatsApp(mensaje), '_blank', 'noopener,noreferrer');
