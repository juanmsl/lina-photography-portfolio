import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { useEventListener } from 'polpo/hooks';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { LuArrowDown } from 'react-icons/lu';
import { Link } from 'react-router';

import { activeCategories, categoryPath, type Category, type Project } from '../content/projects';
import { preloadPhoto } from '../photoLoader';
import { pad, ringOffset } from '../projectSelection';

import { DualTitle } from './DualTitle';
import { Photo } from './Photo';

type ProjectReelProps = {
  category: Category;
  list: Array<Project>;
  /** Index of the project selected when the reel opens. */
  initial?: number;
  /** Called with the slug of the selected project whenever it changes. */
  onSelect?: (slug: string) => void;
};

/** Minimum time between two steps of the mouse wheel or trackpad, so one flick moves one project. */
const WHEEL_LOCK = 750;

/**
 * At least 7 cards are needed so the ring always has projects on both sides
 * (and a card never shows up twice while it is visible): short categories repeat theirs.
 */
const MIN_CARDS = 7;

/**
 * Positions along the track: the selected card, then each neighbor further
 * out. `y` is in card heights; the card next to the selected one peeks, the
 * rest are faded out.
 */
const STOPS = [
  { y: 0, scale: 1, opacity: 1 },
  { y: 0.9, scale: 0.7, opacity: 0.5 },
  { y: 1.5, scale: 0.55, opacity: 0 },
  { y: 2, scale: 0.45, opacity: 0 },
];

/**
 * Where a card sits for a (possibly fractional, while dragging) distance from
 * the selected project: interpolated between the stops, so the cards glide
 * between them like the carousel of /categorias, but vertically.
 */
const place = (offset: number) => {
  const d = Math.min(Math.abs(offset), STOPS.length - 1);
  const i = Math.min(Math.floor(d), STOPS.length - 2);
  const t = d - i;
  const lerp = (k: 'y' | 'scale' | 'opacity') => STOPS[i][k] + (STOPS[i + 1][k] - STOPS[i][k]) * t;

  return {
    y: Math.sign(offset) * lerp('y'),
    scale: lerp('scale'),
    opacity: lerp('opacity'),
    z: Math.round(30 - d * 10),
  };
};

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

/**
 * The projects of a category as a vertical, endless reel (the carousel of
 * /categorias, turned 90°): the selected one in the middle with its title
 * written over the edge of the photo, the previous and the next peeking above
 * and below. The mouse wheel, ↑ ↓, dragging or swiping, the dots and the arrow
 * move it, gliding from one project to the next; after the last comes the
 * first. Clicking the photo opens the project (the cover and the title travel
 * to the project page, see `project-cover` and `project-title` in index.css).
 */
