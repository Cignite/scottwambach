import React, { useContext } from 'react';
import styled from 'styled-components';
import ImageLoader from '../helpers/ImageLoader';
import { CarouselContext } from './ImageCarousel';
import { colors } from '../../styles/utilities/settings';

const CarouselThumbs = ({ thumbs }) => {
  const { setActiveIndex } = useContext(CarouselContext);

  return (
    <SCarouselThumbs>
      {thumbs.map((thumb, index) => (
        <a
          key={Math.random()}
          href={null}
          onClick={() => {
            setActiveIndex(index);
          }}
        >
          <ImageLoader
            src={thumb}
            width={100}
            height={100}
            alt={`thumb${index}`}
          />
        </a>
      ))}
    </SCarouselThumbs>
  );
};

export default CarouselThumbs;

export const SCarouselThumbs = styled.div`
  width: 100px;

  a {
    cursor: pointer;
    border: 1px solid ${colors.gray};
    display: inline-block;
    width: 100%;
    padding: 10px;

    + a {
      margin-top: 10px;
    }
  }

  img {
    width: 100%;
  }
`;
