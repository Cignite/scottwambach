import { MdLibraryBooks } from 'react-icons/lib/md';
import slugify from '../../../web/src/js/slugify';

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: MdLibraryBooks,
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
        slugify: input => `/${slugify(input)}`,
      },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true,
      },
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
      rows: 3,
      description: 'Keep it short and sweet!',
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
