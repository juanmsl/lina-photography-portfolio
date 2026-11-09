import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';

import { PageMeta } from './components/PageMeta';
import { NotFoundPage } from './pages/NotFoundPage';
import { PhotoViewerPage } from './pages/PhotoViewerPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProjectPage } from './pages/ProjectPage';
import { QuotePage } from './pages/QuotePage';
import { QuoteSentPage } from './pages/QuoteSentPage';
import { ServicesPage } from './pages/ServicesPage';

/** Scrolls to the top on page change and honors anchors (#quien-soy, #contacto). */
const ScrollManager = () => {
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
    <ScrollManager />
    <PageMeta />
    <Routes>
      <Route path='/' element={<PortfolioPage />} />
      <Route path='/proyectos/:slug' element={<ProjectPage />} />
      <Route path='/proyectos/:slug/foto/:n' element={<PhotoViewerPage />} />
      <Route path='/servicios' element={<ServicesPage />} />
      <Route path='/cotizar' element={<QuotePage />} />
      <Route path='/cotizar/enviada' element={<QuoteSentPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  </>
);
