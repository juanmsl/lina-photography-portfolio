import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';

import { Metadatos } from './components/Metadatos';
import { Cotizar } from './pages/Cotizar';
import { FotoAmpliada } from './pages/FotoAmpliada';
import { NoEncontrada } from './pages/NoEncontrada';
import { Portafolio } from './pages/Portafolio';
import { Proyecto } from './pages/Proyecto';
import { Servicios } from './pages/Servicios';
import { SolicitudEnviada } from './pages/SolicitudEnviada';

/** Vuelve arriba al cambiar de página y respeta los anclas (#quien-soy, #contacto). */
const Desplazamiento = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();

      return;
    }

    if (!pathname.includes('/foto/')) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export const App = () => (
  <>
    <Desplazamiento />
    <Metadatos />
    <Routes>
      <Route path='/' element={<Portafolio />} />
      <Route path='/proyectos/:slug' element={<Proyecto />} />
      <Route path='/proyectos/:slug/foto/:n' element={<FotoAmpliada />} />
      <Route path='/servicios' element={<Servicios />} />
      <Route path='/cotizar' element={<Cotizar />} />
      <Route path='/cotizar/enviada' element={<SolicitudEnviada />} />
      <Route path='*' element={<NoEncontrada />} />
    </Routes>
  </>
);
