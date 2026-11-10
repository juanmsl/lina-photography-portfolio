import { useLayoutEffect } from 'react';
import { createBrowserRouter, Outlet, useLocation } from 'react-router';

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
  // Layout effect: the scroll happens before the page transition captures the new view.
  useLayoutEffect(() => {
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();

      return;
    }

    if (!pathname.includes('/foto/')) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

/** Shell shared by every page. */
const AppLayout = () => (
  <>
    <ScrollManager />
    <PageMeta />
    <Outlet />
  </>
);

/*
 * Data router: required for `viewTransition` on Link and navigate, which
 * animates the change between pages (see ::view-transition in index.css).
 */
export const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        { path: '/', element: <PortfolioPage /> },
        { path: '/proyectos/:slug', element: <ProjectPage /> },
        { path: '/proyectos/:slug/foto/:n', element: <PhotoViewerPage /> },
        { path: '/servicios', element: <ServicesPage /> },
        { path: '/cotizar', element: <QuotePage /> },
        { path: '/cotizar/enviada', element: <QuoteSentPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
