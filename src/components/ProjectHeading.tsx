import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { Link } from 'react-router';

type ProjectHeadingProps = {
  title: string;
  subtitle: string;
  /** Link to the project; plain text when omitted. */
  a?: string;
  as?: 'h2' | 'h3';
  className?: string;
};

/** D/Project heading: title in Bricolage and subtitle in Instrument Serif, centered. */
export const ProjectHeading = ({ title, subtitle, a, as = 'h3', className }: ProjectHeadingProps) => (
  <div className={cn('flex flex-col items-center text-center', className)}>
    <Typography variant='header2' as={as} noPadding className='m-0'>
      {a ? (
        <Link viewTransition to={a} className='underline-offset-[0.12em] decoration-2 hover:underline'>
          {title}
        </Link>
      ) : (
        title
      )}
    </Typography>
    <Typography noPadding className='serif-voice m-0 mt-1 t-serif'>
      {subtitle}
    </Typography>
  </div>
);
