import { AsideModal, Button, Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { useViewport } from 'polpo/hooks';
import { useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';
import { Link, useLocation, useNavigate } from 'react-router';

import { contact } from '../content/contact';

const links = [
  { label: 'Portafolio', a: '/' },
  { label: 'Servicios', a: '/servicios' },
  { label: 'Sobre mí', a: '/#quien-soy' },
  { label: 'Contacto', a: '/#contacto' },
];

const isActive = (a: string, pathname: string, hash: string) => {
  const [route, anchor] = a.split('#');

  if (anchor) return pathname === route && hash === `#${anchor}`;

  if (route === '/') return pathname === '/' && !hash;

  return pathname.startsWith(route);
};

const Brand = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
  <Link
    to='/'
    onClick={onClick}
    className={cn('font-title t-header4 font-extrabold tracking-[-0.01em] text-bone', className)}
  >
    Lina Nieto
  </Link>
);

type NavigationProps = { className?: string };

/** D/Navigation: brand, links and Quote on desktop; brand and menu on mobile. */
export const Navigation = ({ className }: NavigationProps) => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const { width } = useViewport();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={cn('relative z-20 px-5 pt-4 md:px-10 md:pt-8', className)}>
      <nav aria-label='Principal' className='flex items-center justify-between gap-6'>
        <Brand />

        <ul className='m-0 hidden list-none gap-9 p-0 lg:flex'>
          {links.map(e => (
            <li key={e.a}>
              <Link
                to={e.a}
                aria-current={isActive(e.a, pathname, hash) ? 'page' : undefined}
                className={cn(
                  't-label font-medium transition-colors hover:text-bone',
                  isActive(e.a, pathname, hash) ? 'text-bone' : 'text-ash',
                )}
              >
                {e.label}
              </Link>
            </li>
          ))}
        </ul>

        <Button color='primary' radius='full' className='hidden lg:flex' onClick={() => navigate('/cotizar')}>
          Cotizar
        </Button>

        <Button
          forIcon
          variant='outlined'
          radius='full'
          aria-label='Abrir menú'
          aria-expanded={menuOpen}
          className='size-11 border-graphite text-bone lg:hidden'
          onClick={() => setMenuOpen(true)}
        >
          <LuMenu size={20} aria-hidden />
        </Button>
      </nav>

      <AsideModal
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        position='right'
        size={width || 390}
        backdrop='opaque'
        noCloseButton
        className='border-0! bg-ink'
        contentClassName='p-0!'
      >
        <div className='flex min-h-dvh flex-col px-5 pt-4 pb-10'>
          <div className='flex items-center justify-between'>
            <Brand onClick={() => setMenuOpen(false)} />
            <Button
              forIcon
              variant='outlined'
              radius='full'
              aria-label='Cerrar menú'
              className='size-11 border-graphite text-bone'
              onClick={() => setMenuOpen(false)}
            >
              <LuX size={18} aria-hidden />
            </Button>
          </div>

          <ul className='m-0 mt-32 grid list-none gap-1 p-0'>
            {links.map(e => (
              <li key={e.a}>
                <Link
                  to={e.a}
                  onClick={() => setMenuOpen(false)}
                  className='font-title text-[3.25rem] leading-[0.94] font-extrabold tracking-[-0.03em]'
                >
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>

          <Button
            color='primary'
            radius='full'
            fullWidth
            className='mt-auto'
            onClick={() => {
              setMenuOpen(false);
              navigate('/cotizar');
            }}
          >
            Cotizar un proyecto
          </Button>
          <Typography variant='small' noPadding className='font-code mt-6 text-ash'>
            {contact.base} · {contact.baseCoordinates}
          </Typography>
        </div>
      </AsideModal>
    </header>
  );
};
