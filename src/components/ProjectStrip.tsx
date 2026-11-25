import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { Link } from 'react-router';

import { projectPhotos, type Project } from '../content/projects';
import { pad, ringOffset, swipeHandlers, useIsDesktop } from '../projectSelection';

import { Photo } from './Photo';

type Props = { list: Array<Project>; active: number; go: (i: number) => void; previous: () => void; next: () => void };

/** Number written as an outline, like the big numbers of the strip. */
const Outline = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span
    aria-hidden
    className={cn(
      'font-title leading-none font-extrabold tracking-[-0.02em] text-transparent [-webkit-text-stroke:1.25px_var(--color-bone)]',
      className,
    )}
  >
    {children}
  </span>
);

/**
 * Where a card sits for its distance from the selected project, as left and
 * width in % of the stage. Desktop: the selected one large on the right of the
 * stage and the two before it as narrow strips on its left, the second one
 * cut by the edge of the page; the rest wait hidden further left. Mobile: the selected one in the middle with
 * the neighbors peeking at the sides.
 */
const place = (offset: number, desktop: boolean) => {
  if (desktop) {
    if (offset === 0) return { left: 34.3, width: 65.7, opacity: 1, dim: 0 };

    if (offset === -1) return { left: 8.2, width: 22.3, opacity: 1, dim: 0.35 };

    // The second strip runs off the left edge of the page.
    if (offset === -2) return { left: -16.4, width: 22.3, opacity: 1, dim: 0.35 };

    return { left: -41, width: 22.3, opacity: 0, dim: 0.35 };
  }

  if (offset === 0) return { left: 15, width: 70, opacity: 1, dim: 0 };

  if (offset === -1) return { left: -14, width: 26, opacity: 1, dim: 0.4 };

  if (offset === 1) return { left: 88, width: 26, opacity: 1, dim: 0.4 };

  return { left: offset < 0 ? -40 : 114, width: 26, opacity: 0, dim: 0.4 };
};

