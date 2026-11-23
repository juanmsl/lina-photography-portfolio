import { Button } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { LuDroplet } from 'react-icons/lu';

import { setCyanotype, useCyanotype } from '../cyanotype';

/**
 * Cyanotype switch, next to the light switch: turns every photo Prussian blue
 * (they go back to color under the pointer) and back. The choice is remembered.
 */
export const CyanotypeToggle = ({ className }: { className?: string }) => {
  const on = useCyanotype();

  return (
    <Button
      forIcon
      variant='outlined'
      radius='full'
      aria-label={on ? 'Volver las fotos a color' : 'Ver las fotos en cianotipia'}
      aria-pressed={on}
      title={on ? 'Fotos a color' : 'Fotos en cianotipia'}
      className={cn(
        'size-11 border-graphite text-bone',
        on && 'border-prussian bg-prussian text-white hover:border-prussian',
        className,
      )}
      onClick={() => setCyanotype(!on)}
    >
      <LuDroplet size={20} aria-hidden />
    </Button>
  );
};
