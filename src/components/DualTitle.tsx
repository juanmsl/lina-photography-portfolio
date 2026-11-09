import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';

type DualTitleProps = {
  title: string;
  /** Second voice in Instrument Serif, shifted right and overlapping the heading. */
  voice: string;
  /** `hero` = D/Display, `header1` = D/Divider. */
  level?: 'hero' | 'header1';
  as?: 'h1' | 'h2';
  className?: string;
  /** Block alignment. */
  align?: 'center' | 'start';
  id?: string;
};

/** Two-voice heading: Bricolage ExtraBold on top, Instrument Serif italic below. */
export const DualTitle = ({
  title,
  voice,
  level = 'header1',
  as = 'h2',
  className,
  align = 'center',
  id,
}: DualTitleProps) => (
  <div className={cn('flex', align === 'center' ? 'justify-center' : 'justify-start', className)}>
    <Typography variant={level} as={as} id={id} noPadding className='m-0 flex flex-col'>
      <span className={align === 'center' ? 'self-center' : undefined}>{title}</span>
      <span
        className={cn(
          'serif-voice t-serif-xl',
          level === 'hero'
            ? '-mt-[0.2em] pl-[clamp(3.5rem,18vw,16.25rem)]'
            : '-mt-[0.28em] pl-[clamp(2.75rem,15vw,13.75rem)]',
        )}
      >
        {voice}
      </span>
    </Typography>
  </div>
);
