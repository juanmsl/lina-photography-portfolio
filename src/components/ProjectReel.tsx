import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { LuArrowDown } from 'react-icons/lu';
import { Link } from 'react-router';

import { activeCategories, categoryPath, projectPhotos, type Category, type Project } from '../content/projects';
import { preloadPhoto } from '../photoLoader';
import { pad, ringOffset, swipeHandlers } from '../projectSelection';

import { Photo } from './Photo';

type ProjectReelProps = {
  category: Category;
  list: Array<Project>;
  active: number;
  go: (i: number) => void;
  previous: () => void;
  next: () => void;
};

/** Minimum time between two steps of the mouse wheel or trackpad, so one flick moves one project. */
const WHEEL_LOCK = 750;

/** Offset of every project from the selected one; the one halfway around the ring goes with the direction of travel. */
const offsets = (count: number, active: number, direction: number) =>
  Array.from({ length: count }, (_, i) => {
    const d = ringOffset(i, active, count);

    return count % 2 === 0 && Math.abs(d) === count / 2 && count > 2 ? (direction > 0 ? -d : d) : d;
  });

/**
 * The projects of a category as a vertical reel: the selected one in the
 * middle with its title written over the edge of the photo, the previous and
 * the next peeking above and below. The mouse wheel, ↑ ↓, a swipe, the dots
 * and the arrow move it; clicking the photo opens the project (the cover and
 * the title travel to the project page, see `project-cover` and
 * `project-title` in index.css). It is circular, like /categorias.
 */
