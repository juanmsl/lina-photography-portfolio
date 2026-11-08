import { Button, DatePicker, Input, Textarea, Typography } from 'polpo/components';
import { useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

import { PiePagina } from '../components/Contacto';
import { DatoFicha } from '../components/Ficha';
import { MosaicoServicio } from '../components/MosaicoServicio';
import { Navegacion } from '../components/Navegacion';
import { Rotulo } from '../components/Rotulo';
import { abrirWhatsApp, contacto, mensajeWhatsApp } from '../content/contacto';
import { formatoMes, type SolicitudCotizacion } from '../content/cotizacion';
import { opcionesCotizar } from '../content/servicios';

const preseleccion = (servicio?: string) =>
  servicio ? opcionesCotizar.filter(o => servicio.toLowerCase().includes(o.valor.toLowerCase())).map(o => o.valor) : [];

export const Cotizar = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { servicio?: string } };
  const [enviando, setEnviando] = useState(false);

  const methods = useForm<SolicitudCotizacion>({
    defaultValues: {
      servicios: preseleccion(state?.servicio),
      nombre: '',
      correo: '',
      whatsapp: '',
      fecha: '',
      lugar: '',
      proyecto: '',
    },
  });
  const [serviciosElegidos, fecha] = useWatch({ control: methods.control, name: ['servicios', 'fecha'] });

  const mensaje = mensajeWhatsApp(
    serviciosElegidos?.length ? serviciosElegidos.join(', ').toLowerCase() : undefined,
    fecha ? formatoMes(fecha) : undefined,
  );

  const enviar = methods.handleSubmit(async datos => {
    setEnviando(true);
    // Pendiente: conectar con el servicio que reciba las solicitudes (correo o formulario).
    await new Promise(r => setTimeout(r, 600));
    navigate('/cotizar/enviada', { state: datos });
  });

  return (
    <>
      <Navegacion />

      <section aria-labelledby='titulo-cotizar' className='px-5 pt-20 pb-12 md:px-10 md:pt-40 md:pb-24'>
        <Rotulo id='titulo-cotizar' as='h1' nivel='hero' titulo='Cotizar' voz='cuéntame tu proyecto' />
        <Typography noPadding align='center' className='mx-auto mt-8 max-w-[40rem] t-lead text-gris md:mt-10'>
          Respondo con una propuesta: alcance, fechas y valor. Los campos con * son obligatorios.
        </Typography>
      </section>

      <section className='px-5 pb-24 md:px-10 md:pb-40'>
        <div className='grid gap-16 lg:grid-cols-[minmax(0,50rem)_minmax(0,27.5rem)] lg:justify-between lg:gap-30'>
          <FormProvider {...methods}>
            <form onSubmit={enviar} noValidate className='campo-d grid gap-10'>
              <MosaicoServicio
                name='servicios'
                control={methods.control}
                etiqueta='¿Qué quieres fotografiar? *'
                opciones={opcionesCotizar}
                requerido='Elige al menos un tipo de foto.'
              />

              <div className='grid gap-10 md:grid-cols-2'>
                <Input.Controller
                  name='nombre'
                  label='Nombre *'
                  placeholder='Tu nombre'
                  autoComplete='name'
                  variant='line'
                  rules={{ required: 'Escribe tu nombre.' }}
                />
                <Input.Controller
                  name='correo'
                  type='email'
                  label='Correo electrónico *'
                  placeholder='tu@correo.com'
                  autoComplete='email'
                  variant='line'
                  rules={{
                    required: 'Escribe tu correo para poder responderte.',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Escribe un correo válido, por ejemplo ana@marca.co' },
                  }}
                />
              </div>

              <div className='grid gap-10 md:grid-cols-2'>
                <Input.Controller
                  name='whatsapp'
                  label='WhatsApp (opcional)'
                  placeholder={contacto.whatsappVisible}
                  autoComplete='tel'
                  variant='line'
                />
                <DatePicker.Controller name='fecha' type='month' label='Fecha aproximada' variant='line' />
              </div>

              <Input.Controller name='lugar' label='Lugar' placeholder='Ciudad, estudio o locación' variant='line' />

              <Textarea.Controller
                name='proyecto'
                label='Cuéntame del proyecto *'
                placeholder='Qué quieres fotografiar, para qué usarás las fotos y una fecha aproximada.'
                rows={3}
                variant='line'
                rules={{ required: 'Cuéntame un poco del proyecto.' }}
              />

              <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6'>
                <Button type='submit' color='primary' radius='full' isLoading={enviando}>
                  Enviar solicitud
                </Button>
                <Typography noPadding className='m-0 text-gris'>
                  Solo uso tus datos para responderte.
                </Typography>
              </div>
            </form>
          </FormProvider>

          <aside aria-labelledby='titulo-whatsapp' className='grid content-start gap-6'>
            <Typography id='titulo-whatsapp' variant='header3' as='h2' noPadding className='m-0'>
              ¿Prefieres WhatsApp?
            </Typography>
            <Typography noPadding className='m-0 t-lead text-gris'>
              Abre una conversación con un mensaje listo para enviar. Puedes editarlo antes.
            </Typography>
            <div className='rounded-2xl bg-carbon p-5'>
              <Typography noPadding className='m-0 t-lead'>
                {mensaje}
              </Typography>
              <Typography variant='small' noPadding className='font-code m-0 mt-2 text-gris'>
                Mensaje listo para enviar · puedes editarlo
              </Typography>
            </div>
            <div>
              <Button color='primary' variant='outlined' radius='full' onClick={() => abrirWhatsApp(mensaje)}>
                Escribir por WhatsApp
              </Button>
            </div>
            <dl className='m-0 grid gap-6'>
              <DatoFicha etiqueta='Correo' valor={contacto.correo} />
              <DatoFicha etiqueta='Instagram' valor={contacto.instagram} />
            </dl>
          </aside>
        </div>
      </section>

      <PiePagina />
    </>
  );
};
