import { MdSlideshow } from 'react-icons/lib/md';

export default {
  title: 'Feature Slider',
  name: 'featureSlider',
  type: 'object',
  icon: MdSlideshow,
  fields: [
    {
      title: 'Slides Visible',
      name: 'slidesVisible',
      type: 'number'
    },
    {
      title: 'Features',
      name: 'features',
      type: 'array',
      of: [
        {
          title: 'Feature',
          name: 'feature',
          type: 'feature'
        }
      ]
    },
    {
      title: 'No Margin',
      name: 'noMargin',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      slides: 'features'
    },
    prepare(selection) {
      const { slides } = selection;
      return Object.assign({}, selection, {
        title: 'Feature Sliders',
        subtitle: `Slide count: ${slides.length}`
      });
    }
  }
};
