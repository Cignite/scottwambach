import React from 'react';
import styled from 'styled-components';
import VisibilitySensor from 'react-visibility-sensor';
import { imageBG } from '../../styles/utilities/elements';
import ImageLoader from './ImageLoader';

const BackgroundImage = ({ alt, children, className, src }) => (
  <VisibilitySensor partialVisibility>
    {({ isVisible }) => (
      <SBackgroundImage className={className}>
        <ImageLoader src={src} alt={alt} visible={isVisible} />
        {children}
      </SBackgroundImage>
    )}
  </VisibilitySensor>
);

export default BackgroundImage;

export const SBackgroundImage = styled.div`
  ${imageBG};
`;
