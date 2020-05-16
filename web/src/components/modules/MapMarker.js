import React from 'react';
import IcomoonReact from 'icomoon-react/dist/IcomoonReact';
import styled from 'styled-components';
import iconSet from '../../fonts/selection.json';
import { colors, misc } from '../../styles/utilities/settings';
import BackgroundImage, { SBackgroundImage } from '../helpers/BackgroundImage';

const MapMarker = ({ content }) => (
  <SMapMarker>
    <IcomoonReact
      iconSet={iconSet}
      color={colors.blue}
      size={30}
      icon="map-marker"
    />
    <div className="pop-up">
      <BackgroundImage src={content._rawMainImage} alt={content.title} />
      <p>{content.title}</p>
    </div>
  </SMapMarker>
);

export default MapMarker;

const SMapMarker = styled.div`
  color: ${colors.orange};
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  &:hover {
    .pop-up {
      opacity: 1;
    }
  }
  .pop-up {
    transition-duration: ${misc.animSpeed};
    opacity: 0;
    position: absolute;
    bottom: 100%;
    background-color: ${colors.white};
    left: 50%;
    transform: translateX(-50%);
    width: 80px;

    ${SBackgroundImage} {
      height: 40px;
    }
  }
`;
