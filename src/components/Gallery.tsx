import { cn } from 'polpo/helpers';
import { Link } from 'react-router';

import { Photo } from './Photo';

import type { PhotoId } from '../content/photos';
import type { PhotoRow } from '../content/projects';

type GalleryProps = {
  rows: Array<PhotoRow>;
  /** When given, each photo links to its enlarged view inside the project. */
  project?: { slug: string; photoIndex: (id: PhotoId) => number };
  cyanotype?: boolean;
  className?: string;
};

/**
 * Photo rows with a 16 px gap. On desktop each row keeps the design's
 * proportions (1360 wide); on mobile multi-photo rows become two columns or
 * one photo per line.
 */
export const Gallery = ({ rows, project, cyanotype, className }: GalleryProps) => (
  <div className={cn('grid gap-2 md:gap-4', className)}>
    {rows.map((row, f) => {
      const total = row.photos.reduce((s, x) => s + x.width, 0);
      const multiple = row.photos.length > 1;

      return (
        <div
          key={f}
          className={cn(
            'grid gap-2 md:flex md:gap-4 md:[aspect-ratio:var(--proporcion)]',
            multiple && 'grid-cols-2',
            row.photos.length === 3 && '[&>*:first-child]:col-span-2',
          )}
          style={{ '--proporcion': `${total} / ${row.height}` } as React.CSSProperties}
        >
          {row.photos.map((x, i) => {
            const box = cn(
              'w-full md:h-full md:w-auto',
              multiple ? 'aspect-[4/5] md:aspect-auto' : 'aspect-[4/3] md:aspect-auto',
              row.photos.length === 3 && i === 0 && 'aspect-[4/3]',
            );
            const flexStyle = { flex: `${x.width} 1 0%` };

            if (cyanotype) {
              return (
                <div key={i} className={box} style={flexStyle}>
                  <Photo id={x.id} cyanotype='reveal' className='size-full' />
                </div>
              );
            }

            if (project) {
              return (
                <Link
                  viewTransition
                  key={i}
                  to={`/proyectos/${project.slug}/foto/${project.photoIndex(x.id) + 1}`}
                  className={cn(box, 'group block overflow-hidden')}
                  style={flexStyle}
                >
                  <Photo
                    id={x.id}
                    className='size-full transition-transform duration-700 ease-out group-hover:scale-[1.015] motion-reduce:transition-none'
                  />
                </Link>
              );
            }

            return (
              <div key={i} className={box} style={flexStyle}>
                <Photo id={x.id} className='size-full' />
              </div>
            );
          })}
        </div>
      );
    })}
  </div>
);