export const ProjectReel = ({ category, list, active, go, previous, next }: ProjectReelProps) => {
  const count = list.length;
  const selected = list[active] ?? list[0];
  const memory = useRef({ active, direction: 0, offsets: [] as Array<number> });
  const wheelAt = useRef(0);
  const stage = useRef<HTMLElement>(null);

  const delta = ringOffset(active, memory.current.active, count);
  const direction = delta === 0 ? memory.current.direction : Math.sign(delta);
  const current = offsets(count, active, direction);

  // What the cards were doing before this render, to move the ones that wrapped around without sliding across the stage.
  const before = memory.current.offsets;

  useLayoutEffect(() => {
    memory.current = { active, direction, offsets: current };
  });

  // The mouse wheel, unless the page itself has to scroll (a very short window).
  useEffect(() => {
    const element = stage.current;

    if (!element || count < 2) return undefined;

    const onWheel = (e: WheelEvent) => {
      if (document.documentElement.scrollHeight > window.innerHeight + 1 || Math.abs(e.deltaY) < 8) return;

      e.preventDefault();

      const now = Date.now();

      if (now - wheelAt.current < WHEEL_LOCK) return;

      wheelAt.current = now;

      if (e.deltaY > 0) next();
      else previous();
    };

    element.addEventListener('wheel', onWheel, { passive: false });

    return () => element.removeEventListener('wheel', onWheel);
  }, [count, next, previous]);

  if (!selected) return null;

  const others = activeCategories();

  return (
    <section
      ref={stage}
      aria-roledescription='carrusel'
      aria-label={`Proyectos de ${category.label}`}
      {...(count > 1 ? swipeHandlers(previous, next, 'y') : {})}
      style={{ containerType: 'size' }}
      className={cn(
        'relative isolate h-[calc(100dvh-var(--header-h))] min-h-[36rem] overflow-hidden overscroll-contain',
        // Photo height; width follows (portrait on mobile, 4:3 on desktop) and the title sits a bit to its left.
        '[--card-h:50cqh] [--card-w:calc(var(--card-h)*3/4)] [--title-shift:2.5rem]',
        'md:[--card-h:54cqh] md:[--card-w:min(calc(var(--card-h)*4/3),46cqw)] md:[--title-shift:11rem]',
      )}
    >
      <ul className='m-0 list-none p-0'>
        {list.map((p, i) => {
          const o = current[i] ?? 0;
          const isActive = o === 0;
          const peeks = Math.abs(o) === 1;
          const jumped = before[i] !== undefined && Math.abs(o - (before[i] ?? 0)) > 2;

          return (
            <li
              key={p.slug}
              className='absolute top-1/2 left-1/2'
              style={{
                width: 'var(--card-w)',
                height: 'var(--card-h)',
                transform: `translate(-50%, -50%) translateY(calc(${Math.max(-2, Math.min(2, o))} * var(--card-h) * 0.9)) scale(${isActive ? 1 : 0.7})`,
                opacity: isActive ? 1 : peeks ? 0.5 : 0,
                transition: jumped
                  ? 'opacity 700ms cubic-bezier(0.22,1,0.36,1)'
                  : 'transform 700ms cubic-bezier(0.22,1,0.36,1), opacity 700ms cubic-bezier(0.22,1,0.36,1)',
                viewTransitionName: isActive ? 'project-cover' : undefined,
                pointerEvents: isActive || peeks ? 'auto' : 'none',
              }}
              aria-hidden={!isActive && !peeks}
            >
              <Photo
                id={p.cover}
                position={p.coverPosition}
                cyanotype={p.cyanotype ? 'reveal' : undefined}
                priority={Math.abs(o) <= 1}
                className='size-full'
              />
              {isActive ? (
                <>
                  <span
                    aria-hidden
                    className='pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-ink/70 via-ink/30 to-transparent'
                  />
                  {!p.cyanotype && (
                    <Link
                      viewTransition
                      to={`/proyectos/${p.slug}`}
                      aria-label={`Abrir el proyecto ${p.title}`}
                      onPointerEnter={() => preloadPhoto(p.cover, 'thumb')}
                      className='absolute inset-0'
                    />
                  )}
                </>
              ) : (
                <button
                  type='button'
                  tabIndex={peeks ? 0 : -1}
                  aria-label={`Ir al proyecto ${p.title}`}
                  onClick={() => go(i)}
                  className='absolute inset-0 cursor-pointer'
                />
              )}
            </li>
          );
        })}
      </ul>

      {/* Title and second voice, over the left edge of the photo (the soft shade on the photo keeps it readable). */}
      <div
        key={selected.slug}
        className='reel-title-in pointer-events-none absolute top-1/2 z-10 max-w-[calc(100%-2.5rem)] -translate-y-1/2 text-bone'
        style={{
          left: 'max(1.25rem, calc(50% - var(--card-w) / 2 - var(--title-shift)))',
          viewTransitionName: 'project-title',
        }}
      >
        <Typography variant='header3' as='h2' noPadding className='m-0'>
          <Link viewTransition to={`/proyectos/${selected.slug}`} className='pointer-events-auto'>
            {selected.title}
          </Link>
        </Typography>
        <span className='serif-voice t-serif block pl-8 md:pl-12'>{selected.subtitle.toLowerCase()}</span>
      </div>

      {/* Categories: bottom left on desktop, a bar at the bottom on mobile. */}
      {others.length > 1 && (
        <nav
          aria-label='Categorías'
          className='absolute inset-x-0 bottom-0 z-20 bg-ink/90 px-5 pt-3 pb-4 md:inset-x-auto md:bottom-10 md:left-10 md:bg-transparent md:p-0'
        >
          <p className='meta-label m-0 mb-1.5 md:mb-3'>Categorías</p>
          <ul className='m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 md:flex-col md:gap-y-2'>
            {others.map(o => {
              const isCurrent = o === category;

              return (
                <li key={o.id}>
                  <Link
                    viewTransition
                    to={categoryPath(o)}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={cn(
                      'inline-flex items-center gap-3 t-nav transition-colors hover:text-bone',
                      isCurrent ? 'text-bone' : 'text-ash',
                    )}
                  >
                    {isCurrent && <span aria-hidden className='hidden h-px w-5 bg-bone md:block' />}
                    <span className={cn(isCurrent && 'max-md:border-b max-md:border-bone')}>{o.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {count > 1 && (
        <>
          {/* Position: top right on mobile, bottom right with the arrow on desktop. */}
          <div className='absolute top-5 right-5 z-20 font-code t-small text-bone md:right-10 md:bottom-10 md:top-auto md:flex md:flex-col md:items-end md:gap-1'>
            <span aria-live='polite'>
              <span className='sr-only'>Proyecto </span>
              {pad(active + 1)} / {pad(count)}
            </span>
            <span className='hidden text-ash md:block'>{projectPhotos(selected).length} fotos</span>
            <button
              type='button'
              onClick={next}
              aria-label='Proyecto siguiente'
              className='mt-3 hidden size-11 cursor-pointer place-content-center rounded-full border border-bone text-bone transition-colors hover:bg-bone hover:text-ink md:grid'
            >
              <LuArrowDown aria-hidden />
            </button>
          </div>

          <ul className='absolute top-1/2 right-10 z-20 m-0 hidden -translate-y-1/2 list-none flex-col items-center gap-3.5 p-0 md:flex'>
            {list.map((p, i) => (
              <li key={p.slug}>
                <button
                  type='button'
                  onClick={() => go(i)}
                  aria-label={`Ir al proyecto ${p.title}`}
                  aria-current={i === active ? 'true' : undefined}
                  className='grid size-4 cursor-pointer place-content-center'
                >
                  <span
                    aria-hidden
                    className={cn(
                      'rounded-full bg-bone transition-all duration-500',
                      i === active ? 'size-2' : 'size-1.5 opacity-40',
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};