const Round = ({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) => (
  <button
    type='button'
    aria-label={label}
    onClick={onClick}
    className='grid size-12 place-content-center rounded-full border border-graphite text-bone transition-colors hover:border-bone md:size-14'
  >
    {children}
  </button>
);

/**
 * Option 1 · the projects of a category as a strip: the selected one large
 * with its outlined number on the cover, the ones before it as narrow strips with their
 * outlined number, and on the right a panel with the title, the summary, an index of the others and the arrows. It goes round in a ring.
 */
export const ProjectStrip = ({ list, active, go, previous, next }: Props) => {
  const desktop = useIsDesktop();
  const n = list.length;
  const p = list[active];

  if (!p) return null;

  const controls =
    n > 1 ? (
      <div className='flex items-center gap-4 md:gap-5'>
        <Round label='Proyecto anterior' onClick={previous}>
          <LuArrowLeft size={22} aria-hidden />
        </Round>
        <Typography
          variant='small'
          as='span'
          noPadding
          aria-live='polite'
          className='font-code m-0 tracking-[0.02em] text-ash'
        >
          {pad(active + 1)} / {pad(n)}
        </Typography>
        <Round label='Proyecto siguiente' onClick={next}>
          <LuArrowRight size={22} aria-hidden />
        </Round>
      </div>
    ) : null;

  return (
    <section aria-label='Proyectos de la categoría' className='overflow-x-clip pt-12 pb-10 md:pt-20 md:pb-12'>
      {/* Mobile: number and title above the strip. */}
      <div className='flex items-center gap-3.5 px-5 md:hidden'>
        <Outline className='text-[4rem]'>{pad(active + 1)}</Outline>
        <Link viewTransition to={`/proyectos/${p.slug}`} className='flex flex-col'>
          <Typography variant='header3' as='span' noPadding className='m-0'>
            {p.title}
          </Typography>
          <span className='serif-voice t-serif'>{p.subtitle}</span>
        </Link>
      </div>

      <div className='mt-6 md:mt-0 md:grid md:grid-cols-[minmax(0,1fr)_25rem] md:gap-12 md:pr-24 md:pl-10'>
        <div>
          <div
            className='relative h-75 overflow-hidden md:h-[27.5rem] md:overflow-visible'
            {...swipeHandlers(previous, next)}
          >
            {list.map((q, i) => {
              // Desktop: every other project waits on the left, the closest first; mobile: around the ring.
              const offset = desktop ? -(((active - i) % n) + n) % n : ringOffset(i, active, n);
              const { left, width, opacity, dim } = place(offset, desktop);
              const isActive = offset === 0;

              return (
                <div
                  key={q.slug}
                  className={cn(
                    'group group/photo absolute inset-y-0 overflow-hidden transition-[left,width,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                    opacity === 0 && 'pointer-events-none',
                  )}
                  style={{ left: `${left}%`, width: `${width}%`, opacity, zIndex: isActive ? 2 : 1 }}
                  aria-hidden={!isActive}
                >
                  <Photo
                    id={q.cover}
                    position={q.coverPosition}
                    cyanotype={q.cyanotype ? 'reveal' : undefined}
                    className='size-full transition-transform duration-700 ease-out group-hover:scale-[1.015] motion-reduce:transition-none'
                  />
                  <span
                    aria-hidden
                    className='pointer-events-none absolute inset-0 bg-on-photo-ink transition-opacity duration-700 motion-reduce:transition-none'
                    style={{ opacity: dim }}
                  />
                  {isActive ? (
                    <Link viewTransition to={`/proyectos/${q.slug}`} className='absolute inset-0 z-10 text-on-photo'>
                      <span
                        aria-hidden
                        className='absolute inset-0 bg-linear-to-t from-on-photo-ink/75 via-transparent to-transparent'
                      />
                      <span className='sr-only'>{q.title}</span>
                      <Outline className='absolute -right-4 -bottom-25 hidden text-[12rem] opacity-85 md:block'>
                        {pad(i + 1)}
                      </Outline>
                      <span className='font-code absolute bottom-4 left-4 t-small tracking-[0.02em] text-on-photo/85 md:bottom-6 md:left-6'>
                        {projectPhotos(q).length} fotos<span className='sr-only'> · Ver proyecto</span>
                      </span>
                    </Link>
                  ) : (
                    <button
                      type='button'
                      tabIndex={-1}
                      onClick={() => go(i)}
                      className='absolute inset-0 z-10 cursor-pointer'
                    >
                      <Outline className='absolute -right-2 -bottom-12 hidden text-[6rem] opacity-85 md:block'>
                        {pad(i + 1)}
                      </Outline>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop: link to the selected project, under the right edge of its cover. */}
          <div className='mt-6 hidden justify-end md:flex'>
            <Link
              viewTransition
              to={`/proyectos/${p.slug}`}
              className='flex items-center gap-3.5 t-label font-semibold hover:text-ash'
            >
              <span aria-hidden className='h-px w-10 bg-ash' />
              Ver proyecto →
            </Link>
          </div>
        </div>

        {/* Desktop: side panel. */}
        <div className='hidden md:flex md:flex-col'>
          <Link viewTransition to={`/proyectos/${p.slug}`} className='group/title flex flex-col'>
            <Typography
              variant='header3'
              as='span'
              noPadding
              className='m-0 text-[3rem]! decoration-2 underline-offset-[0.12em] group-hover/title:underline'
            >
              {p.title}
            </Typography>
            <span className='serif-voice text-[2.625rem] leading-[1.1]'>{p.subtitle}</span>
          </Link>
          <Typography noPadding className='m-0 mt-4 text-ash'>
            {p.summary}
          </Typography>
          {n > 1 && (
            <ol aria-label='Proyectos' className='m-0 mt-7 flex list-none flex-col gap-5 p-0 pl-15'>
              {list.map((q, i) =>
                i === active ? null : (
                  <li key={q.slug}>
                    <button
                      type='button'
                      onClick={() => go(i)}
                      className={cn(
                        'font-code t-small tracking-[0.02em] text-ash hover:text-bone',
                        i < active && 'opacity-60',
                      )}
                    >
                      {pad(i + 1)}&nbsp;&nbsp;{q.title}
                    </button>
                  </li>
                ),
              )}
            </ol>
          )}
          {controls && <div className='mt-10'>{controls}</div>}
        </div>
      </div>

      {/* Mobile: summary, arrows and link. */}
      <div className='mt-6 flex flex-col gap-5 px-5 md:hidden'>
        <Typography noPadding className='m-0 text-ash'>
          {p.summary}
        </Typography>
        <div className='flex items-center justify-between gap-4'>
          {controls}
          <Link viewTransition to={`/proyectos/${p.slug}`} className='t-label font-semibold'>
            Ver proyecto →
          </Link>
        </div>
      </div>
    </section>
  );
};
