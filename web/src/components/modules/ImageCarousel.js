import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import VisibilitySensor from 'react-visibility-sensor';
import ImageLoader, { SImageLoader } from '../helpers/ImageLoader';
import SvgLoader from '../helpers/SvgLoader';
import { colors } from '../../styles/utilities/settings';

const ImageCarousel = ({ content, slug, width }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <VisibilitySensor partialVisibility>
      {({ isVisible }) => (
        <SImageCarousel single={content.length === 1}>
          {content.length > 1 && (
            <Controls>
              <a
                disabled={activeIndex === 0}
                href={null}
                className="prev"
                onClick={() => {
                  setActiveIndex(activeIndex - 1);
                }}
              >
                <SvgLoader
                  name="angleArrow"
                  width="15px"
                  color={colors.white}
                />
              </a>
              <a
                disabled={activeIndex === content.length - 1}
                href={null}
                className="next"
                onClick={() => {
                  setActiveIndex(activeIndex + 1);
                }}
              >
                <SvgLoader
                  name="angleArrow"
                  width="15px"
                  color={colors.white}
                />
              </a>
            </Controls>
          )}
          <Link to={slug}>
            <ImageLoader
              height={width}
              width={width}
              src={content[activeIndex]}
              visible={isVisible}
            />
          </Link>
        </SImageCarousel>
      )}
    </VisibilitySensor>
  );
};

export default ImageCarousel;

export const SImageCarousel = styled.div`
  position: relative;

  > a {
    width: 100%;
  }

  ${SImageLoader} {
    user-select: none;
    margin-top: 10px;
    width: 100%;
  }
`;

const Controls = styled.div`
  a {
    position: absolute;
    top: 50%;
    z-index: 4;
    display: inline-block;
    height: 20px;
    width: 20px;
    padding: 5px;
    box-sizing: content-box;
    background: ${colors.blackOverlay};
    border-radius: 100%;
    text-align: center;
    cursor: pointer;

    &[disabled] {
      opacity: 0.3;
      pointer-events: none;
    }

    svg {
      left: 1px;
    }
  }

  .prev {
    transform: translateY(-50%) rotate(180deg);
    left: 0px;
  }

  .next {
    transform: translateY(-50%);
    right: 0px;
  }

  svg {
    height: 100%;
    position: relative;
  }
`;
