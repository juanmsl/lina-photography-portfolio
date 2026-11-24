import { cn } from 'polpo/helpers';
import { Link } from 'react-router';

type ChipLinkProps = {
  to: string;
  /** The current page: filled in bone and marked with aria-current. */
  active?: boolean;
  className?: string;
  children: React.ReactNode;
};

/** D/Chip as a link: rounded outline; filled in bone when it is the current page. */
export const ChipLink = ({ to, active, className, children }: ChipLinkProps) => (
  <Link
    viewTransition
    to={to}
    aria-current={active ? 'page' : undefined}
    className={cn(
      'inline-flex items-center rounded-full border px-[1.125rem] py-2.5 t-label font-medium transition-colors',
      active ? 'border-bone bg-bone text-ink' : 'border-graphite text-bone hover:border-bone',
      className,
    )}
  >
    {children}
  </Link>
);
