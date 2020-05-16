import React, { useState } from 'react';
import styled from 'styled-components';
import Wrapper from '../../styles/utilities/Wrapper';
import { above } from '../../styles/utilities/mediaQueries';
import { misc, breakpoints } from '../../styles/utilities/settings';
import { absoluteCenter } from '../../styles/utilities/elements';
import ImageSizer from '../helpers/ImageSizer';
import imageUrlFor, { buildImageObj } from '../../js/imageUrlFor';
import Loader from '../helpers/Loader';
import { SModal } from '../modules/Modal';

const ImgGal = ({ content }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);

  const modalClose = () => {
    global.document.addEventListener('click', e => {
      if (e.target.id === 'outter' || e.key === 'Escape') {
        setModalOpen(false);
      }
    });

    global.document.onkeydown = e => {
      if (e.keyCode === 27) {
        setModalOpen(false);
      }
    };
  };

  return (
    <Wrapper narrow>
      <SGallery>
        {content.gallery.map((image, index) => (
          <a
            key={`image${index}`}
            href={null}
            onClick={() => {
              setActiveIndex(index);
              setImageLoading(true);
              setModalOpen(true);
              modalClose();
            }}
          >
            <ImageSizer src={image} height={300} width={300} />
          </a>
        ))}
        {modalOpen && (
          <SModal loading={imageLoading} id="outter">
            {imageLoading && <Loader />}
            <a
              href={null}
              onClick={() => {
                setModalOpen(false);
              }}
              className="close"
            >
              <span />
              <span />
            </a>
            {activeIndex - 1 !== -1 && (
              <a
                href={null}
                onClick={() => {
                  setActiveIndex(activeIndex - 1);
                }}
                className="control previous"
              >
                <span />
                <span />
              </a>
            )}
            {activeIndex !== content.gallery.length - 1 && (
              <a
                href={null}
                onClick={() => {
                  setActiveIndex(activeIndex + 1);
                }}
                className="control next"
              >
                <span />
                <span />
              </a>
            )}
            <div className="inner">
              <div
                className={`image-container${imageLoading ? ' loading' : ''}`}
              >
                <img
                  onLoad={() => {
                    setImageLoading(false);
                  }}
                  alt="..."
                  src={imageUrlFor(buildImageObj(content.gallery[activeIndex]))
                    .quality(90)
                    .width(breakpoints.pageWidth)
                    .fit('crop')
                    .auto('format')
                    .url()}
                />
              </div>
            </div>
          </SModal>
        )}
      </SGallery>
    </Wrapper>
  );
};

export default ImgGal;

const SGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px ${misc.sectionMargin} 0;

  > a {
    padding: 0 20px 20px 0;
    width: 50%;
    cursor: pointer;

    ${above.ipadPort`
      width: 25%;
    `}

    > span {
      overflow: hidden;
      display: block;
      height: 162px;
      position: relative;

      img {
        height: 100%;
        width: 100%;
        ${absoluteCenter};
      }
    }
  }
`;
