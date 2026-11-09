export type QuoteRequest = {
  services: Array<string>;
  name: string;
  email: string;
  whatsapp: string;
  date: string;
  place: string;
  project: string;
};

/** "2027-03" → "marzo de 2027" */
export const formatMonth = (value: string) => {
  if (!value) return '';

  const [a, m] = value.split('-').map(Number);

  if (!a || !m) return value;

  return new Intl.DateTimeFormat('es-CO', { month: 'long', year: 'numeric' }).format(new Date(a, m - 1, 1));
};
