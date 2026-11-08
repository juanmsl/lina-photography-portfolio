import { Button, Typography } from 'polpo/components';
import { useNavigate } from 'react-router';

import { abrirWhatsApp, contacto } from '../content/contacto';

import { DatoFicha } from './Ficha';
import { Rotulo } from './Rotulo';

const ANIO = new Date().getFullYear();

/** Acciones de contacto: Cotizar (primario) y WhatsApp (contorno). */
export const AccionesContacto = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4'>
      <Button color='primary' radius='full' onClick={() => navigate('/cotizar')}>
        Cotizar un proyecto
      </Button>
      <Button color='primary' variant='outlined' radius='full' onClick={() => abrirWhatsApp()}>
        Escribir por WhatsApp
      </Button>
    </div>
  );
};

type BloqueContactoProps = { conCanales?: boolean; conTexto?: boolean };

/** Cierre "¿Hablamos?" de las páginas. */
export const BloqueContacto = ({ conCanales = true, conTexto = true }: BloqueContactoProps) => (
  <section
    id='contacto'
    aria-labelledby='titulo-contacto'
    className='scroll-mt-8 px-5 pt-28 pb-18 md:px-10 md:pt-52 md:pb-30'
  >
    <Rotulo id='titulo-contacto' titulo='¿Hablamos?' voz='cuéntame tu proyecto' nivel='hero' />
    {conTexto && (
      <Typography noPadding align='center' className='mx-auto mt-8 max-w-[35rem] t-lead text-gris'>
        Te respondo con una propuesta: alcance, fechas y valor.
      </Typography>
    )}
    <div className='mt-8'>
      <AccionesContacto />
    </div>
    {conCanales && (
      <dl className='mx-auto mt-10 grid max-w-[51rem] gap-4 sm:grid-cols-3 sm:gap-12'>
        <DatoFicha etiqueta='WhatsApp' valor={contacto.whatsappVisible} />
        <DatoFicha etiqueta='Correo' valor={contacto.correo} />
        <DatoFicha etiqueta='Instagram' valor={contacto.instagram} />
      </dl>
    )}
  </section>
);

export const PiePagina = () => (
  <footer className='flex flex-col gap-2 border-t border-grafito px-5 pt-7 pb-9 sm:flex-row sm:items-center sm:justify-between md:px-10 md:pt-8 md:pb-10'>
    <Typography noPadding className='m-0 text-gris'>
      © {ANIO} Lina María Nieto Gómez
    </Typography>
    <Typography variant='small' noPadding className='font-code m-0 tracking-[0.02em] text-gris'>
      {contacto.base} · {contacto.coordenadasBase}
    </Typography>
  </footer>
);
