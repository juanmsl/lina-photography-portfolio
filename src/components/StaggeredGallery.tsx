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
 * The photos of a project, never cropped, two by two in reading order: the wider one big and the other small and
 * lower, each with its number. On mobile they stack, the small ones against the left or right edge.
 */
export const StaggeredGallery = ({ rows, project, cyanotype }: StaggeredGalleryProps) => {
  const ids = rows.flat();

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

  const pairs = Array.from({ length: Math.ceil(ids.length / 2) }, (_, k) => ids.slice(k * 2, k * 2 + 2));

  return (
    <div className='grid grid-cols-1 gap-y-14 md:grid-cols-12 md:items-start md:gap-y-24'>
      {pairs.map(([a, b], k) => {
        if (!b) {
          return (
            <div key={a} className='md:col-span-12' style={{ gridRow: k + 1 }}>
              {cell(a)}
            </div>
          );
        }

        // The wider photo of the pair is the big one; the pair keeps its order, left to right.
        const aIsBig = ratio(a) >= ratio(b);
        const slots = [
          { id: a, big: aIsBig, left: true },
          { id: b, big: !aIsBig, left: false },
        ];

        return slots.map(({ id, big, left }) => (
          <div
            key={id}
            style={{ gridRow: k + 1 }}
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
