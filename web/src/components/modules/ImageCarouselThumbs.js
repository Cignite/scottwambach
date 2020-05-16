import React, { useState } from 'react';
import styled from 'styled-components';
import ImageLoader, { SImageLoader } from '../helpers/ImageLoader';
import { colors, breakpoints, misc } from '../../styles/utilities/settings';
import imageUrlFor, { buildImageObj } from '../../js/imageUrlFor';
import ImageSizer from '../helpers/ImageSizer';

const ImageCarouselThumbs = ({ content, width, additionalImages }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SImageCarouselThumbs single={content.length === 1} width={width || 400}>
      {additionalImages.length > 1 && (
        <SCarouselThumbs>
          {content.map((thumb, index) => (
            <React.Fragment key={Math.random()}>
              <a
                href={null}
                onClick={() => {
                  setActiveIndex(index);
                }}
                onMouseEnter={() => {
                  setActiveIndex(index);
                }}
              >
                <img
                  src={imageUrlFor(buildImageObj(thumb))
                    .width(100)
                    .height(100)
                    .quality(90)
                    .auto('format')}
                  alt={`thumb${index}`}
                />
              </a>
            </React.Fragment>
          ))}
        </SCarouselThumbs>
      )}
      <MainFeature width={width} single={content.length === 1}>
        {additionalImages.length > 1 ? (
          <ImageSizer
            visible
            width={width}
            height={width}
            src={content[activeIndex]}
            alt={`product ${[activeIndex]}`}
          />
        ) : (
          <ImageLoader visible width={width} height={width} src={content[0]} />
        )}
      </MainFeature>
    </SImageCarouselThumbs>
  );
};

export default ImageCarouselThumbs;

const MainFeature = styled.div`
  max-width: 100%;
  width: ${({ width }) => width}px;
  ${({ single }) => !single && 'padding-left: 30px;'};

  @media screen and (min-width: ${breakpoints.ipadPort}px) {
    margin: 0 auto ${misc.sectionMobileMargin}px;
  }
`;

const SCarouselThumbs = styled.div`
  @media screen and (min-width: ${breakpoints.ipadPort}px) {
    width: 100px;
  }

  @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 30px;
  }

  a {
    cursor: pointer;
    border: 1px solid ${colors.gray};
    display: flex;
    align-items: center;
    width: 100px;
    height: 100px;
    padding: 10px;

    @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
      width: 70px;
      height: 70px;
      padding: 5px;
    }

    + a {
      @media screen and (min-width: ${breakpoints.ipadPort}px) {
        margin-top: 10px;
      }

      @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
        margin: 0 0 10px 10px;
      }
    }
  }

  img,
  picture {
    width: 100%;
  }
`;

export const SImageCarouselThumbs = styled.div`
  position: relative;
  width: 100%;
  display: flex;

  @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
    flex-direction: column-reverse;
  }

  ${SCarouselThumbs} {
    ${SImageLoader} {
      margin: 0;
    }
  }
`;
