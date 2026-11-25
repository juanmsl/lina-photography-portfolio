import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { Link } from 'react-router';

import { type PhotoId } from '../content/photos';
import { categoryPath, categoryProjects, projectPhotos, type Category, type Project } from '../content/projects';
import { preloadPhoto } from '../photoLoader';

import { ChipLink } from './ChipLink';
import { DualTitle } from './DualTitle';
import { Photo } from './Photo';

/** Desktop rows: up to 3 per row; a lone last card pairs with the one before (4 → 2 + 2, 5 → 3 + 2, 7 → 3 + 2 + 2). */
const rowSizes = (n: number): Array<number> => {
  if (n <= 3) return [n];

  const threes = Math.floor(n / 3);
  const rest = n % 3;

  if (rest === 0) return Array.from({ length: threes }, () => 3);

  if (rest === 2) return [...Array.from({ length: threes }, () => 3), 2];

  return [...Array.from({ length: threes - 1 }, () => 3), 2, 2];
};

const mosaicHeight = (k: number) =>
  ({ 1: 'md:h-[40rem]', 2: 'md:h-[32.5rem]', 3: 'md:h-[23.75rem]' })[k] ?? 'md:h-[23.75rem]';

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
 * A project as a card: up to three of its photos (the cover large and two
 * small beside it, or two equal ones), then its title, second voice and
 * photo count. Each photo opens the photo viewer; the text, the project page.
 */
const MosaicCard = ({ p, k }: { p: Project; k: number }) => {
  const all = projectPhotos(p);
  const shown = all.slice(0, 3);

  return (
    <div className='flex min-w-0 flex-1 flex-col gap-3 md:gap-4'>
      <div
        className={cn(
          'grid h-60 gap-1.5 md:gap-2',
          mosaicHeight(k),
          shown.length === 3 && 'grid-cols-[1.6fr_1fr] grid-rows-2',
          shown.length === 2 && 'grid-cols-2',
        )}
      >
        {shown.map((id, i) => (
          <ProjectPhoto
            key={id}
            p={p}
            id={id}
            position={i === 0 ? p.coverPosition : undefined}
            className={cn('min-h-0', shown.length === 3 && i === 0 && 'row-span-2')}
          />
        ))}
      </div>
      <Link viewTransition to={`/proyectos/${p.slug}`} className='group/title flex flex-col self-start'>
        <Typography
          variant='header3'
          as='span'
          noPadding
          className='m-0 decoration-2 underline-offset-[0.12em] group-hover/title:underline'
        >
          {p.title}
        </Typography>
        <span className='serif-voice t-serif'>{p.subtitle}</span>
        <span className='font-code mt-2 t-small tracking-[0.02em] text-ash'>
          {all.length} {all.length === 1 ? 'foto' : 'fotos'} · Ver proyecto →
        </span>
      </Link>
    </div>
  );
};

/**
 * A category on the portfolio page with all its projects together, each one
 * as a card with two or three of its photos. Desktop: up to three cards per
 * row; mobile: one under the other.
 */
export const CategoryMosaics = ({ c }: { c: Category }) => {
  const list = categoryProjects(c);
  let next = 0;

  return (
    <section aria-label={`${c.title} ${c.voice}`}>
      <div className='flex flex-col items-center px-5 pt-30 pb-8 md:px-10 md:pt-50 md:pb-12'>
        <DualTitle title={c.title} voice={c.voice} />
        <ChipLink to={categoryPath(c)} className='mt-8 md:mt-10'>
          Ver la categoría<span className='sr-only'> {`${c.title} ${c.voice}`}</span>
        </ChipLink>
      </div>
      <div className='grid gap-9 px-5 md:gap-12 md:px-10'>
        {rowSizes(list.length).map(k => {
          const row = list.slice(next, (next += k));

          return (
            <div key={row[0].slug} className='flex flex-col gap-9 md:flex-row md:gap-4'>
              {row.map(p => (
                <MosaicCard key={p.slug} p={p} k={k} />
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
};
