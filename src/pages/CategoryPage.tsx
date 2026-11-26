import { useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router';

import { Navigation } from '../components/Navigation';
import { ProjectReel } from '../components/ProjectReel';
import { categoryProjects, findCategory, type Category } from '../content/projects';

import { NotFoundPage } from './NotFoundPage';

/**
 * The reel of a category. The selected project is kept in the address (?p=slug), so coming back from a project
 * lands on it, and the link can be shared.
 */
const CategoryReel = ({ c }: { c: Category }) => {
  const list = categoryProjects(c);
  const [params] = useSearchParams();
  const initial = Math.max(
    0,
    list.findIndex(p => p.slug === params.get('p')),
  );

  const remember = useCallback((slug: string) => {
    const url = new URL(window.location.href);

    if (url.searchParams.get('p') === slug) return;

    url.searchParams.set('p', slug);
    // Not through the router: a step of the reel is not a page change. The history entry keeps its state.
    window.history.replaceState(window.history.state, '', url);
  }, []);

  return <ProjectReel category={c} list={list} initial={initial} onSelect={remember} />;
};

/** A category: all its projects as a vertical reel; the selected one opens its page. */
export const CategoryPage = () => {
  const { slug } = useParams();
  const c = findCategory(slug);

  if (!c) return <NotFoundPage />;

  return (
    <>
      <Navigation />

      <main>
        {c.intro && <p className='sr-only'>{c.intro}</p>}
        {/* Remounted per category, so each one starts at its first project (or the one in the address). */}
        <CategoryReel key={c.id} c={c} />
      </main>
    </>
  );
};
