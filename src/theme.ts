import { useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light';

/** localStorage key; index.html reads it before the first paint. */
export const THEME_KEY = 'lina-theme';

const THEME_COLOR: Record<Theme, string> = { dark: '#0A0A0B', light: '#F2EFEA' };
const EVENT = 'lina-theme-change';

/** Current theme: dark unless the visitor turned the light on. The system preference is ignored on purpose. */
export const getTheme = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

const apply = (theme: Theme) => {
  const root = document.documentElement;

  if (theme === 'light') root.dataset.theme = 'light';
  else delete root.dataset.theme;

  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
  window.dispatchEvent(new Event(EVENT));
};

/**
 * Changes the theme, remembers it and animates the change: a camera flash
 * when the light turns on, a dim when it turns off (see index.css).
 */
export const setTheme = (theme: Theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Private mode or blocked storage: the choice lasts until the page closes.
  }

  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!document.startViewTransition || reduced) {
    apply(theme);

    return;
  }

  const className = theme === 'light' ? 'theme-to-light' : 'theme-to-dark';

  root.classList.add(className);
  const transition = document.startViewTransition(() => apply(theme));

  void transition.finished.finally(() => root.classList.remove(className));
};

const subscribe = (callback: () => void) => {
  window.addEventListener(EVENT, callback);

  return () => window.removeEventListener(EVENT, callback);
};

export const useTheme = () => useSyncExternalStore(subscribe, getTheme, () => 'dark' as Theme);
