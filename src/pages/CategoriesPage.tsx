import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { useEventListener } from 'polpo/hooks';
import { useRef, useState } from 'react';
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

/**
 * Where a card sits relative to the current photo: the current one centered
 * and full size, the neighbors smaller and darker towards the sides, one
 * behind the other. `x` is a share of the card width.
 */
const place = (offset: number) => {
  const d = Math.abs(offset);
  const side = Math.sign(offset);

  if (d === 0) return { x: 0, scale: 1, dim: 0, z: 30, visible: true };

  if (d === 1) return { x: side * 82, scale: 0.85, dim: 0.38, z: 20, visible: true };

  if (d === 2) return { x: side * 150, scale: 0.66, dim: 0.62, z: 10, visible: true };

  return { x: side * 200, scale: 0.5, dim: 1, z: 0, visible: false };
};

const pad = (n: number) => String(n).padStart(2, '0');

const RoundButton = ({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type='button'
    aria-label={label}
    disabled={disabled}
    onClick={onClick}
    className='grid size-12 place-content-center rounded-full border border-graphite text-bone transition-[border-color,opacity] hover:border-bone disabled:pointer-events-none disabled:opacity-35 md:size-14'
  >
    {children}
  </button>
);

/**
 * The photos of one category in a carousel: the current one in the middle
 * opens the photo viewer, the neighbors move the carousel. Arrows, the
 * keyboard (← →) and swiping on touch screens move it too. Below: the project
 * the photo belongs to, the place and the position.
 */
const Carousel = ({ c }: { c: Category }) => {
  const slides = slidesOf(c);
  const [active, setActive] = useState(0);
  const touchX = useRef<number>(undefined);
  const current = slides.at(active);

  const go = (i: number) => setActive(Math.min(Math.max(i, 0), slides.length - 1));

  useEventListener('keydown', (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null;

    if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;

    if (e.key === 'ArrowLeft') go(active - 1);

    if (e.key === 'ArrowRight') go(active + 1);
  });

  if (!current) return null;

  const info = photos[current.id];
  const where = [info.region, info.coordinates && formatCoordinates(info.coordinates)].filter(Boolean).join(' · ');

  return (
    <div aria-roledescription='carrusel' aria-label={`Fotos de ${c.title.toLowerCase()} ${c.voice}`}>
      <div
        className='relative mx-auto h-[23.5rem] overflow-hidden md:h-[44rem]'
        onTouchStart={e => {
          touchX.current = e.touches[0]?.clientX;
        }}
        onTouchEnd={e => {
          const start = touchX.current;
          const end = e.changedTouches[0]?.clientX;

          touchX.current = undefined;

          if (start === undefined || end === undefined || Math.abs(end - start) < 40) return;

          go(end < start ? active + 1 : active - 1);
        }}
      >
        {slides.map((s, i) => {
          const offset = i - active;

          // Only the cards that can be seen, plus one on each side so they slide in.
          if (Math.abs(offset) > 3) return null;

          const { x, scale, dim, z, visible } = place(offset);
          const style = {
            transform: `translate(-50%, -50%) translateX(${x}%) scale(${scale})`,
            zIndex: z,
            opacity: visible ? 1 : 0,
          };
          const className =
            'absolute top-1/2 left-1/2 block aspect-[4/5] w-[16.875rem] overflow-hidden transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none md:w-[32.5rem]';
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
                className='pointer-events-none absolute inset-0 z-10 bg-on-photo-ink transition-opacity duration-500 motion-reduce:transition-none'
                style={{ opacity: dim }}
              />
            </>
          );

          if (offset === 0) {
            return (
              <Link
                key={s.id}
                viewTransition
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
              key={s.id}
              type='button'
              tabIndex={-1}
              aria-hidden
              onClick={() => go(i)}
              className={cn(className, !visible && 'pointer-events-none')}
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
          <RoundButton label='Foto anterior' disabled={active === 0} onClick={() => go(active - 1)}>
            <LuArrowLeft size={22} aria-hidden />
          </RoundButton>
          <Typography
            variant='small'
            as='span'
            noPadding
            aria-live='polite'
            className='font-code m-0 min-w-16 tracking-[0.02em] text-ash'
          >
            {pad(active + 1)} / {pad(slides.length)}
          </Typography>
          <RoundButton label='Foto siguiente' disabled={active === slides.length - 1} onClick={() => go(active + 1)}>
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
              <ul className='relative m-0 flex list-none gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:flex-wrap md:justify-center md:overflow-visible md:px-10 [&::-webkit-scrollbar]:hidden'>
                {categories.map(o => (
                  <li key={o.id} className='shrink-0'>
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
                <li className='relative shrink-0 md:ml-2'>
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
