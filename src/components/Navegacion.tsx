import { AsideModal, Button, Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { useViewport } from 'polpo/hooks';
import { useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';
import { Link, useLocation, useNavigate } from 'react-router';

import { contacto } from '../content/contacto';

const enlaces = [
  { etiqueta: 'Portafolio', a: '/' },
  { etiqueta: 'Servicios', a: '/servicios' },
  { etiqueta: 'Sobre mí', a: '/#quien-soy' },
  { etiqueta: 'Contacto', a: '/#contacto' },
];

const esActivo = (a: string, pathname: string, hash: string) => {
  const [ruta, ancla] = a.split('#');
  if (ancla) return pathname === ruta && hash === `#${ancla}`;
  if (ruta === '/') return pathname === '/' && !hash;
  return pathname.startsWith(ruta);
};

const Marca = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
  <Link to='/' onClick={onClick} className={cn('font-title t-header4 font-extrabold tracking-[-0.01em] text-hueso', className)}>
    Lina Nieto
  </Link>
);

type NavegacionProps = { className?: string };

/** D/Navegación: marca, enlaces y Cotizar en escritorio; marca y menú en móvil. */
export const Navegacion = ({ className }: NavegacionProps) => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const { width } = useViewport();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className={cn('relative z-20 px-5 pt-4 md:px-10 md:pt-8', className)}>
      <nav aria-label='Principal' className='flex items-center justify-between gap-6'>
        <Marca />

        <ul className='m-0 hidden list-none gap-9 p-0 lg:flex'>
          {enlaces.map(e => (
            <li key={e.a}>
              <Link
                to={e.a}
                aria-current={esActivo(e.a, pathname, hash) ? 'page' : undefined}
                className={cn(
                  't-label font-medium transition-colors hover:text-hueso',
                  esActivo(e.a, pathname, hash) ? 'text-hueso' : 'text-gris',
                )}
              >
                {e.etiqueta}
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
          aria-expanded={menuAbierto}
          className='size-11 border-grafito text-hueso lg:hidden'
          onClick={() => setMenuAbierto(true)}
        >
          <LuMenu size={20} aria-hidden />
        </Button>
      </nav>

      <AsideModal
        isOpen={menuAbierto}
        onClose={() => setMenuAbierto(false)}
        position='right'
        size={width || 390}
        backdrop='opaque'
        noCloseButton
        className='border-0! bg-negro'
        contentClassName='p-0!'
      >
        <div className='flex min-h-dvh flex-col px-5 pt-4 pb-10'>
          <div className='flex items-center justify-between'>
            <Marca onClick={() => setMenuAbierto(false)} />
            <Button
              forIcon
              variant='outlined'
              radius='full'
              aria-label='Cerrar menú'
              className='size-11 border-grafito text-hueso'
              onClick={() => setMenuAbierto(false)}
            >
              <LuX size={18} aria-hidden />
            </Button>
          </div>

          <ul className='m-0 mt-32 grid list-none gap-1 p-0'>
            {enlaces.map(e => (
              <li key={e.a}>
                <Link to={e.a} onClick={() => setMenuAbierto(false)} className='font-title text-[3.25rem] leading-[0.94] font-extrabold tracking-[-0.03em]'>
                  {e.etiqueta}
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
              setMenuAbierto(false);
              navigate('/cotizar');
            }}
          >
            Cotizar un proyecto
          </Button>
          <Typography variant='small' noPadding className='font-code mt-6 text-gris'>
            {contacto.base} · {contacto.coordenadasBase}
          </Typography>
        </div>
      </AsideModal>
    </header>
  );
};
