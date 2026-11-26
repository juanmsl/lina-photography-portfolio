import type { QuoteRequest } from './content/quote';

type Guard = {
  /** Hidden field: people leave it empty, bots fill it. */
  website: string;
  /** Milliseconds since the form appeared; bots submit at once. */
  elapsed: number;
};

/** The server did not accept the request, or could not be reached. */
export class QuoteSendError extends Error {}

/** Sends the quote request to `/api/contact`, which emails it to Lina. */
export const sendQuote = async (data: QuoteRequest, guard: Guard) => {
  let response: Response;

  try {
    response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, ...guard }),
    });
  } catch {
    throw new QuoteSendError('network');
  }

  // `vite dev` does not run the function (`vercel dev` does): let the form be tried without it.
  if (import.meta.env.DEV && response.status === 404) {
    // eslint-disable-next-line no-console -- development hint only
    console.info('/api/contact is not served by `vite dev`; use `vercel dev` to send for real.', data);

    return;
  }

  if (!response.ok) throw new QuoteSendError(String(response.status));
};
