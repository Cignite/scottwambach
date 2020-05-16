import { FaImage } from 'react-icons/lib/fa';

export default {
  title: 'Hero Banner',
  name: 'heroBanner',
  type: 'object',
  icon: FaImage,
  fields: [
    {
      name: 'fullScreen',
      title: 'Full Screen',
      type: 'boolean',
    },
    {
      title: 'Heading Content',
      name: 'headingContent',
      description: 'This component inhereits the main image of the page.',
      type: 'headingContent'
    },
    {
      title: 'Video URL',
      name: 'videoUrl',
      description: 'Choose either file or url for video.',
      type: 'url'
    },
    {
      title: 'Video File',
      name: 'video',
      description: 'Choose either file or url for video.',
      type: 'file'
    },
    {
      title: 'No Margin',
      name: 'noMargin',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      heading: 'headingContent.heading'
    },
    prepare(selection) {
      const { heading } = selection;
      return Object.assign({}, selection, {
        title: heading
      });
    }
  }
};
