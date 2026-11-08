import { Typography } from 'polpo/components';
import { LuArrowRight } from 'react-icons/lu';
import { Link } from 'react-router';

import { BloqueContacto, PiePagina } from '../components/Contacto';
import { Foto } from '../components/Foto';
import { Navegacion } from '../components/Navegacion';
import { Rotulo } from '../components/Rotulo';
import { pasos, preguntas, servicios } from '../content/servicios';

export const Servicios = () => (
  <>
    <Navegacion />

    <section aria-labelledby='titulo-servicios' className='px-5 pt-20 pb-14 md:px-10 md:pt-40 md:pb-30'>
      <Rotulo id='titulo-servicios' as='h1' nivel='hero' titulo='Servicios' voz='por encargo' />
      <Typography noPadding align='center' className='mx-auto mt-8 max-w-[40rem] t-lead text-gris md:mt-10'>
        Fotografía para marcas, editoriales y personas. El precio depende del proyecto: te envío una propuesta.
      </Typography>
    </section>

    <section aria-label='Lista de servicios' className='px-5 pb-24 md:px-10 md:pb-40'>
      <ul className='m-0 grid list-none gap-0 p-0 md:gap-10'>
        {servicios.map(s => (
          <li key={s.nombre}>
            <Link
              to='/cotizar'
              state={{ servicio: s.nombre }}
              className='group grid gap-4 border-t border-grafito py-7 md:grid-cols-[minmax(0,32.5rem)_minmax(0,24.25rem)_17.5rem_auto] md:items-center md:gap-12 md:py-8'
            >
              <Typography variant='header3' as='h2' noPadding className='m-0'>
                {s.nombre}
              </Typography>
              <Typography noPadding className='m-0 t-lead text-gris'>
                {s.descripcion}
              </Typography>
              <Foto id={s.foto} className='aspect-[280/180] w-full md:w-70' />
              <span className='hidden items-center gap-2 t-label font-medium text-gris transition-colors group-hover:text-hueso md:inline-flex'>
                <span className='sr-only'>Cotizar {s.nombre}</span>
                <LuArrowRight size={28} aria-hidden className='transition-transform group-hover:translate-x-1 motion-reduce:transition-none' />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>

    <section aria-labelledby='titulo-como' className='px-5 pb-24 md:px-10 md:pb-40'>
      <Typography id='titulo-como' variant='header1' as='h2' noPadding className='m-0'>
        Cómo trabajo
      </Typography>
      <ol className='m-0 mt-8 grid list-none gap-6 p-0 sm:grid-cols-2 md:mt-10 lg:grid-cols-4 lg:gap-10'>
        {pasos.map(paso => (
          <li key={paso.titulo} className='border-t border-grafito pt-6'>
            <Typography variant='header3' as='h3' noPadding className='m-0'>
              {paso.titulo}
            </Typography>
            <Typography noPadding className='m-0 mt-3 text-gris'>
              {paso.texto}
            </Typography>
          </li>
        ))}
      </ol>
    </section>

    <section aria-labelledby='titulo-preguntas' className='px-5 md:px-10'>
      <Typography id='titulo-preguntas' variant='header1' as='h2' noPadding className='m-0'>
        Preguntas
      </Typography>
      <dl className='m-0 mt-8 grid gap-6 md:mt-10 md:grid-cols-2 md:gap-10'>
        {preguntas.map(q => (
          <div key={q.pregunta} className='border-t border-grafito pt-6'>
            <Typography as='dt' noPadding className='m-0 text-[1.25rem] font-semibold'>
              {q.pregunta}
            </Typography>
            <Typography as='dd' noPadding className='m-0 mt-3 max-w-[37.5rem] text-gris'>
              {q.respuesta}
            </Typography>
          </div>
        ))}
      </dl>
    </section>

    <BloqueContacto conTexto={false} conCanales={false} />
    <PiePagina />
  </>
);
