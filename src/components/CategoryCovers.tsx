import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { useState } from 'react';
import { Link } from 'react-router';

import { type PhotoId } from '../content/photos';
import {
  categoryPath,
  categoryPhotoCount,
  categoryProjects,
  projectPhotos,
  type Category,
  type Project,
} from '../content/projects';
import { preloadPhoto } from '../photoLoader';

import { ChipLink } from './ChipLink';
import { DualTitle } from './DualTitle';
import { Photo } from './Photo';

const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/** Desktop rows: up to 3 in one row; more go in rows of 2 first and then 3 (4 → 2 + 2, 5 → 2 + 3, 6 → 3 + 3). */
const rowSizes = (n: number): Array<number> => {
  if (n <= 3) return [n];

  if (n % 3 === 0) return Array.from({ length: n / 3 }, () => 3);

  const twos = n % 3 === 1 ? 2 : 1;

  return [...Array.from({ length: twos }, () => 2), ...Array.from({ length: (n - twos * 2) / 3 }, () => 3)];
};

/** Height of a desktop row by how many covers it has, and whether the category has more than one row. */
const rowHeight = (k: number, single: boolean) => {
  if (k === 1) return 'h-[42.5rem]';

  if (k === 2) return single ? 'h-[47.5rem]' : 'h-[35rem]';

  return single ? 'h-[38.75rem]' : 'h-[27.5rem]';
};

/**
 * One photo of a project. Like the gallery, it opens in the photo viewer
 * (preloading the big version on hover); in the cyanotype series it only
 * reveals its color.
 */
const ProjectPhoto = ({
  p,
  id,
  position,
  className,
}: {
  p: Project;
  id: PhotoId;
  position?: string;
  className?: string;
}) => {
  const photo = (
    <Photo
      id={id}
      position={position}
      cyanotype={p.cyanotype ? 'reveal' : undefined}
      className='absolute inset-0 size-full transition-transform duration-700 ease-out group-hover:scale-[1.015] motion-reduce:transition-none'
    />
  );

  if (p.cyanotype) return <span className={cn('relative block min-w-0 overflow-hidden', className)}>{photo}</span>;

  return (
    <Link
      viewTransition
      to={`/proyectos/${p.slug}/foto/${projectPhotos(p).indexOf(id) + 1}`}
      onPointerEnter={() => preloadPhoto(id, 'view')}
      onFocus={() => preloadPhoto(id, 'view')}
      className={cn('group relative block min-w-0 overflow-hidden', className)}
    >
      {photo}
    </Link>
  );
};

/**
 * A project's cover with its title written on the photo, over a dark fade at
 * the bottom. The photo opens the photo viewer; the title, the project page.
 */
const Cover = ({ p, large, className }: { p: Project; large?: boolean; className?: string }) => (
  <div className={cn('relative min-w-0', className)}>
    <ProjectPhoto p={p} id={p.cover} position={p.coverPosition} className='size-full' />
    <span
      aria-hidden
      className='pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-on-photo-ink/80 to-transparent'
    />
    <Link
      viewTransition
      to={`/proyectos/${p.slug}`}
      className='group/title absolute bottom-5 left-5 flex max-w-[calc(100%-2.5rem)] flex-col text-on-photo md:bottom-8 md:left-8 md:max-w-[calc(100%-4rem)]'
    >
      <Typography
        variant={large ? 'header2' : 'header3'}
        as='span'
        noPadding
        className='m-0 text-on-photo decoration-2 underline-offset-[0.12em] group-hover/title:underline'
      >
        {p.title}
      </Typography>
      <span className='serif-voice t-serif text-on-photo/85'>{p.subtitle}</span>
      <span className='font-code mt-2 t-small tracking-[0.02em] text-on-photo/85'>
        {count(projectPhotos(p).length, 'foto', 'fotos')} · Ver proyecto →
      </span>
    </Link>
  </div>
);

/** Mobile: the covers in a row that slides, with the next one peeking and a position indicator. */
const Carousel = ({ list }: { list: Array<Project> }) => {
  const [active, setActive] = useState(0);

  if (list.length === 1) return <Cover p={list[0]} className='mx-5 h-[27.5rem]' />;

  return (
    <div>
      <div
        className='flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        onScroll={e => {
          const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
          const max = scrollWidth - clientWidth;

          setActive(max > 0 ? Math.round((scrollLeft / max) * (list.length - 1)) : 0);
        }}
      >
        {list.map(p => (
          <Cover key={p.slug} p={p} className='h-[26.25rem] w-[18.75rem] shrink-0 snap-start' />
        ))}
      </div>
      <div aria-hidden className='mt-4 flex gap-1.5 px-5'>
        {list.map((p, i) => (
          <span
            key={p.slug}
            className={cn('h-1 rounded-full transition-all', i === active ? 'w-5 bg-bone' : 'w-2 bg-graphite')}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * A category on the portfolio page with all its projects together: the
 * heading on the left with the counts and the link to the category, and the
 * project covers side by side with the title written on each photo. On mobile
 * the covers slide. Photos open the photo viewer; titles open the project.
 */
export const CategoryCovers = ({ c }: { c: Category }) => {
  const list = categoryProjects(c);
  const sizes = rowSizes(list.length);
  let next = 0;

  return (
    <section aria-label={`${c.title} ${c.voice}`}>
      <div className='flex flex-col gap-6 px-5 pt-30 pb-7 md:flex-row md:items-end md:justify-between md:px-10 md:pt-50 md:pb-10'>
        <DualTitle title={c.title} voice={c.voice} align='start' />
        <div className='flex flex-col items-start gap-4 md:items-end'>
          <Typography variant='small' noPadding className='font-code m-0 tracking-[0.02em] text-ash'>
            {count(list.length, 'proyecto', 'proyectos')} · {count(categoryPhotoCount(c), 'foto', 'fotos')}
          </Typography>
          <ChipLink to={categoryPath(c)}>
            Ver la categoría<span className='sr-only'> {`${c.title} ${c.voice}`}</span>
          </ChipLink>
        </div>
      </div>

      <div className='hidden gap-4 px-10 md:grid'>
        {sizes.map(k => {
          const row = list.slice(next, (next += k));

          return (
            <div key={row[0].slug} className='flex gap-4'>
              {row.map(p => (
                <Cover key={p.slug} p={p} large={k <= 2} className={cn('flex-1', rowHeight(k, sizes.length === 1))} />
              ))}
            </div>
          );
        })}
      </div>
      <div className='md:hidden'>
        <Carousel list={list} />
      </div>
    </section>
  );
};
