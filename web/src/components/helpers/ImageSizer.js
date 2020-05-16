import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import ImageLoader from './ImageLoader';

const ImageSizer = ({ src, height, width, alt }) => (
  <VisibilitySensor partialVisibility>
    {({ isVisible }) => (
      <>
        {height ? (
          <ImageLoader
            src={src}
            width={width}
            height={height}
            alt={alt}
            quality={90}
            visible={isVisible}
          />
        ) : (
          <ImageLoader
            src={src}
            width={width}
            alt={alt}
            quality={100}
            visible={isVisible}
          />
        )}
      </>
    )}
  </VisibilitySensor>
);

export default ImageSizer;
