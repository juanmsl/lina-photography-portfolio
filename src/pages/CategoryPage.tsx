import { Typography } from 'polpo/components';
import { useParams } from 'react-router';

import { ChipLink } from '../components/ChipLink';
import { ContactSection, Footer } from '../components/ContactSection';
import { DualTitle } from '../components/DualTitle';
import { FactSheet } from '../components/FactSheet';
import { Navigation } from '../components/Navigation';
import { NeighborLink } from '../components/NeighborLink';
import { ProjectBlock } from '../components/ProjectBlock';
import {
  activeCategories,
  categoryPath,
  categoryPhotoCount,
  categoryProjects,
  findCategory,
  neighborCategories,
} from '../content/projects';

import { NotFoundPage } from './NotFoundPage';

/** A category: its heading, links to the other categories and all its projects. */
export const CategoryPage = () => {
  const { slug } = useParams();
  const c = findCategory(slug);

  if (!c) return <NotFoundPage />;

  const list = categoryProjects(c);
  const { previous, next } = neighborCategories(c);
  const others = activeCategories();

  return (
    <>
      <Navigation />

      <section aria-labelledby='category-title' className='px-5 pt-10 pb-6 md:px-10 md:pt-20 md:pb-10'>
        {others.length > 1 && (
          <nav aria-label='Categorías' className='mb-20 md:mb-30'>
            <ul className='m-0 flex list-none flex-wrap justify-center gap-2 p-0'>
              {others.map(o => (
                <li key={o.id}>
                  <ChipLink to={categoryPath(o)} active={o === c}>
                    {o.label}
                  </ChipLink>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <DualTitle id='category-title' as='h1' title={c.title} voice={c.voice} className='mt-8 md:mt-10' />

        <div className='mx-auto mt-8 max-w-[50rem] md:mt-10'>
          {c.intro && (
            <Typography noPadding align='center' className='mx-auto mb-8 max-w-[40rem] t-lead text-ash md:mb-10'>
              {c.intro}
            </Typography>
          )}
          <FactSheet
            columns={3}
            data={[
              { label: list.length === 1 ? 'Proyecto' : 'Proyectos', value: String(list.length) },
              { label: 'Fotos', value: String(categoryPhotoCount(c)) },
              { label: 'Series', value: list.map(p => p.title).join(', ') },
            ]}
          />
        </div>
      </section>

      {list.map(p => (
        <ProjectBlock key={p.slug} p={p} headingAs='h2' />
      ))}

      {others.length > 1 && (
        <nav
          aria-label='Otras categorías'
          className='flex items-start justify-between gap-6 border-t border-graphite px-5 pt-10 pb-16 md:px-10 md:pt-20 md:pb-30'
        >
          <NeighborLink
            to={categoryPath(previous)}
            direction='previous'
            text={previous.voice}
            srText={previous.title}
          />
          {next !== previous && (
            <NeighborLink to={categoryPath(next)} direction='next' text={next.voice} srText={next.title} />
          )}
        </nav>
      )}

      <ContactSection />
      <Footer />
    </>
  );
};
