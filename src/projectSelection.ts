/** The shortest signed distance from `from` to `to` around a circle of `n` positions. */
export const ringOffset = (to: number, from: number, n: number) => {
  const d = (((to - from) % n) + n) % n;

  return d > n / 2 ? d - n : d;
};

export const pad = (n: number) => String(n).padStart(2, '0');
