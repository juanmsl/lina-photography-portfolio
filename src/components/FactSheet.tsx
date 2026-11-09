import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';

import type { Fact } from '../content/projects';

/** D/Fact: graphite rule on top, label and value. */
export const FactItem = ({ label, value, className }: Fact & { className?: string }) => (
  <div className={cn('border-t border-graphite pt-3.5', className)}>
    <Typography variant='small' as='dt' noPadding className='meta-label m-0'>
      {label}
    </Typography>
    <Typography as='dd' noPadding className='m-0 mt-1.5 font-medium leading-snug'>
      {value}
    </Typography>
  </div>
);

/** Fact sheet in a 1-, 2- or 3-column grid. */
export const FactSheet = ({
  data,
  columns = 2,
  className,
}: {
  data: Array<Fact>;
  columns?: 1 | 2 | 3;
  className?: string;
}) => (
  <dl
    className={cn(
      'm-0 grid gap-x-10 gap-y-2',
      columns === 2 && 'sm:grid-cols-2',
      columns === 3 && 'sm:grid-cols-3',
      className,
    )}
  >
    {data.map(d => (
      <FactItem key={d.label} {...d} />
    ))}
  </dl>
);
