import { cn } from 'polpo/helpers';
import { useInView } from 'polpo/hooks';
import { useEffect, useState, type MouseEvent, type RefObject } from 'react';

import { photos, type PhotoId } from '../content/photos';
import { loadedPhoto, loadPhoto, photoSrc, sizeForWidth, type PhotoSize } from '../photoLoader';

type PhotoProps = {
  id: PhotoId;
  className?: string;
  /** `fixed`: always Prussian blue. `reveal`: blue that turns to color on hover or tap. */
  cyanotype?: 'fixed' | 'reveal';
  /** Black and white (hero). */
  grayscale?: boolean;
  /** Eager loading for photos visible when the page opens. */
  priority?: boolean;
  /** Crop adjustment (CSS object-position). */
  position?: string;
  /** Hides the placeholder description when the file is missing (small boxes). */
  silentPlaceholder?: boolean;
  /**
   * thumb: with the tiled watermark (default): every photo of Lina's work, in
   * the 900 or 1600 px version depending on how wide the box is.
   * page: without watermark, only for Lina's own portrait.
   * view: the enlarged photo, bigger and watermarked.
   */
  size?: 'page' | 'thumb' | 'view';
};

const preventSave = (e: MouseEvent) => e.preventDefault();

/**
 * The `blob:` URL of `src` (see `loadPhoto`): right away when it was already
 * downloaded in this visit, otherwise once the download ends.
 */
const useLoadedPhoto = (src?: string) => {
  const [result, setResult] = useState<{ src: string; url: string }>();

  useEffect(() => {
    if (!src || loadedPhoto(src)) return undefined;

    let active = true;

    void loadPhoto(src).then(url => {
      if (active) setResult({ src, url });
    });

    return () => {
      active = false;
    };
  }, [src]);

  if (!src) return undefined;

  return loadedPhoto(src) ?? (result?.src === src ? result.url : undefined);
};

/**
 * Full-bleed photograph inside its box; the container decides the size.
 * With Cloudinary configured it loads a signed version (watermarked, except
 * Lina's portrait; see build/photos-plugin.ts) through a `blob:` URL, once the
 * photo gets close to the viewport (right away with `priority`). Photos are
 * downloaded once per visit (src/photoLoader.ts). The enlarged view first shows
 * the smaller version if it was already loaded, then swaps to the big one.
 * Right click, drag and the iOS long-press menu are disabled as a light
 * deterrent. If the file does not exist, it shows a dark placeholder with the
 * description so the layout does not break.
 */
export const Photo = ({
  id,
  className,
  cyanotype,
  grayscale,
  priority,
  position,
  silentPlaceholder,
  size = 'thumb',
}: PhotoProps) => {
  const info = photos[id];
  const [revealed, setRevealed] = useState(false);
  const reveals = cyanotype === 'reveal';
  // Follows the cyanotype switch (src/cyanotype.ts): every photo of her work, not her own portrait.
  const followsMode = !cyanotype && size !== 'page';
  const { ref, inView } = useInView({ rootMargin: '400px' });
  const [version, setVersion] = useState<PhotoSize>();
  const [failedSrc, setFailedSrc] = useState<string>();

  // Pick the version when the photo is about to be seen: for watermarked photos, by the box's width.
  useEffect(() => {
    if (version || !(priority || inView)) return;

    const width = (ref as RefObject<HTMLElement>).current?.getBoundingClientRect().width ?? Infinity;

    setVersion(size === 'thumb' ? sizeForWidth(width) : size);
  }, [version, priority, inView, ref, size]);

  const src = version && photoSrc(id, version);
  const loaded = useLoadedPhoto(src);
  // While the enlarged photo downloads, show the gallery version if it is already here.
  const preview =
    size === 'view' && !loaded ? (loadedPhoto(photoSrc(id, 'thumb')) ?? loadedPhoto(photoSrc(id, 'small'))) : undefined;
  const shown = loaded ?? preview;
  const failed = shown !== undefined && shown === failedSrc;

  const content = (
    <>
      {failed ? (
        <span className='absolute inset-0 grid place-content-center gap-1 bg-[radial-gradient(120%_90%_at_50%_40%,var(--color-charcoal),var(--color-ink))] p-4 text-center'>
          {!silentPlaceholder && (
            <>
              <span className='font-code t-small text-ash'>{info.description}</span>
              {info.provisional && <span className='font-code t-small text-graphite'>foto provisional</span>}
            </>
          )}
        </span>
      ) : (
        shown && (
          <img
            src={shown}
            alt={info.description}
            decoding='async'
            draggable={false}
            onDragStart={preventSave}
            onError={() => setFailedSrc(shown)}
            style={position ? { objectPosition: position } : undefined}
            className={cn(
              'absolute inset-0 size-full object-cover transition-[filter] duration-700 ease-out motion-reduce:transition-none',
              (grayscale || cyanotype) && 'grayscale',
              cyanotype && 'contrast-[1.15] brightness-[1.05]',
              reveals && 'group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100',
              reveals && revealed && 'grayscale-0 contrast-100 brightness-100',
              followsMode &&
                'cyano:grayscale cyano:contrast-[1.15] cyano:brightness-[1.05] cyano:group-hover/photo:grayscale-0 cyano:group-hover/photo:contrast-100 cyano:group-hover/photo:brightness-100',
            )}
          />
        )
      )}
      {(cyanotype || followsMode) && (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 bg-prussian mix-blend-color transition-opacity duration-700 ease-out motion-reduce:transition-none',
            followsMode && 'opacity-0 cyano:opacity-100 cyano:group-hover/photo:opacity-0',
            reveals && 'group-hover:opacity-0',
            reveals && revealed && 'opacity-0',
          )}
        />
      )}
    </>
  );

  if (reveals) {
    return (
      <button
        type='button'
        aria-pressed={revealed}
        aria-label={`${info.description}. ${revealed ? 'Ver en cianotipia' : 'Revelar en color'}`}
        onClick={() => setRevealed(v => !v)}
        ref={ref as RefObject<HTMLButtonElement>}
        onContextMenu={preventSave}
        className={cn(
          'group group/photo relative block cursor-pointer overflow-hidden bg-charcoal select-none [-webkit-touch-callout:none]',
          className,
        )}
      >
        {content}
      </button>
    );
  }

  return (
    <figure
      ref={ref as RefObject<HTMLElement>}
      onContextMenu={preventSave}
      className={cn(
        'group/photo relative m-0 overflow-hidden bg-charcoal select-none [-webkit-touch-callout:none]',
        className,
      )}
    >
      {content}
    </figure>
  );
};
