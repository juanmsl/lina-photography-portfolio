import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { Link } from 'react-router';

import { type PhotoId } from '../content/photos';
import { projectPhotos, type Project } from '../content/projects';
import { preloadPhoto } from '../photoLoader';

import { Photo } from './Photo';

/**
 * One photo of a project that opens in the photo viewer (preloading the big
 * version on hover), like the gallery; in a cyanotype series it only reveals
 * its color.
 */
export const ProjectPhotoLink = ({
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
      className='size-full transition-transform duration-700 ease-out group-hover:scale-[1.015] motion-reduce:transition-none'
    />
  );

  if (p.cyanotype) return <span className={cn('block min-w-0 overflow-hidden', className)}>{photo}</span>;

  return (
    <Link
      viewTransition
      to={`/proyectos/${p.slug}/foto/${projectPhotos(p).indexOf(id) + 1}`}
      onPointerEnter={() => preloadPhoto(id, 'view')}
      onFocus={() => preloadPhoto(id, 'view')}
      className={cn('group block min-w-0 overflow-hidden', className)}
    >
      {photo}
    </Link>
  );
};

/**
 * Up to three photos of the selected project, under the project selector of a
 * category page: a row of three on desktop, one large and two below on mobile.
 * Each opens the photo viewer.
 */
export const ProjectPreview = ({ p }: { p: Project }) => {
  const all = projectPhotos(p);
  const shown = all.slice(0, 3);

  return (
    <section aria-label={`Fotos de ${p.title}`} className='px-5 pt-4 pb-14 md:px-10 md:pt-6 md:pb-30'>
      <div className='flex flex-col gap-1.5 md:flex-row md:items-end md:justify-between md:gap-6'>
        <Typography variant='small' noPadding className='font-code m-0 tracking-[0.02em] text-ash'>
          Fotos de {p.title}
        </Typography>
        <Link
          viewTransition
          to={`/proyectos/${p.slug}`}
          className='t-label font-semibold underline underline-offset-[0.2em] hover:text-ash'
        >
          Ver {all.length === 1 ? 'la foto' : `las ${all.length} fotos`} del proyecto →
        </Link>
      </div>
      <div
        className={cn(
          'mt-4 grid gap-2 md:mt-6 md:gap-4',
          shown.length > 1 && 'grid-cols-2',
          shown.length === 2 && 'md:grid-cols-2',
          shown.length === 3 && 'md:grid-cols-3',
        )}
      >
        {shown.map((id, i) => (
          <ProjectPhotoLink
            key={id}
            p={p}
            id={id}
            position={id === p.cover ? p.coverPosition : undefined}
            className={cn('h-38 md:h-[26.25rem]', shown.length !== 2 && i === 0 && 'col-span-2 h-55 md:col-span-1')}
          />
        ))}
      </div>
    </section>
  );
};
