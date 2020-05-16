import React, { useState, useEffect, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { misc, breakpoints } from '../../styles/utilities/settings';
import imageUrlFor, { buildImageObj } from '../../js/imageUrlFor';
import { SiteContext } from '../Layout';

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: breakpoints.ipadLand });
  return isDesktop ? children : null;
};
export const TabletLarge = ({ children }) => {
  const isTablet = useMediaQuery({
    minWidth: breakpoints.ipadPort,
    maxWidth: breakpoints.ipadLand,
  });
  return isTablet ? children : null;
};
export const TabletSmall = ({ children }) => {
  const isTablet = useMediaQuery({
    minWidth: breakpoints.mobile,
    maxWidth: breakpoints.ipadPort,
  });
  return isTablet ? children : null;
};
export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  return isMobile ? children : null;
};

export const ResponseImage = ({
  src,
  classes,
  width,
  alt,
  quality,
  height,
}) => (
  <>
    {height ? (
      <img
        loading="lazy"
        className={classes}
        src={imageUrlFor(buildImageObj(src))
          .width(width)
          .height(height)
          .quality(quality)
          .auto('format')}
        alt={alt || null}
      />
    ) : (
      <img
        loading="lazy"
        className={classes}
        src={imageUrlFor(buildImageObj(src))
          .width(width)
          .quality(quality)
          .auto('format')}
        alt={alt || null}
      />
    )}
  </>
);

export const newRatio = (
  crop,
  originalDimensions,
  customHeight,
  customeWidth
) => {
  const heightPercentRemoved = crop ? crop.top + crop.bottom : 0;
  const widthPercentRemoved = crop ? crop.left + crop.right : 0;
  const customRatio = (customHeight / customeWidth) * 100;
  const newHeight =
    originalDimensions.height -
    originalDimensions.height * heightPercentRemoved;
  const newWidth =
    originalDimensions.width - originalDimensions.width * widthPercentRemoved;
  const aspectRatio = (newHeight / newWidth) * 100;
  return customRatio || aspectRatio;
};

const ImageLoader = ({ src, height, width, alt, visible }) => {
  const value = useContext(SiteContext);
  const [loaded, setLoaded] = useState(false);

  const imageCheck = imageUrl => {
    const srcImage = imageUrl;
    const fullImage = global.document.createElement('img');

    fullImage.setAttribute('src', srcImage);

    if (fullImage.complete) {
      setLoaded(true);
    } else {
      fullImage.onload = () => {
        setLoaded(true);
      };
    }
  };

  useEffect(() => {
    let imageWidth = breakpoints.pageWidth;

    if (
      global.window.innerWidth >= breakpoints.ipadPort &&
      global.window.innerWidth <= breakpoints.ipadLand
    ) {
      imageWidth = breakpoints.ipadLand;
    } else if (
      global.window.innerWidth >= breakpoints.mobile &&
      global.window.innerWidth <= breakpoints.ipadPort
    ) {
      imageWidth = breakpoints.ipadPort;
    } else if (global.window.innerWidth <= breakpoints.mobile) {
      imageWidth = breakpoints.mobile;
    }

    if (height) {
      imageCheck(
        imageUrlFor(buildImageObj(src))
          .height(height)
          .width(width || imageWidth)
          .quality(90)
          .auto('format')
      );
    } else {
      imageCheck(
        imageUrlFor(buildImageObj(src))
          .width(width || imageWidth)
          .quality(90)
          .auto('format')
      );
    }
  }, []);

  return (
    <SImageLoader
      style={{
        display: 'block',
        height: 0,
        overflow: 'hidden',
        paddingBottom: `${
          value.allImages[
            value.allImages.findIndex(img => img.id === src.asset._ref)
          ]
            ? newRatio(
                src.crop,
                value.allImages[
                  value.allImages.findIndex(img => img.id === src.asset._ref)
                ].metadata.dimensions,
                height,
                width
              )
            : ''
        }%`,
      }}
    >
      {value.allImages[
        value.allImages.findIndex(img => img.id === src.asset._ref)
      ] && (
        <img
          loading="lazy"
          className={`placeholder ${loaded && visible ? 'ready' : 'loading'}`}
          src={
            value.allImages[
              value.allImages.findIndex(img => img.id === src.asset._ref)
            ].metadata.lqip
          }
          alt={
            alt ||
            value.allImages[
              value.allImages.findIndex(img => img.id === src.asset._ref)
            ].description ||
            value.allImages[
              value.allImages.findIndex(img => img.id === src.asset._ref)
            ].id
          }
        />
      )}
      {loaded && visible && (
        <>
          <Desktop>
            <ResponseImage
              classes={`image-loaded ${
                loaded && visible ? 'ready' : 'loading'
              }`}
              src={src}
              height={height || null}
              width={width || breakpoints.pageWidth}
              alt={
                alt ||
                value.allImages[
                  value.allImages.findIndex(img => img.id === src.asset._ref)
                ].description ||
                value.allImages[
                  value.allImages.findIndex(img => img.id === src.asset._ref)
                ].id
              }
              quality={90}
            />
          </Desktop>
          <TabletLarge>
            <ResponseImage
              classes={`image-loaded ${
                loaded && visible ? 'ready' : 'loading'
              }`}
              src={src}
              height={height || null}
              width={width || breakpoints.ipadLand}
              alt={
                alt ||
                value.allImages[
                  value.allImages.findIndex(img => img.id === src.asset._ref)
                ].description ||
                value.allImages[
                  value.allImages.findIndex(img => img.id === src.asset._ref)
                ].id
              }
              quality={90}
            />
          </TabletLarge>
          <TabletSmall>
            <ResponseImage
              classes={`image-loaded ${
                loaded && visible ? 'ready' : 'loading'
              }`}
              src={src}
              height={height || null}
              width={width || breakpoints.ipadPort}
              alt={
                alt ||
                value.allImages[
                  value.allImages.findIndex(img => img.id === src.asset._ref)
                ].description ||
                value.allImages[
                  value.allImages.findIndex(img => img.id === src.asset._ref)
                ].id
              }
              quality={90}
            />
          </TabletSmall>
          <Mobile>
            <ResponseImage
              classes={`image-loaded ${
                loaded && visible ? 'ready' : 'loading'
              }`}
              src={src}
              height={height || null}
              width={width || breakpoints.mobile}
              alt={
                alt ||
                value.allImages[
                  value.allImages.findIndex(img => img.id === src.asset._ref)
                ].description ||
                value.allImages[
                  value.allImages.findIndex(img => img.id === src.asset._ref)
                ].id
              }
              quality={90}
            />
          </Mobile>
        </>
      )}
    </SImageLoader>
  );
};

export default ImageLoader;

export const SImageLoader = styled.picture`
  position: relative;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    transition-duration: ${misc.animSpeed};

    &.placeholder {
      z-index: 2;
      pointer-events: none;
      position: absolute !important;
      top: 50%;
      left: 50%;
      width: auto;
      height: auto;
      max-height: none;
      max-width: none;
      min-height: 101%;
      min-width: 101%;
      transform: translate(-50%, -50%);
      opacity: 1;

      &.ready {
        opacity: 0;
      }
    }

    &.image-loaded {
      z-index: 1;
      opacity: 0;
      transition-delay: ${misc.animSpeed};

      &.ready {
        opacity: 1;
      }
    }
  }
`;
