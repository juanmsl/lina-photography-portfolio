import { cn } from 'polpo/helpers';
import { Link } from 'react-router';

import { photos, type PhotoId } from '../content/photos';
import { preloadPhoto } from '../photoLoader';

import { Photo } from './Photo';

import type { PhotoRow } from '../content/projects';

type StaggeredGalleryProps = {
  rows: Array<PhotoRow>;
  /** When given, each photo links to its enlarged view inside the project. */
  project?: { slug: string; photoIndex: (id: PhotoId) => number };
  cyanotype?: boolean;
};

/** Width ÷ height of a photo, from the catalog. */
const ratio = (id: PhotoId) => photos[id].dimensions[0] / photos[id].dimensions[1];

/**
 * The photos of a project, never cropped, in rows of two (the wider one big and the other small and lower); an odd
 * count ends with one photo alone, centered. None takes the full width. Each has its title below. On mobile they stack,
 * the small ones against the left or right edge.
 */
export const StaggeredGallery = ({ rows, project, cyanotype }: StaggeredGalleryProps) => {
  const ids = rows.flat();

  if (!ids.length) return null;

  const cell = (id: PhotoId) => {
    const box = { aspectRatio: ratio(id) };

    const photo = cyanotype ? (
      <div className='w-full' style={box}>
        <Photo id={id} cyanotype='reveal' className='size-full' />
      </div>
    ) : project ? (
      <Link
        viewTransition
        to={`/proyectos/${project.slug}/foto/${project.photoIndex(id) + 1}`}
        onPointerEnter={() => preloadPhoto(id, 'view')}
        onFocus={() => preloadPhoto(id, 'view')}
        className='group block w-full overflow-hidden'
        style={box}
      >
        <Photo
          id={id}
          size='thumb'
          className='size-full transition-transform duration-700 ease-out group-hover:scale-[1.015] motion-reduce:transition-none'
        />
      </Link>
    ) : (
      <div className='w-full' style={box}>
        <Photo id={id} className='size-full' />
      </div>
    );

    return (
      <>
        {photo}
        <span className='mt-3 block font-code t-small text-ash'>{photos[id].title}</span>
      </>
    );
  };

  // Rows of two photos at most; an odd count ends with one photo alone, narrower and centered, never full width.
  const lines = Array.from({ length: Math.ceil(ids.length / 2) }, (_, k) => ids.slice(k * 2, k * 2 + 2));

  return (
    <div className='grid grid-cols-1 gap-y-14 md:grid-cols-12 md:items-start md:gap-y-24'>
      {lines.map((row, k) => {
        const gridRow = { gridRow: k + 1 };

        if (row.length === 1) {
          return (
            <div
              key={row[0]}
              className='max-md:w-[62%] max-md:justify-self-center md:col-span-6 md:col-start-4'
              style={gridRow}
            >
              {cell(row[0])}
            </div>
          );
        }

        const [a, b] = row;

        // The wider photo of the pair is the big one; the pair keeps its order, left to right.
        const aIsBig = ratio(a) >= ratio(b);
        const slots = [
          { id: a, big: aIsBig, left: true },
          { id: b, big: !aIsBig, left: false },
        ];

        return slots.map(({ id, big, left }) => (
          <div
            key={id}
            style={gridRow}
            className={cn(
              big ? 'md:col-span-7' : 'md:col-span-4 md:mt-28',
              left ? 'md:col-start-1' : big ? 'md:col-start-6' : 'md:col-start-9',
              !big && 'max-md:w-[62%]',
              !big && !left && 'max-md:justify-self-end',
            )}
          >
            {cell(id)}
          </div>
        ));
      })}
    </div>
  );
};
