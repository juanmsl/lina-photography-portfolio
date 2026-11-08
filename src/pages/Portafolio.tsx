import { Typography } from 'polpo/components';
import { Fragment } from 'react';

import { BloqueContacto, PiePagina } from '../components/Contacto';
import { EncabezadoProyecto } from '../components/EncabezadoProyecto';
import { Ficha } from '../components/Ficha';
import { Foto } from '../components/Foto';
import { Galeria } from '../components/Galeria';
import { Navegacion } from '../components/Navegacion';
import { Rotulo } from '../components/Rotulo';
import { contacto } from '../content/contacto';
import { categorias, fotosDeProyecto, proyectos, type Proyecto } from '../content/proyectos';

const BloqueProyecto = ({ p }: { p: Proyecto }) => {
  const orden = fotosDeProyecto(p);

  return (
    <article aria-labelledby={`proyecto-${p.slug}`} className='px-5 pt-12 pb-20 md:px-10 md:pt-20 md:pb-30'>
      <div id={`proyecto-${p.slug}`}>
        <EncabezadoProyecto titulo={p.titulo} subtitulo={p.subtitulo} a={`/proyectos/${p.slug}`} />
      </div>
      <div className='mx-auto mt-8 max-w-[40rem] md:mt-10'>
        <Typography noPadding align='center' className='t-lead text-gris'>
          {p.resumen}
        </Typography>
        <Ficha datos={p.ficha} className='mt-8 md:mt-10' />
      </div>
      <Galeria
        filas={p.portada}
        cianotipia={p.cianotipia}
        proyecto={p.cianotipia ? undefined : { slug: p.slug, indice: id => orden.indexOf(id) }}
        className='mt-8 md:mt-16'
      />
    </article>
  );
};

export const Portafolio = () => (
  <>
    {/* Portada */}
    <section
      aria-labelledby='titulo-portada'
      className='relative flex min-h-[48.75rem] flex-col md:min-h-[min(100dvh,58.75rem)]'
    >
      <div className='absolute inset-x-0 top-0 h-[38.75rem] md:inset-y-0 md:left-[40%] md:h-auto'>
        <Foto id='lina' blancoYNegro prioridad posicion='50% 30%' className='size-full' />
        <div
          aria-hidden
          className='absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,var(--color-negro)_100%)] md:bg-[linear-gradient(to_right,var(--color-negro)_0%,transparent_38%),linear-gradient(to_bottom,rgb(10_10_11/0.55)_0%,transparent_14%,transparent_70%,var(--color-negro)_100%)]'
        />
      </div>

      <Navegacion />

      <div className='relative mt-auto px-4 md:px-9'>
        <Rotulo id='titulo-portada' as='h1' nivel='hero' titulo='Portafolio' voz='fotográfico' alinear='inicio' />
      </div>

      <div className='relative flex flex-col gap-2 px-5 pt-14 pb-6 md:flex-row md:items-center md:justify-between md:px-10 md:pt-24'>
        <Typography variant='small' noPadding className='font-code m-0 tracking-[0.02em] text-gris'>
          {contacto.base} · {contacto.coordenadasBase}
        </Typography>
        <Typography noPadding className='m-0 hidden text-gris md:block'>
          Paisaje · naturaleza · arquitectura · retrato · moda · producto
        </Typography>
      </div>
    </section>

    {/* ¿Quién soy? */}
    <section
      id='quien-soy'
      aria-labelledby='titulo-quien'
      className='scroll-mt-8 px-5 pt-24 pb-18 md:px-10 md:pt-45 md:pb-40'
    >
      <Typography id='titulo-quien' variant='header1' as='h2' noPadding align='center' className='m-0'>
        ¿Quién soy?
      </Typography>
      <Typography noPadding align='center' className='mx-auto mt-6 max-w-[45rem] t-lead md:mt-10'>
        Soy Lina Nieto, fotógrafa en Bogotá. Empecé fotografiando montaña, páramo y ciudad; de ahí viene mi forma de
        mirar: paciencia, luz natural y composición limpia.
      </Typography>
      <Ficha
        columnas={3}
        className='mx-auto mt-8 max-w-[50rem] md:mt-10'
        datos={[
          { etiqueta: 'Base', valor: contacto.base },
          { etiqueta: 'Enfoque', valor: 'Paisaje, naturaleza, arquitectura' },
          { etiqueta: 'También', valor: 'Retrato, moda y producto' },
        ]}
      />
    </section>

    {/* Proyectos por tipo */}
    {categorias.map(c => {
      const deCategoria = proyectos.filter(p => p.categoria === c.id);

      if (!deCategoria.length) return null;

      return (
        <Fragment key={c.id}>
          <div className='px-5 pt-30 pb-6 md:px-10 md:pt-50 md:pb-10'>
            <Rotulo titulo={c.titulo} voz={c.voz} />
          </div>
          {deCategoria.map(p => (
            <BloqueProyecto key={p.slug} p={p} />
          ))}
        </Fragment>
      );
    })}

    <BloqueContacto />
    <PiePagina />
  </>
);
