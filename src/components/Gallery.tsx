import { Link } from 'react-router';

import { photos, type PhotoId } from '../content/photos';
import { preloadPhoto } from '../photoLoader';

import { Photo } from './Photo';

import type { PhotoRow } from '../content/projects';

type GalleryProps = {
  rows: Array<PhotoRow>;
  /** When given, each photo links to its enlarged view inside the project. */
  project?: { slug: string; photoIndex: (id: PhotoId) => number };
  cyanotype?: boolean;
  className?: string;
};

/** Width ÷ height of a photo, from the catalog. */
const ratio = (id: PhotoId) => photos[id].dimensions[0] / photos[id].dimensions[1];

/** On mobile, rows of three or four photos are split so they are not too small: 3 → 1 + 2, 4 → 2 + 2. */
const mobileRows = (row: PhotoRow): Array<PhotoRow> => {
  if (row.length === 3) return [row.slice(0, 1), row.slice(1)];

  if (row.length === 4) return [row.slice(0, 2), row.slice(2)];

  return [row];
};

/**
 * Photo rows that never crop: every photo keeps its own proportions. In a row
 * the photos share the height and split the width in proportion to their
 * width ÷ height (flex-grow), and each box has that same aspect ratio, so the
 * photo fills it exactly. Gap: 8 px on mobile, 16 px on desktop.
 */
export const Gallery = ({ rows, project, cyanotype, className }: GalleryProps) => {
  const item = (id: PhotoId, key: string) => {
    // flex-grow in hundredths: if a row's values added up to less than 1 (a vertical photo alone), it would not fill the row.
    const style = { flex: `${ratio(id) * 100} 1 0%`, aspectRatio: ratio(id) };

    if (cyanotype) {
      return (
        <div key={key} className='min-w-0' style={style}>
          <Photo id={id} cyanotype='reveal' className='size-full' />
        </div>
      );
    }

    if (project) {
      return (
        <Link
          viewTransition
          key={key}
          to={`/proyectos/${project.slug}/foto/${project.photoIndex(id) + 1}`}
          onPointerEnter={() => preloadPhoto(id, 'view')}
          onFocus={() => preloadPhoto(id, 'view')}
          className='group block min-w-0 overflow-hidden'
          style={style}
        >
          <Photo
            id={id}
            size='thumb'
            className='size-full transition-transform duration-700 ease-out group-hover:scale-[1.015] motion-reduce:transition-none'
          />
        </Link>
      );
    }

    return (
      <div key={key} className='min-w-0' style={style}>
        <Photo id={id} className='size-full' />
      </div>
    );
  };

  return (
    <div className={className}>
      {/* Desktop: the rows as designed. */}
      <div className='hidden gap-4 md:grid'>
        {rows.map((row, r) => (
          <div key={r} className='flex gap-4'>
            {row.map((id, i) => item(id, `${r}-${i}`))}
          </div>
        ))}
      </div>
      {/* Mobile: the same rows, with the long ones split in two. Hidden photos are not downloaded. */}
      <div className='grid gap-2 md:hidden'>
        {rows.flatMap(mobileRows).map((row, r) => (
          <div key={r} className='flex gap-2'>
            {row.map((id, i) => item(id, `${r}-${i}`))}
          </div>
        ))}
      </div>
    </div>
  );
};
