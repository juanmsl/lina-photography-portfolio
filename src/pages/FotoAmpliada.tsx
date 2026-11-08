import { Button, Typography } from 'polpo/components';
import { useEventListener } from 'polpo/hooks';
import { LuArrowLeft, LuChevronLeft, LuChevronRight, LuMapPin, LuX } from 'react-icons/lu';
import { Link, Navigate, useNavigate, useParams } from 'react-router';

import { Foto } from '../components/Foto';
import { MarcoPlancha } from '../components/MarcoPlancha';
import { fotos, formatoCoordenadas } from '../content/fotos';
import { buscarProyecto, fotosDeProyecto } from '../content/proyectos';

import { NoEncontrada } from './NoEncontrada';

const BotonCirculo = ({ etiqueta, onClick, children, className }: { etiqueta: string; onClick: () => void; children: React.ReactNode; className?: string }) => (
  <Button
    forIcon
    variant='outlined'
    radius='full'
    aria-label={etiqueta}
    onClick={onClick}
    className={`size-12 shrink-0 border-grafito text-hueso hover:border-hueso md:size-14 ${className ?? ''}`}
  >
    {children}
  </Button>
);

export const FotoAmpliada = () => {
  const { slug, n } = useParams();
  const navigate = useNavigate();
  const p = buscarProyecto(slug);
  const lista = p ? fotosDeProyecto(p) : [];
  const actual = Number(n);

  const ir = (i: number) => {
    if (!p) return;
    const siguiente = ((i - 1 + lista.length) % lista.length) + 1;
    navigate(`/proyectos/${p.slug}/foto/${siguiente}`, { replace: true });
  };
  const cerrar = () => p && navigate(`/proyectos/${p.slug}`);

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') ir(actual - 1);
    if (e.key === 'ArrowRight') ir(actual + 1);
    if (e.key === 'Escape') cerrar();
  });

  if (!p) return <NoEncontrada />;
  if (!Number.isInteger(actual) || actual < 1 || actual > lista.length) {
    return <Navigate to={`/proyectos/${p.slug}/foto/1`} replace />;
  }

  const id = lista[actual - 1];
  const info = fotos[id];
  const rotulo = [info.titulo, info.coordenadas && formatoCoordenadas(info.coordenadas), info.altitud].filter(Boolean).join(' · ');

  return (
    <main className='flex min-h-dvh flex-col px-5 pt-4 pb-8 md:px-10 md:pt-7 md:pb-10'>
      <div className='flex items-center justify-between'>
        <Link to={`/proyectos/${p.slug}`} className='inline-flex items-center gap-2.5 t-label font-medium hover:text-gris'>
          <LuArrowLeft size={18} aria-hidden />
          {p.titulo}
        </Link>
        <Typography variant='small' noPadding className='font-code m-0 tracking-[0.02em] text-gris' aria-live='polite'>
          {actual} / {lista.length}
        </Typography>
        <BotonCirculo etiqueta='Cerrar' onClick={cerrar}>
          <LuX size={22} aria-hidden />
        </BotonCirculo>
      </div>

      <div className='mt-6 flex flex-1 items-center gap-6 md:mt-6 md:gap-6'>
        <BotonCirculo etiqueta='Foto anterior' onClick={() => ir(actual - 1)} className='hidden md:inline-flex'>
          <LuChevronLeft size={22} aria-hidden />
        </BotonCirculo>

        <MarcoPlancha coordenadas={info.coordenadas} className='mx-auto w-full max-w-[73.5rem]'>
          <div className='relative'>
            <Foto id={id} prioridad className='aspect-[4/5] w-full sm:aspect-[1120/700]' />
            {rotulo && (
              <span className='absolute bottom-4 left-4 flex items-center gap-2.5 t-small font-medium text-white md:bottom-10 md:left-15'>
                <LuMapPin size={16} aria-hidden />
                <span className='font-code tracking-[0.02em]'>{rotulo}</span>
              </span>
            )}
          </div>
        </MarcoPlancha>

        <BotonCirculo etiqueta='Foto siguiente' onClick={() => ir(actual + 1)} className='hidden md:inline-flex'>
          <LuChevronRight size={22} aria-hidden />
        </BotonCirculo>
      </div>

      <div className='mx-auto mt-6 flex w-full max-w-[70rem] flex-col gap-5 md:mt-8 md:flex-row md:items-end md:justify-between'>
        <div className='flex flex-wrap items-baseline gap-x-4'>
          <Typography variant='header3' as='h1' noPadding className='m-0'>
            {info.titulo}
          </Typography>
          {info.region && <span className='voz-serif t-serif'>{info.region}</span>}
        </div>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex gap-3 md:hidden'>
            <BotonCirculo etiqueta='Foto anterior' onClick={() => ir(actual - 1)}>
              <LuChevronLeft size={22} aria-hidden />
            </BotonCirculo>
            <BotonCirculo etiqueta='Foto siguiente' onClick={() => ir(actual + 1)}>
              <LuChevronRight size={22} aria-hidden />
            </BotonCirculo>
          </div>
          <Button color='primary' variant='outlined' radius='full' onClick={() => navigate('/cotizar')}>
            Cotizar algo así
          </Button>
        </div>
      </div>
      {info.provisional && (
        <Typography variant='small' noPadding className='font-code mx-auto mt-6 w-full max-w-[70rem] text-grafito'>
          Foto provisional
        </Typography>
      )}
    </main>
  );
};
