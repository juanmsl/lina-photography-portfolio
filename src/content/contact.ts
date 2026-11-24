/**
 * Contact details. All three values come from the mockup and are PENDING:
 * replace them with Lina's real ones before publishing.
 */
/** Public site domain (Vercel with a custom domain). */
export const SITE_URL = 'https://linanieto.com';

export const contact = {
  whatsappDisplay: '+57 319 595 5082',
  /** Digits only, with country code, for wa.me. */
  whatsappNumber: '573195955082',
  email: 'linamanigo@gmail.com',
  instagram: '@lix_marie',
  instagramUrl: 'https://www.instagram.com/lix_marie/',
  tiktok: '@lix_marie',
  tiktokUrl: 'https://www.tiktok.com/@lix_marie',
  base: 'Bogotá, Colombia',
  baseCoordinates: '4°36′N 74°04′O',
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const whatsappMessage = (service = '[servicio]', date = '[fecha]') =>
  `Hola Lina, vi tu portafolio y quiero cotizar una sesión de ${service} para ${date}. ¿Hablamos?`;

export const openWhatsApp = (message = whatsappMessage()) =>
  window.open(whatsappLink(message), '_blank', 'noopener,noreferrer');
