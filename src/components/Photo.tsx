import { cn } from 'polpo/helpers';
import { useState } from 'react';

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
};

/**
 * Full-bleed photograph inside its box; the container decides the size.
 * If the file does not exist yet in `public/photos`, it shows a dark
 * placeholder with the description so the layout does not break.
 */
export const Photo = ({ id, className, cyanotype, grayscale, priority, position, silentPlaceholder }: PhotoProps) => {
  const info = photos[id];
  const [failed, setFailed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const reveals = cyanotype === 'reveal';

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
        <img
          src={`${import.meta.env.BASE_URL}photos/${info.file}`}
          alt={info.description}
          loading={priority ? 'eager' : 'lazy'}
          decoding='async'
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
        className={cn('group relative block cursor-pointer overflow-hidden bg-charcoal', className)}
      >
        {content}
      </button>
    );
  }

  return <figure className={cn('relative m-0 overflow-hidden bg-charcoal', className)}>{content}</figure>;
};
