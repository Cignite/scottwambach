import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import ImageLoader from '../helpers/ImageLoader';
import Wrapper from '../../styles/utilities/Wrapper';

export default function ImageBlock({ content }) {
  return (
    <VisibilitySensor partialVisibility>
      {({ isVisible }) => (
        <>
          {content.contained ? (
            <Wrapper
              style={{
                maxWidth: content.width || null,
              }}
            >
              <ImageLoader
                width={content.width || null}
                src={content.image}
                visible={isVisible}
              />
            </Wrapper>
          ) : (
            <ImageLoader src={content.image} visible={isVisible} />
          )}
        </>
      )}
    </VisibilitySensor>
  );
}
