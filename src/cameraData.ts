import { useSyncExternalStore } from 'react';

/** localStorage key of the enlarged view's "datos de toma" switch. */
const KEY = 'lina-camera-data';
const EVENT = 'lina-camera-data-change';

let current: boolean | undefined;

const read = () => {
  try {
    return localStorage.getItem(KEY) === 'on';
  } catch {
    return false;
  }
};

/** Whether the enlarged view shows the camera settings (ISO, exposure, aperture, focal length). Off by default. */
export const isCameraDataShown = () => (current ??= read());

/** Shows or hides them and remembers the choice (it also lasts until the page closes if storage is blocked). */
export const setCameraDataShown = (shown: boolean) => {
  current = shown;

  try {
    localStorage.setItem(KEY, shown ? 'on' : 'off');
  } catch {
    // Private mode or blocked storage: the module variable keeps it for this visit.
  }

  window.dispatchEvent(new Event(EVENT));
};

const subscribe = (callback: () => void) => {
  window.addEventListener(EVENT, callback);

  return () => window.removeEventListener(EVENT, callback);
};

export const useCameraDataShown = () => useSyncExternalStore(subscribe, isCameraDataShown, () => false);
