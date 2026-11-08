import { Button, Typography } from 'polpo/components';
import { LuCheck } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router';

import { DatoFicha } from '../components/Ficha';
import { Foto } from '../components/Foto';
import { Navegacion } from '../components/Navegacion';
import { abrirWhatsApp, mensajeWhatsApp } from '../content/contacto';
import { formatoMes, type SolicitudCotizacion } from '../content/cotizacion';

export const SolicitudEnviada = () => {
  const navigate = useNavigate();
  const datos = (useLocation().state ?? null) as SolicitudCotizacion | null;
  const primerNombre = datos?.nombre.trim().split(/\s+/)[0];
  const fecha = datos?.fecha ? formatoMes(datos.fecha) : '';
  const servicios = datos?.servicios.join(', ') ?? '';

  const resumen = [
    { etiqueta: 'Servicio', valor: servicios },
    { etiqueta: 'Fecha', valor: fecha ? fecha[0].toUpperCase() + fecha.slice(1) : '' },
    { etiqueta: 'Lugar', valor: datos?.lugar ?? '' },
  ].filter(d => d.valor);

  return (
    <div className='relative isolate flex min-h-dvh flex-col'>
      <div aria-hidden className='absolute inset-0 -z-10'>
        <Foto id='nubes' marcadorMudo className='size-full' />
        <div className='absolute inset-0 bg-[linear-gradient(to_bottom,rgb(10_10_11/0.6),var(--color-negro))]' />
      </div>

      <Navegacion />

      <main className='grid flex-1 place-content-center justify-items-center gap-7 px-5 py-20 text-center'>
        <span className='grid size-18 place-content-center rounded-full border border-hueso'>
          <LuCheck size={30} aria-hidden />
        </span>
        <Typography variant='header2' as='h1' noPadding className='m-0 flex flex-col items-center'>
          <span>Recibí tu solicitud</span>
          {primerNombre && <span className='voz-serif -mt-[0.1em] pl-[min(12.5rem,30vw)] text-[clamp(2.25rem,4vw,3.5rem)]'>gracias, {primerNombre}</span>}
        </Typography>
        <Typography noPadding className='m-0 max-w-[35rem] t-lead text-gris'>
          {datos?.correo
            ? `Te escribiré a ${datos.correo} con una propuesta. Si es urgente, escríbeme por WhatsApp.`
            : 'Te escribiré con una propuesta. Si es urgente, escríbeme por WhatsApp.'}
        </Typography>
        {resumen.length > 0 && (
          <dl className='m-0 grid w-full max-w-[41.5rem] gap-4 text-left sm:grid-cols-3 sm:gap-8'>
            {resumen.map(d => (
              <DatoFicha key={d.etiqueta} {...d} />
            ))}
          </dl>
        )}
        <div className='flex w-full flex-col gap-3 sm:w-auto sm:flex-row'>
          <Button
            color='primary'
            radius='full'
            onClick={() => abrirWhatsApp(mensajeWhatsApp(servicios.toLowerCase() || undefined, fecha || undefined))}
          >
            Escribir por WhatsApp
          </Button>
          <Button color='primary' variant='outlined' radius='full' onClick={() => navigate('/')}>
            Volver al portafolio
          </Button>
        </div>
      </main>
    </div>
  );
};
