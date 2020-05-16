import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import HeadingContent from '../modules/HeadingContent';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';
import Wrapper from '../../styles/utilities/Wrapper';
import BackgroundImage from '../helpers/BackgroundImage';
import { SHeroBanner } from './HeroBanner';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  adaptiveHeight: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  pauseOnHover: true,
  autoplay: true,
  arrow: false,
};

const Carousel = ({ content: { slides } }) => (
  <SCarousel>
    <Slider {...settings}>
      {slides.map(slide => (
        <BackgroundImage
          key={slide._key}
          src={slide.image}
          alt={slide.headingContent.heading}
        >
          <SHeroBanner>
            <Wrapper narrow>
              <HeadingContent hero content={slide.headingContent} />
            </Wrapper>
          </SHeroBanner>
        </BackgroundImage>
      ))}
    </Slider>
  </SCarousel>
);

export default Carousel;

const SCarousel = styled.div`
  .slick-arrow {
    display: none !important;
  }
`;
