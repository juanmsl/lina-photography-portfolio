import { useSyncExternalStore } from 'react';

/** localStorage key; index.html reads it before the first paint. */
export const CYANOTYPE_KEY = 'lina-cyanotype';

const EVENT = 'lina-cyanotype-change';

/**
 * Cyanotype mode: every photo of Lina's work turns Prussian blue and goes back
 * to color under the pointer. It is a `data-cyanotype` attribute on <html>;
 * the photos react to it with CSS (the `cyano:` variant in index.css), so
 * nothing re-renders.
 */
export const isCyanotype = () => document.documentElement.dataset.cyanotype === 'on';

/** Turns the mode on or off and remembers the choice. */
export const setCyanotype = (on: boolean) => {
  try {
    localStorage.setItem(CYANOTYPE_KEY, on ? 'on' : 'off');
  } catch {
    // Private mode or blocked storage: the choice lasts until the page closes.
  }

  if (on) document.documentElement.dataset.cyanotype = 'on';
  else delete document.documentElement.dataset.cyanotype;

  window.dispatchEvent(new Event(EVENT));
};

const subscribe = (callback: () => void) => {
  window.addEventListener(EVENT, callback);

  return () => window.removeEventListener(EVENT, callback);
};

export const useCyanotype = () => useSyncExternalStore(subscribe, isCyanotype, () => false);
