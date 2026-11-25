import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { Link } from 'react-router';

import { categoryPath, categoryProjects, projectPhotos, type Category, type Project } from '../content/projects';

import { ChipLink } from './ChipLink';
import { DualTitle } from './DualTitle';
import { Photo } from './Photo';

/**
 * A project as one row: title, second voice and photo count on the left and a
 * strip of two or three of its photos on the right. Every row has the same
 * height, so the section grows evenly. The whole row links to the project.
 */
const ProjectRow = ({ p }: { p: Project }) => {
  const all = projectPhotos(p);
  const shown = all.slice(0, 3);
  const photosLabel = `${all.length} ${all.length === 1 ? 'foto' : 'fotos'}`;

  return (
    <Link
      viewTransition
      to={`/proyectos/${p.slug}`}
      className='group flex flex-col gap-3 border-t border-graphite pt-5 pb-6 md:flex-row md:gap-10 md:py-7'
    >
      <span className='flex items-end justify-between gap-4 md:w-[18.75rem] md:shrink-0 md:flex-col md:items-start md:justify-start md:gap-3.5'>
        <span className='flex flex-col'>
          <Typography variant='header3' as='span' noPadding className='m-0'>
            {p.title}
          </Typography>
          <span className='serif-voice t-serif'>{p.subtitle}</span>
        </span>
        <span className='font-code shrink-0 t-small tracking-[0.02em] whitespace-nowrap text-ash'>
          {photosLabel}
          <span className='md:hidden'> →</span>
        </span>
        <span className='hidden t-label font-semibold underline underline-offset-[0.2em] md:inline'>
          Ver proyecto →
        </span>
      </span>
      <span className={cn('grid flex-1 gap-1.5 md:gap-3', shown.length >= 3 ? 'grid-cols-3' : 'grid-cols-2')}>
        {shown.map((id, i) => (
          <span key={id} className='relative h-35 overflow-hidden md:h-65'>
            <Photo
              id={id}
              position={i === 0 ? p.coverPosition : undefined}
              cyanotype={p.cyanotype ? 'reveal' : undefined}
              className='absolute inset-0 size-full transition-transform duration-700 ease-out group-hover:scale-[1.015] motion-reduce:transition-none'
            />
          </span>
        ))}
      </span>
    </Link>
  );
};

/** A category on the portfolio page with all its projects together, one row per project. */
export const CategoryRows = ({ c }: { c: Category }) => (
  <section aria-label={`${c.title} ${c.voice}`}>
    <div className='flex flex-col items-center px-5 pt-30 pb-8 md:px-10 md:pt-50 md:pb-12'>
      <DualTitle title={c.title} voice={c.voice} />
      <ChipLink to={categoryPath(c)} className='mt-8 md:mt-10'>
        Ver la categoría<span className='sr-only'> {`${c.title} ${c.voice}`}</span>
      </ChipLink>
    </div>
    <div className='px-5 md:px-10'>
      {categoryProjects(c).map(p => (
        <ProjectRow key={p.slug} p={p} />
      ))}
    </div>
  </section>
);
