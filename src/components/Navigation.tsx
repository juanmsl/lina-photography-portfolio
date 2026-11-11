import { AsideModal, Button, Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { useViewport } from 'polpo/hooks';
import { useEffect, useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';
import { Link, useLocation, useNavigate } from 'react-router';

import { contact } from '../content/contact';

import { Logo } from './Logo';
import { Logotype } from './Logotype';
import { ThemeToggle } from './ThemeToggle';

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
    viewTransition
    to='/'
    onClick={onClick}
    aria-label='Lina Nieto, ir al inicio'
    className={cn('inline-flex items-center gap-3 text-bone', className)}
  >
    <Logo className='h-10 w-auto md:h-11' />
    <Logotype className='h-8 w-auto md:h-9' />
  </Link>
);

type NavigationProps = { className?: string };

/** D/Navigation: brand, links and Quote on desktop; brand and menu on mobile. Sticky at the top while scrolling. */
export const Navigation = ({ className }: NavigationProps) => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const { width } = useViewport();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Transparent at the top of the page; once the page scrolls, the bar gets the ground color and a rule.
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);

    update();
    window.addEventListener('scroll', update, { passive: true });

    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <header
      className={cn(
        'site-header sticky top-0 z-30 flex h-[var(--header-h)] items-center border-b px-5 transition-[background-color,border-color] duration-300 ease-out md:px-10',
        scrolled ? 'border-graphite bg-ink' : 'border-transparent bg-transparent',
        className,
      )}
    >
      <nav aria-label='Principal' className='flex w-full items-center justify-between gap-6'>
        <Brand />

        <ul className='m-0 hidden list-none gap-9 p-0 lg:flex'>
          {links.map(e => (
            <li key={e.a}>
              <Link
                viewTransition
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

        <div className='flex items-center gap-3'>
          <ThemeToggle />

          <Button
            color='primary'
            radius='full'
            className='hidden lg:flex'
            onClick={() => navigate('/cotizar', { viewTransition: true })}
          >
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
        </div>
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
                  viewTransition
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
              navigate('/cotizar', { viewTransition: true });
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
