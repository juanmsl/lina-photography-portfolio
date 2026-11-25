import { useEventListener } from 'polpo/hooks';
import { useState, useSyncExternalStore } from 'react';

/** The shortest signed distance from `from` to `to` around a circle of `n` positions. */
export const ringOffset = (to: number, from: number, n: number) => {
  const d = (((to - from) % n) + n) % n;

  return d > n / 2 ? d - n : d;
};

export const pad = (n: number) => String(n).padStart(2, '0');

/**
 * The selected project of a category page, moving around the list as a ring
 * (after the last comes the first). The arrow keys move it too, unless the
 * focus is in a field.
 */
export const useProjectSelection = (count: number) => {
  const [active, setActive] = useState(0);
  const go = (i: number) => setActive(count ? ((i % count) + count) % count : 0);

  useEventListener('keydown', (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null;

    if (count < 2 || target?.closest('input, textarea, select, [contenteditable="true"]')) return;

    if (e.key === 'ArrowLeft') go(active - 1);

    if (e.key === 'ArrowRight') go(active + 1);
  });

  return { active, go, previous: () => go(active - 1), next: () => go(active + 1) };
};

const DESKTOP = '(min-width: 48rem)';

const subscribe = (callback: () => void) => {
  const query = window.matchMedia(DESKTOP);

  query.addEventListener('change', callback);

  return () => query.removeEventListener('change', callback);
};

/** True from the `md` breakpoint up. */
export const useIsDesktop = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP).matches,
    () => true,
  );

/** Follows a horizontal swipe on touch screens: left → next, right → previous. */
export const swipeHandlers = (onPrevious: () => void, onNext: () => void) => {
  let startX: number | undefined;

  return {
    onTouchStart: (e: React.TouchEvent) => {
      startX = e.touches[0]?.clientX;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      const end = e.changedTouches[0]?.clientX;

      if (startX === undefined || end === undefined || Math.abs(end - startX) < 40) return;

      if (end < startX) onNext();
      else onPrevious();

      startX = undefined;
    },
  };
};
