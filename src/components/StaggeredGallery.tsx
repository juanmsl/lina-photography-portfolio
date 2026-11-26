import { cn } from 'polpo/helpers';
import { type CSSProperties } from 'react';
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

type Slot = 'single' | 'bigLeft' | 'bigRight' | 'smallLeft' | 'smallRight' | 't0' | 't1' | 't2';

type Placement = { id: PhotoId; row: number; slot: Slot; left: boolean };

/** Grid placement of each slot from md up (rows of two) and from 1800px (rows of three). Written out so Tailwind finds them. */
const MD_SLOT: Record<Slot, string> = {
  single: 'md:col-span-6 md:col-start-4 md:mt-0',
  bigLeft: 'md:col-span-7 md:col-start-1 md:mt-0',
  bigRight: 'md:col-span-7 md:col-start-6 md:mt-0',
  smallLeft: 'md:col-span-5 md:col-start-1 md:mt-28',
  smallRight: 'md:col-span-5 md:col-start-8 md:mt-28',
  t0: 'md:col-span-4 md:col-start-1 md:mt-0',
  t1: 'md:col-span-4 md:col-start-5 md:mt-24',
  t2: 'md:col-span-4 md:col-start-9 md:mt-10',
};

const XL_SLOT: Record<Slot, string> = {
  single: 'min-[1800px]:col-span-6 min-[1800px]:col-start-4 min-[1800px]:mt-0',
  bigLeft: 'min-[1800px]:col-span-7 min-[1800px]:col-start-1 min-[1800px]:mt-0',
  bigRight: 'min-[1800px]:col-span-7 min-[1800px]:col-start-6 min-[1800px]:mt-0',
  smallLeft: 'min-[1800px]:col-span-5 min-[1800px]:col-start-1 min-[1800px]:mt-28',
  smallRight: 'min-[1800px]:col-span-5 min-[1800px]:col-start-8 min-[1800px]:mt-28',
  t0: 'min-[1800px]:col-span-4 min-[1800px]:col-start-1 min-[1800px]:mt-0',
  t1: 'min-[1800px]:col-span-4 min-[1800px]:col-start-5 min-[1800px]:mt-24',
  t2: 'min-[1800px]:col-span-4 min-[1800px]:col-start-9 min-[1800px]:mt-10',
};

/** Width ÷ height of a photo, from the catalog. */
const ratio = (id: PhotoId) => photos[id].dimensions[0] / photos[id].dimensions[1];

/**
 * The photos of a project, never cropped, in rows of two (the wider one big and the other small and lower) and,
 * from 1800px, rows of three; a leftover photo goes alone, centered. None takes the full width. Each has its title below. On mobile they stack
 * in a zigzag, narrower than the screen, and full width below 400px.
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

  /*
   * Two ways to group the same photos: rows of two up to 1800px, rows of three from there. Both are laid out with
   * CSS only, so the photos are rendered once.
   */
  const placements = (perRow: 2 | 3): Array<Placement> =>
    Array.from({ length: Math.ceil(ids.length / perRow) }, (_, k) =>
      ids.slice(k * perRow, k * perRow + perRow),
    ).flatMap((chunk, row): Array<Placement> => {
      if (chunk.length === 3) {
        return chunk.map((id, j) => ({ id, row, slot: (['t0', 't1', 't2'] as const)[j], left: j !== 1 }));
      }

      // One photo alone: narrower and centered, never full width.
      if (chunk.length === 1) return [{ id: chunk[0], row, slot: 'single' as const, left: true }];

      // Two: the wider one big, the other small and lower; the pair keeps its order, left to right.
      const aIsBig = ratio(chunk[0]) >= ratio(chunk[1]);

      return [
        { id: chunk[0], row, slot: aIsBig ? ('bigLeft' as const) : ('smallLeft' as const), left: true },
        { id: chunk[1], row, slot: aIsBig ? ('smallRight' as const) : ('bigRight' as const), left: false },
      ];
    });

  const byTwo = placements(2);
  const byThree = placements(3);

  return (
    <div className='grid grid-cols-1 gap-y-28 md:grid-cols-12 md:items-start md:gap-x-20 md:gap-y-48'>
      {byTwo.map(({ id, row, slot, left }) => {
        const three = byThree.find(item => item.id === id);
        const big = slot === 'bigLeft' || slot === 'bigRight';

        return (
          <div
            key={id}
            // Rows only apply from md up: below it the photos stack in one column, so a shared row would add a column.
            style={{ '--row': row + 1, '--row3': (three?.row ?? 0) + 1 } as CSSProperties}
            className={cn(
              'md:[grid-row:var(--row)] min-[1800px]:[grid-row:var(--row3)]',
              MD_SLOT[slot],
              three && XL_SLOT[three.slot],
              // Mobile: a zigzag, narrower than the screen, and full width below 400px.
              slot === 'single'
                ? 'max-md:w-[62%] max-md:justify-self-center'
                : big
                  ? 'max-md:w-[86%]'
                  : 'max-md:w-[62%]',
              !left && 'max-md:justify-self-end',
              'max-[400px]:w-full',
            )}
          >
            {cell(id)}
          </div>
        );
      })}
    </div>
  );
};
