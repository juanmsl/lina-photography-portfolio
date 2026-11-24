import { Typography } from 'polpo/components';

import { projectPhotos, type Project } from '../content/projects';

import { FactSheet } from './FactSheet';
import { Gallery } from './Gallery';
import { ProjectHeading } from './ProjectHeading';

type ProjectBlockProps = {
  p: Project;
  /** h3 under a category divider (portfolio), h2 on the category page. */
  headingAs?: 'h2' | 'h3';
};

/** A project in a list: heading linking to its page, summary, fact sheet and preview rows. */
export const ProjectBlock = ({ p, headingAs = 'h3' }: ProjectBlockProps) => {
  const order = projectPhotos(p);

  return (
    <article aria-labelledby={`project-${p.slug}`} className='px-5 pt-12 pb-20 md:px-10 md:pt-20 md:pb-30'>
      <div id={`project-${p.slug}`}>
        <ProjectHeading title={p.title} subtitle={p.subtitle} a={`/proyectos/${p.slug}`} as={headingAs} />
      </div>
      <div className='mx-auto mt-8 max-w-[40rem] md:mt-10'>
        <Typography noPadding align='center' className='t-lead text-ash'>
          {p.summary}
        </Typography>
        <FactSheet data={p.facts} className='mt-8 md:mt-10' />
      </div>
      <Gallery
        rows={p.preview}
        cyanotype={p.cyanotype}
        project={p.cyanotype ? undefined : { slug: p.slug, photoIndex: id => order.indexOf(id) }}
        className='mt-8 md:mt-16'
      />
    </article>
  );
};
