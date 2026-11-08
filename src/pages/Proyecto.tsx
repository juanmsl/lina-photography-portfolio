import { Typography } from 'polpo/components';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { Link, useParams } from 'react-router';

import { BloqueContacto, PiePagina } from '../components/Contacto';
import { EncabezadoProyecto } from '../components/EncabezadoProyecto';
import { Ficha } from '../components/Ficha';
import { Foto } from '../components/Foto';
import { Galeria } from '../components/Galeria';
import { Navegacion } from '../components/Navegacion';
import { Rotulo } from '../components/Rotulo';
import { buscarProyecto, categoriaDe, fotosDeProyecto, siguienteProyecto } from '../content/proyectos';

import { NoEncontrada } from './NoEncontrada';

export const Proyecto = () => {
  const { slug } = useParams();
  const p = buscarProyecto(slug);
  if (!p) return <NoEncontrada />;

  const c = categoriaDe(p);
  const orden = fotosDeProyecto(p);
  const siguiente = siguienteProyecto(p);
  const indice = { slug: p.slug, indice: (id: (typeof orden)[number]) => orden.indexOf(id) };

  return (
    <>
      <Navegacion />

      <section aria-labelledby='titulo-proyecto' className='px-5 pt-16 pb-10 md:px-10 md:pt-30 md:pb-16'>
        <div className='flex justify-center'>
          <Link to='/' className='inline-flex items-center gap-2.5 t-label font-medium text-gris hover:text-hueso'>
            <LuArrowLeft size={18} aria-hidden />
            Portafolio · {c.titulo} {c.voz}
          </Link>
        </div>
        <Rotulo id='titulo-proyecto' as='h1' nivel='hero' titulo={p.titulo} voz={p.subtitulo.toLowerCase()} className='mt-10' />
      </section>

      <Link to={`/proyectos/${p.slug}/foto/1`} aria-label='Ver la foto principal ampliada' className='block'>
        <Foto id={p.principal} prioridad cianotipia={p.cianotipia ? 'fija' : undefined} className='aspect-[4/3] w-full md:aspect-[1440/820]' />
      </Link>

      <section className='px-5 py-16 md:px-10 md:py-30'>
        <div className='grid gap-10 lg:grid-cols-[minmax(0,52.5rem)_minmax(0,25rem)] lg:justify-between lg:gap-30'>
          <div className='grid content-start gap-6'>
            {[p.resumen, ...(p.texto ?? [])].map(t => (
              <Typography key={t.slice(0, 20)} noPadding className='m-0 t-lead'>
                {t}
              </Typography>
            ))}
            {p.ejemplo && (
              <Typography variant='small' noPadding className='font-code m-0 text-gris'>
                Proyecto de ejemplo con fotos provisionales.
              </Typography>
            )}
          </div>
          <Ficha datos={p.ficha} columnas={1} />
        </div>
      </section>

      <section aria-label='Galería' className='px-5 pb-20 md:px-10 md:pb-30'>
        <Galeria filas={p.galeria} cianotipia={p.cianotipia} proyecto={p.cianotipia ? undefined : indice} />
      </section>

      {p.delAzulAlColor && (
        <section aria-labelledby='titulo-azul' className='px-5 pt-10 pb-24 md:px-10 md:pt-20 md:pb-40'>
          <div id='titulo-azul'>
            <EncabezadoProyecto as='h2' titulo='Del azul al color' subtitulo='la misma foto, dos veces' />
          </div>
          <div className='mt-8 grid gap-2 md:mt-10 md:grid-cols-2 md:gap-4'>
            <Foto id={p.delAzulAlColor} cianotipia='fija' className='aspect-[672/500]' />
            <Foto id={p.delAzulAlColor} className='aspect-[672/500]' />
          </div>
        </section>
      )}

      <nav aria-label='Siguiente proyecto' className='border-t border-grafito px-5 py-12 md:px-10 md:py-16'>
        <Link
          to={`/proyectos/${siguiente.slug}`}
          className='group flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-12'
        >
          <span className='flex flex-col'>
            <Typography variant='header2' as='span' noPadding className='m-0'>
              {siguiente.titulo}
            </Typography>
            <span className='voz-serif -mt-1 t-serif'>siguiente proyecto</span>
          </span>
          <span className='flex items-center gap-8'>
            <Foto id={siguiente.principal} className='aspect-[440/280] w-full max-w-[27.5rem]' />
            <span className='hidden size-18 shrink-0 place-content-center rounded-full border border-grafito transition-colors group-hover:border-hueso md:grid'>
              <LuArrowRight size={26} aria-hidden />
            </span>
          </span>
        </Link>
      </nav>

      <BloqueContacto conTexto />
      <PiePagina />
    </>
  );
};
