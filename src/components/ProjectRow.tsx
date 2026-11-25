import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { useRef } from 'react';
import { Link } from 'react-router';

import { projectPhotos, type Project } from '../content/projects';
import { pad, ringOffset, swipeHandlers, useIsDesktop } from '../projectSelection';

import { Photo } from './Photo';

type Props = { list: Array<Project>; active: number; go: (i: number) => void; previous: () => void; next: () => void };

/** Mobile: where a card sits for its distance from the selected one (left, width, top and height in %). */
const placeMobile = (offset: number) => {
  if (offset === 0) return { left: 14, width: 72, top: 0, height: 100, opacity: 1 };

  if (Math.abs(offset) === 1) return { left: offset < 0 ? -20 : 88, width: 32, top: 18, height: 64, opacity: 1 };

  return { left: offset < 0 ? -60 : 128, width: 32, top: 18, height: 64, opacity: 0 };
};

/**
 * Option 2 · the projects of a category as a row of covers: the selected one
 * larger and raised, with its number, title, second voice and photo count on
 * the photo; the others lower, a bit darker, with their name. Hovering or
 * tapping a cover selects it. Below: the summary, a progress bar and the
 * numbers, the current one large. On mobile the row slides with the selected
 * one in the middle.
 */
export const ProjectRow = ({ list, active, go, previous, next }: Props) => {
  const desktop = useIsDesktop();
  const hover = useRef<number>(undefined);
  const n = list.length;
  const p = list[active];

  if (!p) return null;

  const content = (q: Project, i: number, isActive: boolean) => (
    <>
      <Photo
        id={q.cover}
        position={q.coverPosition}
        cyanotype={q.cyanotype ? 'reveal' : undefined}
        className='size-full transition-transform duration-700 ease-out group-hover:scale-[1.015] motion-reduce:transition-none'
      />
      <span
        aria-hidden
        className='pointer-events-none absolute inset-0 bg-on-photo-ink transition-opacity duration-700 motion-reduce:transition-none'
        style={{ opacity: isActive ? 0 : 0.3 }}
      />
      {isActive ? (
        <Link viewTransition to={`/proyectos/${q.slug}`} className='absolute inset-0 z-10 text-on-photo'>
          <span
            aria-hidden
            className='absolute inset-0 bg-linear-to-t from-on-photo-ink/80 via-transparent to-transparent'
          />
          <span className='absolute inset-x-5 bottom-5 flex flex-col md:inset-x-8 md:bottom-8'>
            <span className='font-code t-small tracking-[0.02em] text-on-photo/85'>{pad(i + 1)}</span>
            <Typography variant='header3' as='span' noPadding className='m-0 mt-2 text-on-photo md:mt-2.5'>
              {q.title}
            </Typography>
            <span className='serif-voice t-serif text-on-photo/85'>{q.subtitle}</span>
            <span className='font-code mt-2.5 t-small tracking-[0.02em] text-on-photo/85'>
              {projectPhotos(q).length} fotos · Ver proyecto →
            </span>
          </span>
        </Link>
      ) : (
        <button
          type='button'
          tabIndex={-1}
          aria-hidden
          onClick={() => go(i)}
          className='absolute inset-0 z-10 cursor-pointer text-left'
        >
          <span className='absolute bottom-4 left-4 hidden t-label font-semibold text-on-photo md:block'>
            {q.title}
          </span>
        </button>
      )}
    </>
  );

  return (
    <section aria-label='Proyectos de la categoría' className='pt-12 pb-10 md:pt-24 md:pb-12'>
      {desktop ? (
        <div
          className='flex h-[28.75rem] items-center px-10'
          onPointerLeave={() => {
            window.clearTimeout(hover.current);
          }}
        >
          {list.map((q, i) => {
            const isActive = i === active;

            return (
              <div
                key={q.slug}
                onPointerEnter={e => {
                  if (e.pointerType !== 'mouse' || isActive) return;

                  window.clearTimeout(hover.current);
                  // A short pause, so sweeping across the row does not flick through every project.
                  hover.current = window.setTimeout(() => go(i), 180);
                }}
                className={cn(
                  'group group/photo relative min-w-0 overflow-hidden transition-[flex-grow,height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                  isActive ? 'z-10 h-full' : 'h-[18.75rem]',
                )}
                style={{ flexGrow: isActive ? 1.55 : 1, flexBasis: 0 }}
              >
                {content(q, i, isActive)}
              </div>
            );
          })}
        </div>
      ) : (
        <div className='relative h-95 overflow-hidden' {...swipeHandlers(previous, next)}>
          {list.map((q, i) => {
            const offset = ringOffset(i, active, n);
            const { left, width, top, height, opacity } = placeMobile(offset);

            return (
              <div
                key={q.slug}
                className={cn(
                  'group group/photo absolute overflow-hidden transition-[left,width,top,height,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                  opacity === 0 && 'pointer-events-none',
                )}
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  top: `${top}%`,
                  height: `${height}%`,
                  opacity,
                  zIndex: offset === 0 ? 2 : 1,
                }}
              >
                {content(q, i, offset === 0)}
              </div>
            );
          })}
        </div>
      )}

      <div className='mt-6 flex flex-col gap-6 px-5 md:mt-8 md:flex-row md:items-end md:justify-between md:px-10'>
        <Typography noPadding className='m-0 max-w-[30rem] t-lead text-ash'>
          {p.summary}
        </Typography>
        {n > 1 && (
          <div className='flex items-end gap-5 self-end md:gap-7'>
            <span aria-hidden className='relative mb-2 h-0.5 w-35 bg-graphite md:w-60'>
              <span
                className='absolute inset-y-0 left-0 bg-bone transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'
                style={{ width: `${((active + 1) / n) * 100}%` }}
              />
            </span>
            <ol aria-label='Proyectos' className='m-0 flex list-none items-baseline gap-3 p-0 md:gap-4'>
              {list.map((q, i) => (
                <li key={q.slug}>
                  <button
                    type='button'
                    aria-label={`${q.title}${i === active ? ' (actual)' : ''}`}
                    aria-current={i === active || undefined}
                    onClick={() => go(i)}
                    className={cn(
                      'leading-none transition-colors',
                      i === active
                        ? 'font-title text-[2.5rem] font-extrabold text-bone md:text-[3.5rem]'
                        : 'font-code t-small text-ash hover:text-bone',
                    )}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
};
