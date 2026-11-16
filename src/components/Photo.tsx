import { cn } from 'polpo/helpers';
import { useInView } from 'polpo/hooks';
import { useEffect, useState, type MouseEvent, type RefObject } from 'react';
import { photoUrls } from 'virtual:lina-photos';

import { photos, type PhotoId } from '../content/photos';

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
   * page: without watermark, for photos that cannot be enlarged (default).
   * thumb: with the tiled watermark, for photos that link to the enlarged view.
   * view: the enlarged photo, bigger and watermarked.
   */
  size?: 'page' | 'thumb' | 'view';
};

const preventSave = (e: MouseEvent) => e.preventDefault();

/**
 * Loads the photo with fetch and shows it from a `blob:` URL, so "copy image
 * address" and the element inspector do not show the Cloudinary URL. It only
 * starts when `start` is true, and frees the blob when the component unmounts.
 * If the fetch fails it falls back to the normal URL (a missing photo then
 * shows the placeholder).
 */
const useBlobSrc = (src: string, start: boolean) => {
  const [blobSrc, setBlobSrc] = useState<string>();

  useEffect(() => {
    if (!start) return undefined;

    const controller = new AbortController();
    let objectUrl: string | undefined;

    fetch(src, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error(String(response.status));

        return response.blob();
      })
      .then(blob => {
        objectUrl = URL.createObjectURL(blob);
        setBlobSrc(objectUrl);
      })
      .catch(() => {
        if (!controller.signal.aborted) setBlobSrc(src);
      });

    return () => {
      controller.abort();

      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src, start]);

  return blobSrc;
};

/**
 * Full-bleed photograph inside its box; the container decides the size.
 * With Cloudinary configured it loads a signed version (watermarked when the
 * photo can be enlarged or is the enlarged one; see build/photos-plugin.ts)
 * through a `blob:` URL, once the photo gets close to the viewport (right away
 * with `priority`). Right click, drag and the iOS long-press menu are disabled
 * as a light deterrent. If the file does not exist, it shows a dark placeholder
 * with the description so the layout does not break.
 */
export const Photo = ({
  id,
  className,
  cyanotype,
  grayscale,
  priority,
  position,
  silentPlaceholder,
  size = 'page',
}: PhotoProps) => {
  const info = photos[id];
  const [failed, setFailed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const reveals = cyanotype === 'reveal';
  const { ref, inView } = useInView({ rootMargin: '400px' });
  const [seen, setSeen] = useState(Boolean(priority));
  const blobSrc = useBlobSrc(photoUrls?.[id][size] ?? `${import.meta.env.BASE_URL}photos/${info.file}`, seen);

  useEffect(() => {
    if (inView) setSeen(true);
  }, [inView]);

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
        blobSrc && (
          <img
            src={blobSrc}
            alt={info.description}
            decoding='async'
            draggable={false}
            onDragStart={preventSave}
            onError={() => setFailed(true)}
            style={position ? { objectPosition: position } : undefined}
            className={cn(
              'absolute inset-0 size-full object-cover transition-[filter] duration-700 ease-out motion-reduce:transition-none',
              (grayscale || cyanotype) && 'grayscale',
              cyanotype && 'contrast-[1.15] brightness-[1.05]',
              reveals && 'group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100',
              reveals && revealed && 'grayscale-0 contrast-100 brightness-100',
            )}
          />
        )
      )}
      {cyanotype && (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 bg-prussian mix-blend-color transition-opacity duration-700 ease-out motion-reduce:transition-none',
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
          'group relative block cursor-pointer overflow-hidden bg-charcoal select-none [-webkit-touch-callout:none]',
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
      className={cn('relative m-0 overflow-hidden bg-charcoal select-none [-webkit-touch-callout:none]', className)}
    >
      {content}
    </figure>
  );
};
