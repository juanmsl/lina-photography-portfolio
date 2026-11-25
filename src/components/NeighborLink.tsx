import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { Link } from 'react-router';

type NeighborLinkProps = {
  to: string;
  direction: 'previous' | 'next';
  /** What the series is made of, after the direction: "Anterior categoría", "Siguiente proyecto". */
  noun: string;
  /** Shown in the second voice, large. */
  text: string;
  /** Read only by screen readers after the direction ("Anterior: …"), when the visible text needs context. */
  srText?: string;
};

/** Text link to the previous or next page of a series (categories, projects): mono direction label and the name in the second voice. */
export const NeighborLink = ({ to, direction, noun, text, srText }: NeighborLinkProps) => (
  <Link
    viewTransition
    to={to}
    rel={direction === 'previous' ? 'prev' : 'next'}
    className={cn('group flex flex-col gap-2 md:gap-3', direction === 'next' ? 'items-end text-right' : 'items-start')}
  >
    <Typography variant='small' as='span' noPadding className='font-code m-0 tracking-[0.02em] text-ash'>
      {direction === 'previous' ? `← Anterior ${noun}` : `Siguiente ${noun} →`}
      {srText && <span className='sr-only'>: {srText}</span>}
    </Typography>
    <span className='serif-voice t-serif text-bone decoration-1 md:t-serif-xl underline-offset-[0.12em] group-hover:underline'>
      {text}
    </span>
  </Link>
);
