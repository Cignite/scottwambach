import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import Wrapper from '../../styles/utilities/Wrapper';
import Video from '../helpers/Video';
import HeadingContent from '../modules/HeadingContent';
import { colors, misc, spacing } from '../../styles/utilities/settings';
import { imageBG, absoluteCenter } from '../../styles/utilities/elements';
import BackgroundImage from '../helpers/BackgroundImage';
import { SiteContext } from '../Layout';

const HeroBanner = ({ mainImage, content, content: { headingContent } }) => {
  const [started, setStarted] = useState(false);
  const { transparentHeader } = useContext(SiteContext);

  return (
    <BackgroundImage src={mainImage} alt={headingContent.heading}>
      <SHeroBanner
        fullscreen={content.fullScreen}
        transparentHeader={transparentHeader}
      >
        {content.videoUrl && (
          <ReactPlayer
            url={content.videoUrl}
            loop
            playing
            value={0}
            muted
            controls={false}
            className={`videoBg${started ? ' active' : ''}`}
            height="100%"
            width="100%"
            onStart={() => {
              setStarted(true);
            }}
          />
        )}
        {content.video && <Video src={content.video} />}
        <Wrapper narrow>
          <HeadingContent hero content={headingContent} />
        </Wrapper>
      </SHeroBanner>
    </BackgroundImage>
  );
};

export default HeroBanner;

export const SHeroBanner = styled.div`
  text-align: center;
  padding: 100px 0;
  color: ${colors.white};
  ${imageBG};
  ${({ fullscreen }) =>
    fullscreen &&
    `
    display: flex;
    align-items: center;
  `};

  height: ${({ fullscreen, transparentHeader }) =>
    fullscreen && transparentHeader
      ? '100vh'
      : fullscreen && !transparentHeader
      ? `calc(100vh - ${spacing.headerHeight})`
      : 'auto'};

  .videoBg {
    position: absolute;
    padding-bottom: 56.25%;
    padding-top: 25px;
    height: 0 !important;
    z-index: 0;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    opacity: 0;
    transition-duration: ${misc.animSpeed};

    &.active {
      opacity: 1;
    }

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100% !important;
      height: 100% !important;
    }
  }

  &:before {
    content: '';
    background-color: ${colors.black};
    opacity: 0.3;
    width: 100%;
    height: 100%;
    ${absoluteCenter};
    z-index: 1;
  }
`;
