export type SolicitudCotizacion = {
  servicios: string[];
  nombre: string;
  correo: string;
  whatsapp: string;
  fecha: string;
  lugar: string;
  proyecto: string;
};

/** "2027-03" → "marzo de 2027" */
export const formatoMes = (valor: string) => {
  if (!valor) return '';
  const [a, m] = valor.split('-').map(Number);
  if (!a || !m) return valor;
  return new Intl.DateTimeFormat('es-CO', { month: 'long', year: 'numeric' }).format(new Date(a, m - 1, 1));
};
