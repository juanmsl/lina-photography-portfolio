/**
 * Contact details. All three values come from the mockup and are PENDING:
 * replace them with Lina's real ones before publishing.
 */
/** Public site domain (GitHub Pages with a custom domain). */
export const SITE_URL = 'https://linanieto.com';

export const contact = {
  whatsappDisplay: '+57 300 000 0000',
  /** Digits only, with country code, for wa.me. */
  whatsappNumber: '573000000000',
  email: 'correo@linanieto.com',
  instagram: '@linanieto',
  instagramUrl: 'https://instagram.com/linanieto',
  base: 'Bogotá, Colombia',
  baseCoordinates: '4°36′N 74°04′O',
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const whatsappMessage = (service = '[servicio]', date = '[fecha]') =>
  `Hola Lina, vi tu portafolio y quiero cotizar una sesión de ${service} para ${date}. ¿Hablamos?`;

export const openWhatsApp = (message = whatsappMessage()) =>
  window.open(whatsappLink(message), '_blank', 'noopener,noreferrer');
