import { Button } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { LuLightbulb, LuLightbulbOff } from 'react-icons/lu';

import { setTheme, useTheme } from '../theme';

/**
 * Light switch: the bulb is off in the dark theme (default) and on, like a
 * camera flash, in the light theme. The choice is remembered.
 */
export const ThemeToggle = ({ className }: { className?: string }) => {
  const isLight = useTheme() === 'light';

  return (
    <Button
      forIcon
      variant='outlined'
      radius='full'
      aria-label={isLight ? 'Apagar la luz (tema oscuro)' : 'Encender la luz (tema claro)'}
      aria-pressed={isLight}
      title={isLight ? 'Apagar la luz' : 'Encender la luz'}
      className={cn('size-11 border-graphite text-bone', className)}
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
    >
      {isLight ? <LuLightbulb size={20} aria-hidden /> : <LuLightbulbOff size={20} aria-hidden />}
    </Button>
  );
};
