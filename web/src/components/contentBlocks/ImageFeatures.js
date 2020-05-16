import React, { useState } from 'react';
import styled from 'styled-components';
import PageLink from '../helpers/PageLink';
import { breakpoints, colors } from '../../styles/utilities/settings';
import { button, absoluteCenter } from '../../styles/utilities/elements';
import { above, below } from '../../styles/utilities/mediaQueries';
import Wrapper from '../../styles/utilities/Wrapper';
import BackgroundImage, { SBackgroundImage } from '../helpers/BackgroundImage';
import SvgLoader from '../helpers/SvgLoader';
import YouTubeVideo from '../helpers/YouTubeVideo';
import RichText from './RichText';

// Single Feature Component
const SingleFeature = ({
  flip,
  content: { video, image, heading, copy, link },
}) => {
  const [toggleVideo, setToggleVideo] = useState(false);
  return (
    <SFeature
      flip={flip}
      className={
        video && !toggleVideo ? 'video' : `${video && toggleVideo && 'active'}`
      }
    >
      <div className="image">
        {video ? (
          <>
            {toggleVideo ? (
              <YouTubeVideo title={heading} videoId={video} />
            ) : (
              <>
                <a
                  href={null}
                  onClick={() => {
                    setToggleVideo(true);
                  }}
                >
                  <SvgLoader name="play" color={colors.white} />
                </a>
                <BackgroundImage
                  src={image}
                  maxWidth={breakpoints.pageWidth / 2}
                  alt={heading}
                />
              </>
            )}
          </>
        ) : (
          <BackgroundImage
            src={image}
            maxWidth={breakpoints.pageWidth / 2}
            alt={heading}
          />
        )}
      </div>
      <div className="content">
        <h3>{heading}</h3>
        {copy && <RichText content={{ copy }} noWrapper />}
        {link && link.copy && (
          <PageLink
            style={{
              marginTop: '20px',
            }}
            content={link}
          />
        )}
      </div>
    </SFeature>
  );
};

// Single Feature Styles
export const SFeature = styled.div`
  background-color: ${colors.yellowOrange};
  position: relative;

  ${above.ipadPort`
    display: flex;
    align-items: stretch;
    flex-direction: ${({ flip }) => (flip ? 'row-reverse' : 'row')};
  `}

  &:nth-child(2n) {
    flex-direction: ${({ flip }) => (flip ? 'row' : 'row-reverse')};

    .content {
      svg {
        @media screen and (min-width: ${breakpoints.ipadPort}px) {
          left: 30px;
        }
      }
    }
  }

  &:nth-child(2n - 1) {
    .content {
      svg {
        @media screen and (min-width: ${breakpoints.ipadPort}px) {
          right: 30px;
        }
      }
    }
  }

  &.video {
    .image {
      cursor: pointer;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: ${colors.blackOverlay};
        z-index: 2;
        display: block;
      }

      a {
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }

  &.active {
    align-items: center;
    .image {
      overflow: hidden;
    }
  }

  > div {
    ${above.ipadPort`
      width: 50%;
    `}
  }

  .image {
    position: relative;

    ${below.ipadPort`
      padding-bottom: 60%;
    `}

    ${SBackgroundImage} {
      height: 100%;
      width: 100%;
      @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    svg {
      ${absoluteCenter};
      z-index: 3;
      opacity: 0.39;
    }
  }

  .content {
    max-width: ${breakpoints.pageWidth / 2}px;
    padding: 50px 30px;

    ${below.ipadPort`
      padding: 50px 15px;
    `}

    > a {
      ${button};
    }
  }
`;

//* **************** *///
//* **************** *///

// Feature List Component
const ImageFeatures = ({ content: { features, contained, flipImageSide } }) => (
  <div>
    <Wrapper full={!contained}>
      {features.map(feature => (
        <SingleFeature
          key={feature._key}
          content={feature}
          flip={flipImageSide}
        />
      ))}
    </Wrapper>
  </div>
);

export default ImageFeatures;
