import { Button, DatePicker, Input, Textarea, Typography } from 'polpo/components';
import { useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

import { Footer } from '../components/ContactSection';
import { DualTitle } from '../components/DualTitle';
import { FactItem } from '../components/FactSheet';
import { Navigation } from '../components/Navigation';
import { ServiceTilePicker } from '../components/ServiceTilePicker';
import { openWhatsApp, contact, whatsappMessage } from '../content/contact';
import { formatMonth, type QuoteRequest } from '../content/quote';
import { quoteOptions } from '../content/services';

const preselect = (service?: string) =>
  service ? quoteOptions.filter(o => service.toLowerCase().includes(o.value.toLowerCase())).map(o => o.value) : [];

export const QuotePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { service?: string } };
  const [sending, setSending] = useState(false);

  const methods = useForm<QuoteRequest>({
    defaultValues: {
      services: preselect(state?.service),
      name: '',
      email: '',
      whatsapp: '',
      date: '',
      place: '',
      project: '',
    },
  });
  const [selectedServices, date] = useWatch({ control: methods.control, name: ['services', 'date'] });

  const message = whatsappMessage(
    selectedServices?.length ? selectedServices.join(', ').toLowerCase() : undefined,
    date ? formatMonth(date) : undefined,
  );

  const submit = methods.handleSubmit(async data => {
    setSending(true);
    // Pending: connect to a service that receives the requests (email or form backend).
    await new Promise(r => {
      setTimeout(r, 600);
    });
    navigate('/cotizar/enviada', { state: data, viewTransition: true });
  });

  return (
    <>
      <Navigation />

      <section aria-labelledby='quote-title' className='px-5 pt-20 pb-12 md:px-10 md:pt-40 md:pb-24'>
        <DualTitle id='quote-title' as='h1' level='hero' title='Cotizar' voice='cuéntame tu proyecto' />
        <Typography noPadding align='center' className='mx-auto mt-8 max-w-[40rem] t-lead text-ash md:mt-10'>
          Respondo con una propuesta: alcance, fechas y valor. Los campos con * son obligatorios.
        </Typography>
      </section>

      <section className='px-5 pb-24 md:px-10 md:pb-40'>
        <div className='grid gap-16 lg:grid-cols-[minmax(0,50rem)_minmax(0,27.5rem)] lg:justify-between lg:gap-30'>
          <FormProvider {...methods}>
            <form onSubmit={submit} noValidate className='line-fields grid gap-10'>
              <ServiceTilePicker
                name='services'
                control={methods.control}
                label='¿Qué quieres fotografiar? *'
                options={quoteOptions}
                requiredMessage='Elige al menos un tipo de foto.'
              />

              <div className='grid gap-10 md:grid-cols-2'>
                <Input.Controller
                  name='name'
                  label='Nombre *'
                  placeholder='Tu nombre'
                  autoComplete='name'
                  variant='line'
                  rules={{ required: 'Escribe tu nombre.' }}
                />
                <Input.Controller
                  name='email'
                  type='email'
                  label='Correo electrónico *'
                  placeholder='tu@correo.com'
                  autoComplete='email'
                  variant='line'
                  rules={{
                    required: 'Escribe tu correo para poder responderte.',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Escribe un correo válido, por ejemplo ana@marca.co',
                    },
                  }}
                />
              </div>

              <div className='grid gap-10 md:grid-cols-2'>
                <Input.Controller
                  name='whatsapp'
                  label='WhatsApp (opcional)'
                  placeholder={contact.whatsappDisplay}
                  autoComplete='tel'
                  variant='line'
                />
                <DatePicker.Controller name='date' type='month' label='Fecha aproximada' variant='line' />
              </div>

              <Input.Controller name='place' label='Lugar' placeholder='Ciudad, estudio o locación' variant='line' />

              <Textarea.Controller
                name='project'
                label='Cuéntame del proyecto *'
                placeholder='Qué quieres fotografiar, para qué usarás las fotos y una fecha aproximada.'
                rows={3}
                variant='line'
                rules={{ required: 'Cuéntame un poco del proyecto.' }}
              />

              <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6'>
                <Button type='submit' color='primary' radius='full' isLoading={sending}>
                  Enviar solicitud
                </Button>
                <Typography noPadding className='m-0 text-ash'>
                  Solo uso tus datos para responderte.
                </Typography>
              </div>
            </form>
          </FormProvider>

          <aside aria-labelledby='whatsapp-title' className='grid content-start gap-6'>
            <Typography id='whatsapp-title' variant='header3' as='h2' noPadding className='m-0'>
              ¿Prefieres WhatsApp?
            </Typography>
            <Typography noPadding className='m-0 t-lead text-ash'>
              Abre una conversación con un mensaje listo para enviar. Puedes editarlo antes.
            </Typography>
            <div className='rounded-2xl bg-charcoal p-5'>
              <Typography noPadding className='m-0 t-lead'>
                {message}
              </Typography>
              <Typography variant='small' noPadding className='font-code m-0 mt-2 text-ash'>
                Mensaje listo para enviar · puedes editarlo
              </Typography>
            </div>
            <div>
              <Button color='primary' variant='outlined' radius='full' onClick={() => openWhatsApp(message)}>
                Escribir por WhatsApp
              </Button>
            </div>
            <dl className='m-0 grid gap-6'>
              <FactItem label='Correo' value={contact.email} />
              <FactItem label='Instagram' value={contact.instagram} />
            </dl>
          </aside>
        </div>
      </section>

      <Footer />
    </>
  );
};
