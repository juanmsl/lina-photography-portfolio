import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { useEventListener } from 'polpo/hooks';
import { useEffect, useRef, useState } from 'react';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { Link, useSearchParams } from 'react-router';

import { ChipLink } from '../components/ChipLink';
import { Footer } from '../components/ContactSection';
import { DualTitle } from '../components/DualTitle';
import { Navigation } from '../components/Navigation';
import { Photo } from '../components/Photo';
import { formatCoordinates, photos, type PhotoId } from '../content/photos';
import {
  activeCategories,
  categoryPath,
  categoryProjects,
  projectPhotos,
  type Category,
  type Project,
} from '../content/projects';
import { preloadPhoto } from '../photoLoader';

type Slide = { id: PhotoId; p: Project; n: number };

/** Every photo of the category's projects, project by project; `n` is its position in the project (for the viewer). */
const slidesOf = (c: Category): Array<Slide> =>
  categoryProjects(c).flatMap(p => projectPhotos(p).map((id, i) => ({ id, p, n: i + 1 })));

/** Positions along the track: the current photo, then each neighbor further out. `x` is a share of the card width. */
const STOPS = [
  { x: 0, scale: 1, dim: 0 },
  { x: 82, scale: 0.85, dim: 0.38 },
  { x: 150, scale: 0.66, dim: 0.62 },
  { x: 200, scale: 0.5, dim: 1 },
];

/**
 * Where a card sits for a (possibly fractional, while dragging) distance from
 * the current photo: interpolated between the stops, so the cards glide
 * between them. Past the third stop a card is fully faded out.
 */
const place = (offset: number) => {
  const d = Math.min(Math.abs(offset), STOPS.length - 1);
  const i = Math.min(Math.floor(d), STOPS.length - 2);
  const t = d - i;
  const lerp = (k: 'x' | 'scale' | 'dim') => STOPS[i][k] + (STOPS[i + 1][k] - STOPS[i][k]) * t;

  return {
    x: Math.sign(offset) * lerp('x'),
    scale: lerp('scale'),
    dim: lerp('dim'),
    opacity: d > 2 ? 3 - d : 1,
    z: Math.round(30 - d * 10),
  };
};

/** The shortest signed distance from `from` to `to` around a circle of `n` positions. */
const ringOffset = (to: number, from: number, n: number) => {
  const d = (((to - from) % n) + n) % n;

  return d > n / 2 ? d - n : d;
};

/** At least 7 cards are needed so the ring always has photos on both sides: short categories repeat theirs. */
const MIN_CARDS = 7;

const pad = (n: number) => String(n).padStart(2, '0');