export const ProjectReel = ({ category, list, initial = 0, onSelect }: ProjectReelProps) => {
  const count = list.length;
  // Short lists repeat their projects so the ring is never empty on a side; a single project stays alone.
  const copies = count > 1 ? Math.ceil(MIN_CARDS / count) : 1;
  const cards = Array.from({ length: copies }, (_, copy) => list.map(p => ({ p, key: `${copy}-${p.slug}` }))).flat();
  const total = cards.length;
  const [position, setPosition] = useState(initial);
  const [drag, setDrag] = useState<number>();
  // Leaving for another category: the photo and title must not morph into the other reel's, only fade.
  const [switching, setSwitching] = useState(false);
  const start = useRef<{ y: number; size: number; moved: boolean }>(undefined);
  // The card that was selected on the last screen update, to spot cards that wrap around the ring.
  const shown = useRef(0);
  const dragged = useRef(false);
  const wheelAt = useRef(0);
  const stage = useRef<HTMLElement>(null);

  const step = (by: number) => setPosition(current => current + by);
  const active = ((position % total) + total) % total;
  const project = active % count;
  const selected = list[project];
  const dragging = drag !== undefined;

  useEffect(() => {
    shown.current = active;
  }, [active]);

  useEffect(() => {
    if (selected) onSelect?.(selected.slug);
  }, [selected, onSelect]);

  useEventListener('keydown', (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null;

    if (count < 2 || target?.closest('input, textarea, select, [contenteditable="true"]')) return;

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1);
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      step(1);
    }
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
      setPosition(current => current + Math.sign(e.deltaY));
    };

    element.addEventListener('wheel', onWheel, { passive: false });

    return () => element.removeEventListener('wheel', onWheel);
  }, [count]);

  if (!selected) return null;

  const others = activeCategories();

  return (
    <section
      ref={stage}
      aria-roledescription='carrusel'
      aria-label={`Proyectos de ${category.label}`}
      style={{ containerType: 'size' }}
      className={cn(
        'relative isolate h-[calc(100dvh-var(--header-h))] min-h-[36rem] overflow-hidden overscroll-contain',
        // Photo height; width follows (portrait on mobile, 10:7 on desktop) and the title sits a bit to its left.
        '[--card-h:48cqh] [--card-w:calc(var(--card-h)*3/4)] [--title-shift:2.5rem]',
        'md:[--card-h:50cqh] md:[--card-w:min(calc(var(--card-h)*10/7),46cqw)] md:[--title-shift:11rem]',
      )}
    >
      <div
        className={cn(
          // z-0 keeps the cards' own stacking (see `place`) below the titles, the fade and the controls.
          'absolute inset-0 z-0 touch-pan-x select-none',
          count > 1 && (dragging ? 'cursor-grabbing' : 'cursor-grab'),
        )}
        onPointerDown={e => {
          if (e.button !== 0 || count < 2) return;

          dragged.current = false;

          const card = e.currentTarget.querySelector<HTMLElement>('[data-current]');

          start.current = { y: e.clientY, size: (card?.offsetHeight ?? 400) * STOPS[1].y, moved: false };
        }}
        onPointerMove={e => {
          const s = start.current;

          if (!s) return;

          const dy = e.clientY - s.y;

          if (!s.moved && Math.abs(dy) < 6) return;

          if (!s.moved) e.currentTarget.setPointerCapture(e.pointerId);

          s.moved = true;
          setDrag(-dy / s.size);
        }}
        onPointerUp={() => {
          const s = start.current;

          start.current = undefined;

          if (!s?.moved || drag === undefined) return setDrag(undefined);

          dragged.current = true;

          // Snap to the nearest project; a short flick still moves one.
          const by = Math.abs(drag) < 0.5 && Math.abs(drag) > 0.12 ? Math.sign(drag) : Math.round(drag);

          setDrag(undefined);
          step(by);
        }}
        onPointerCancel={() => {
          start.current = undefined;
          setDrag(undefined);
        }}
        onClickCapture={e => {
          // A drag that ends on a photo is not a click.
          if (dragged.current) e.preventDefault();

          dragged.current = false;
        }}
      >
        {cards.map(({ p, key }, i) => {
          const offset = ringOffset(i, active, total) - (drag ?? 0);
          // Cards that wrap around the ring jump to the other side while hidden, without sliding across.
          const jumps = Math.abs(offset - ringOffset(i, shown.current, total)) > 2;
          const { y, scale, opacity, z } = place(offset);
          const isCurrent = Math.round(offset) === 0;
          const centered = isCurrent && !dragging;
          const peeks = Math.abs(Math.round(offset)) === 1;

          /*
           * The card stays the same element when it becomes (or stops being)
           * the selected project, so its move is animated like the others;
           * only the layer on top changes: a link to the project in the
           * middle, a button that brings the project to the middle on the
           * sides. The card carries the hover groups (`group`, `group/photo`), so the zoom and the
           * cyanotype-to-color reveal still react to the pointer through that top layer.
           */
          return (
            <div
              key={key}
              data-current={isCurrent || undefined}
              className={cn(
                'group group/photo absolute top-[calc(50%+1rem)] left-1/2 [clip-path:inset(0)] overflow-hidden bg-ink will-change-transform',
                opacity < 0.05 && 'pointer-events-none',
              )}
              style={{
                width: 'var(--card-w)',
                height: 'var(--card-h)',
                transform: `translate(-50%, -50%) translateY(calc(${y} * var(--card-h))) scale(${scale})`,
                zIndex: z,
                opacity,
                transition: dragging || jumps ? 'none' : `transform 700ms ${EASE}, opacity 700ms ${EASE}`,
                viewTransitionName: centered && !switching ? 'project-cover' : undefined,
              }}
              aria-hidden={!isCurrent && !peeks}
            >
              {/* Photo and shade zoom as one always-promoted layer, so no edge shows when the hover starts. */}
              <div className='absolute inset-0 transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.03] motion-reduce:transition-none'>
                <Photo
                  id={p.cover}
                  position={p.coverPosition}
                  cyanotype={p.cyanotype ? 'reveal' : undefined}
                  priority={Math.abs(offset) <= 1.5}
                  className='size-full'
                />
                {isCurrent && (
                  <span
                    aria-hidden
                    className='pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-ink/70 via-ink/30 to-transparent'
                  />
                )}
              </div>
              {centered ? (
                !p.cyanotype && (
                  <Link
                    viewTransition
                    draggable={false}
                    to={`/proyectos/${p.slug}`}
                    aria-label={`Abrir el proyecto ${p.title}`}
                    onPointerEnter={() => preloadPhoto(p.cover, 'thumb')}
                    className='absolute inset-0'
                  />
                )
              ) : (
                <button
                  type='button'
                  tabIndex={peeks ? 0 : -1}
                  aria-label={`Ir al proyecto ${p.title}`}
                  onClick={() => step(ringOffset(i, active, total))}
                  className='absolute inset-0 cursor-pointer'
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Category title, top center; the photo peeking above fades out behind it. */}
      <span
        aria-hidden
        className='pointer-events-none absolute inset-x-0 top-0 z-[5] h-36 bg-linear-to-b from-ink via-ink/70 to-transparent md:h-60'
      />
      <DualTitle
        as='h1'
        title={category.title}
        voice={category.voice}
        className='pointer-events-none absolute inset-x-0 top-1 z-10 md:top-3'
      />

      {/* Title and second voice, over the left edge of the photo (the soft shade on the photo keeps it readable). */}
      <div
        key={selected.slug}
        className='reel-title-in pointer-events-none absolute top-1/2 z-10 max-w-[calc(100%-2.5rem)] -translate-y-1/2 text-bone'
        style={{
          left: 'max(1.25rem, calc(50% - var(--card-w) / 2 - var(--title-shift)))',
          viewTransitionName: switching ? undefined : 'project-title',
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
                    onClick={() => {
                      // Rendered before the router captures the old page, so the names are already gone.
                      if (!isCurrent) flushSync(() => setSwitching(true));
                    }}
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
          {/* Position: just above the category bar on mobile, bottom right with the arrow on desktop. */}
          <div className='absolute right-5 bottom-28 z-20 font-code t-small text-bone md:right-10 md:bottom-10 md:flex md:flex-col md:items-end md:gap-1'>
            <span aria-live='polite'>
              <span className='sr-only'>Proyecto </span>
              {pad(project + 1)} / {pad(count)}
            </span>
            <button
              type='button'
              onClick={() => step(1)}
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
                  onClick={() => step(ringOffset(i, project, count))}
                  aria-label={`Ir al proyecto ${p.title}`}
                  aria-current={i === project ? 'true' : undefined}
                  className='grid size-4 cursor-pointer place-content-center'
                >
                  <span
                    aria-hidden
                    className={cn(
                      'rounded-full bg-bone transition-all duration-500',
                      i === project ? 'size-2' : 'size-1.5 opacity-40',
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
