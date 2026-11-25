import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { useState } from 'react';
import { Link } from 'react-router';

import {
  categoryPath,
  categoryPhotoCount,
  categoryProjects,
  projectPhotos,
  type Category,
  type Project,
} from '../content/projects';

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

/** A project's cover with its title written on the photo, over a dark fade at the bottom. */
const Cover = ({ p, large, className }: { p: Project; large?: boolean; className?: string }) => (
  <Link
    viewTransition
    to={`/proyectos/${p.slug}`}
    className={cn('group relative block min-w-0 overflow-hidden', className)}
  >
    <Photo
      id={p.cover}
      position={p.coverPosition}
      cyanotype={p.cyanotype ? 'reveal' : undefined}
      className='absolute inset-0 size-full transition-transform duration-700 ease-out group-hover:scale-[1.015] motion-reduce:transition-none'
    />
    <span
      aria-hidden
      className='pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-on-photo-ink/80 to-transparent'
    />
    <span className='absolute inset-x-5 bottom-5 flex flex-col text-on-photo md:inset-x-8 md:bottom-8'>
      <Typography variant={large ? 'header2' : 'header3'} as='span' noPadding className='m-0 text-on-photo'>
        {p.title}
      </Typography>
      <span className='serif-voice t-serif text-on-photo/85'>{p.subtitle}</span>
      <span className='font-code mt-2 t-small tracking-[0.02em] text-on-photo/85'>
        {count(projectPhotos(p).length, 'foto', 'fotos')} · Ver proyecto →
      </span>
    </span>
  </Link>
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
 * the covers slide.
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