const RoundButton = ({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
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
 * The photos of one category in an endless carousel: the current one in the
 * middle opens the photo viewer, the neighbors move the carousel. Arrows, the
 * keyboard (← →) and dragging or swiping move it; after the last photo comes
 * the first again. Below: the project the photo belongs to, the place and the
 * position.
 */
const Carousel = ({ c }: { c: Category }) => {
  const slides = slidesOf(c);
  const total = slides.length;
  // Short categories repeat their photos so the ring is never empty on a side.
  const copies = total ? Math.ceil(MIN_CARDS / total) : 0;
  const cards = Array.from({ length: copies }, (_, copy) => slides.map(s => ({ ...s, key: `${copy}-${s.id}` }))).flat();
  const [position, setPosition] = useState(0);
  const [drag, setDrag] = useState<number>();
  const start = useRef<{ x: number; width: number; moved: boolean }>(undefined);
  // The photo that was current on the last screen update, to spot cards that wrap around the ring.
  const shown = useRef(0);
  const dragged = useRef(false);

  const step = (by: number) => setPosition(current => current + by);
  const active = ((position % cards.length) + cards.length) % cards.length;
  const current = cards[active];

  useEffect(() => {
    shown.current = active;
  }, [active]);

  useEventListener('keydown', (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null;

    if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;

    if (e.key === 'ArrowLeft') step(-1);

    if (e.key === 'ArrowRight') step(1);
  });

  if (!current) return null;

  const info = photos[current.id];
  const where = [info.region, info.coordinates && formatCoordinates(info.coordinates)].filter(Boolean).join(' · ');
  const dragging = drag !== undefined;

  return (
    <div aria-roledescription='carrusel' aria-label={`Fotos de ${c.title.toLowerCase()} ${c.voice}`}>
      <div
        className={cn(
          'relative mx-auto h-[23.5rem] touch-pan-y overflow-hidden select-none md:h-[44rem]',
          dragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
        onPointerDown={e => {
          if (e.button !== 0) return;

          dragged.current = false;

          const card = e.currentTarget.querySelector<HTMLElement>('[data-current]');

          start.current = { x: e.clientX, width: (card?.offsetWidth ?? 300) * 0.82, moved: false };
        }}
        onPointerMove={e => {
          const s = start.current;

          if (!s) return;

          const dx = e.clientX - s.x;

          if (!s.moved && Math.abs(dx) < 6) return;

          if (!s.moved) e.currentTarget.setPointerCapture(e.pointerId);

          s.moved = true;
          setDrag(-dx / s.width);
        }}
        onPointerUp={() => {
          const s = start.current;

          start.current = undefined;

          if (!s?.moved || drag === undefined) return setDrag(undefined);

          dragged.current = true;

          // Snap to the nearest photo; a short flick still moves one.
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
        {cards.map((s, i) => {
          const offset = ringOffset(i, active, cards.length) - (drag ?? 0);
          // Cards that wrap around the ring jump to the other side while hidden, without sliding across.
          const jumps = Math.abs(offset - ringOffset(i, shown.current, cards.length)) > 2;
          const { x, scale, dim, opacity, z } = place(offset);
          const centered = Math.round(offset) === 0 && !dragging;
          const style = {
            transform: `translate(-50%, -50%) translateX(${x}%) scale(${scale})`,
            zIndex: z,
            opacity,
            transition: dragging || jumps ? 'none' : undefined,
          };
          const className = cn(
            'absolute top-1/2 left-1/2 block aspect-[4/5] w-[16.875rem] overflow-hidden will-change-transform md:w-[32.5rem]',
            'transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
            opacity === 0 && 'pointer-events-none',
          );
          const content = (
            <>
              <Photo
                id={s.id}
                position={s.id === s.p.cover ? s.p.coverPosition : undefined}
                cyanotype={s.p.cyanotype ? 'reveal' : undefined}
                className='size-full'
              />
              <span
                aria-hidden
                className='pointer-events-none absolute inset-0 z-10 bg-on-photo-ink transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
                style={{ opacity: dim, transition: dragging || jumps ? 'none' : undefined }}
              />
            </>
          );

          if (centered) {
            return (
              <Link
                key={s.key}
                data-current
                viewTransition
                draggable={false}
                to={`/proyectos/${s.p.slug}/foto/${s.n}`}
                onPointerEnter={() => preloadPhoto(s.id, 'view')}
                onFocus={() => preloadPhoto(s.id, 'view')}
                className={className}
                style={style}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={s.key}
              type='button'
              tabIndex={-1}
              aria-hidden
              onClick={() => step(ringOffset(i, active, cards.length))}
              className={className}
              style={style}
            >
              {content}
            </button>
          );
        })}
      </div>

      <div className='mt-6 flex flex-col items-center px-5 text-center md:mt-8'>
        <Link viewTransition to={`/proyectos/${current.p.slug}`} className='group flex flex-col items-center'>
          <Typography
            variant='header3'
            as='span'
            noPadding
            className='m-0 decoration-2 underline-offset-[0.12em] group-hover:underline'
          >
            {current.p.title}
          </Typography>
          <span className='serif-voice t-serif'>{current.p.subtitle}</span>
        </Link>
        <Typography variant='small' noPadding className='font-code m-0 mt-2.5 tracking-[0.02em] text-ash'>
          {where && `${where} · `}
          <Link viewTransition to={`/proyectos/${current.p.slug}`} className='hover:text-bone'>
            Ver proyecto →
          </Link>
        </Typography>

        <div className='mt-6 flex items-center gap-5 md:mt-9 md:gap-6'>
          <RoundButton label='Foto anterior' onClick={() => step(-1)}>
            <LuArrowLeft size={22} aria-hidden />
          </RoundButton>
          <Typography
            variant='small'
            as='span'
            noPadding
            aria-live='polite'
            className='font-code m-0 min-w-16 tracking-[0.02em] text-ash'
          >
            {pad((active % total) + 1)} / {pad(total)}
          </Typography>
          <RoundButton label='Foto siguiente' onClick={() => step(1)}>
            <LuArrowRight size={22} aria-hidden />
          </RoundButton>
        </div>
      </div>
    </div>
  );
};

/**
 * /categorias: the whole portfolio in a carousel, filtered by category. The
 * chips switch the carousel without leaving the page (the choice goes in the
 * address, ?c=<category>, so it can be shared), and "Ver la categoría" opens
 * the category page with all its projects.
 */
export const CategoriesPage = () => {
  const categories = activeCategories();
  const [params, setParams] = useSearchParams();
  const c = categories.find(category => category.slug === params.get('c')) ?? categories[0];

  return (
    <>
      <Navigation />

      <main className='pb-20 md:pb-28'>
        <section aria-labelledby='categories-title' className='px-5 pt-14 text-center md:px-10 md:pt-24'>
          <DualTitle id='categories-title' as='h1' title='Portafolio' voice='por categorías' />
          <Typography noPadding align='center' className='mx-auto mt-6 max-w-[40rem] t-lead text-ash md:mt-8'>
            Elige una categoría y recorre las fotos de sus proyectos.
          </Typography>
        </section>

        {c && (
          <>
            <nav aria-label='Categorías' className='mt-7 md:mt-12'>
              <ul className='m-0 flex list-none flex-wrap justify-center gap-2 px-5 md:px-10'>
                {categories.map(o => (
                  <li key={o.id}>
                    <button
                      type='button'
                      aria-pressed={o === c}
                      onClick={() => setParams({ c: o.slug }, { replace: true, preventScrollReset: true })}
                      className={cn(
                        'inline-flex items-center rounded-full border px-[1.125rem] py-2.5 t-label font-medium transition-colors',
                        o === c ? 'border-bone bg-bone text-ink' : 'border-graphite text-bone hover:border-bone',
                      )}
                    >
                      {o.label}
                    </button>
                  </li>
                ))}
                <li className='md:ml-2'>
                  <ChipLink to={categoryPath(c)}>
                    Ver la categoría →<span className='sr-only'> {`${c.title} ${c.voice}`}</span>
                  </ChipLink>
                </li>
              </ul>
            </nav>

            {/* Remounted per category, so the carousel starts at the first photo. */}
            <Carousel key={c.id} c={c} />
          </>
        )}
      </main>

      <Footer />
    </>
  );
};
