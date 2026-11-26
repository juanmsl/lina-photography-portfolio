/**
 * Receives the quote form and emails it to Lina with Resend (Vercel Function, `/api/contact`).
 *
 * Environment variables (Vercel → Settings → Environment Variables, also in `.env.example`):
 * - `RESEND_API_KEY`: secret key from Resend. Never goes to the browser.
 * - `CONTACT_TO`: where the requests arrive (default: Lina's email).
 * - `CONTACT_FROM`: sender on a domain verified in Resend (default: contacto@linanieto.com).
 */
const RESEND_URL = 'https://api.resend.com/emails';
const DEFAULT_TO = 'linamanigo@gmail.com';
const DEFAULT_FROM = 'Lina Nieto <contacto@linanieto.com>';

/** A person needs more than this to fill the form; bots submit at once. */
const MIN_FILL_MS = 3000;

const LIMITS = { name: 120, email: 200, whatsapp: 40, date: 10, place: 200, project: 4000, service: 60, services: 10 };

const json = (status: number, body: Record<string, unknown>) => Response.json(body, { status });

const clean = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

/** One line only: values that go into the subject must not carry line breaks. */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ');

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replace(/'/g, '&#39;');

/** "2027-03" → "marzo de 2027" */
const formatMonth = (value: string) => {
  const [year, month] = value.split('-').map(Number);

  if (!year || !month) return value;

  return new Intl.DateTimeFormat('es-CO', { month: 'long', year: 'numeric' }).format(new Date(year, month - 1, 1));
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // eslint-disable-next-line no-console -- the only way to see it in the Vercel logs
    console.error('contact: RESEND_API_KEY is not set');

    return json(500, { error: 'not-configured' });
  }

  // Only the site itself may post here.
  const origin = request.headers.get('origin');

  if (origin && new URL(origin).host !== request.headers.get('host')) return json(403, { error: 'forbidden' });

  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json(400, { error: 'invalid' });
  }

  // Bots fill the hidden field and submit instantly. They get a normal answer and nothing is sent.
  const elapsed = typeof body.elapsed === 'number' ? body.elapsed : 0;

  if (clean(body.website, 100) || elapsed < MIN_FILL_MS) return json(200, { ok: true });

  const services = (Array.isArray(body.services) ? body.services : [])
    .map(s => clean(s, LIMITS.service))
    .filter(Boolean)
    .slice(0, LIMITS.services);
  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const project = clean(body.project, LIMITS.project);
  const whatsapp = clean(body.whatsapp, LIMITS.whatsapp);
  const date = clean(body.date, LIMITS.date);
  const place = clean(body.place, LIMITS.place);

  if (!services.length || !name || !EMAIL.test(email) || !project) return json(400, { error: 'invalid' });

  const rows: Array<[string, string]> = [
    ['Servicios', services.join(', ')],
    ['Nombre', name],
    ['Correo', email],
    ['WhatsApp', whatsapp || '—'],
    ['Fecha aproximada', date ? formatMonth(date) : '—'],
    ['Lugar', place || '—'],
    ['Proyecto', project],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');
  const html = `<table style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;border-collapse:collapse">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join('')}</table>`;

  const response = await fetch(RESEND_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || DEFAULT_FROM,
      to: [process.env.CONTACT_TO || DEFAULT_TO],
      // Lina answers straight to the person.
      reply_to: email,
      subject: oneLine(`Cotización: ${services.join(', ')} · ${name}`),
      text,
      html,
    }),
  });

  if (!response.ok) {
    // eslint-disable-next-line no-console -- the only way to see it in the Vercel logs
    console.error('contact: Resend answered', response.status, await response.text());

    return json(502, { error: 'send-failed' });
  }

  return json(200, { ok: true });
}
