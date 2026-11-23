/**
 * crypto.randomUUID only exists in secure contexts (HTTPS or localhost). Polpo's
 * form fields use it for their ids, so opening the dev server from another
 * device by its IP (`pnpm dev:lan`, plain http) would break them. This fills it
 * in with crypto.getRandomValues, which works everywhere. It does nothing in
 * production (HTTPS) or on browsers that already have it.
 */
if (typeof crypto !== 'undefined' && typeof crypto.randomUUID !== 'function') {
  crypto.randomUUID = () => {
    const bytes = crypto.getRandomValues(new Uint8Array(16));

    // RFC 4122 version 4: set the version (0100) and variant (10xx) bits.
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');

    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}` as ReturnType<
      Crypto['randomUUID']
    >;
  };
}
