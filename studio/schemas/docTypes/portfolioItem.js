import { MdWork } from 'react-icons/lib/md';
import slugify from '../../../web/src/js/slugify';

export default {
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  icon: MdWork,
  fields: [
    {
      name: 'title',
      title: 'Title',
      validation: Rule => Rule.required(),
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => `/work/${slugify(input)}`,
      },
    },
    {
      title: 'Highlighted Pages',
      name: 'highlightedPages',
      validation: Rule => Rule.required(),
      type: 'array',
      of: [
        {
          name: 'pageUrl',
          title: 'Page URL',
          type: 'url',
          validation: Rule =>
            Rule.uri({
              scheme: ['http', 'https'],
            }),
        },
      ],
    },
    {
      title: 'Body',
      name: 'body',
      validation: Rule => Rule.required(),
      type: 'blockContent',
    },
    {
      title: 'Meta Description',
      name: 'metaDescription',
      type: 'text',
      description: 'Keep it short and sweet!',
      rows: 3,
      validation: Rule => Rule.max(150).required(),
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      slug: 'slug.current',
    },
    prepare(selection) {
      const { title, slug } = selection;
      return Object.assign({}, selection, {
        title,
        subtitle: `${slug}`,
      });
    },
  },
};
