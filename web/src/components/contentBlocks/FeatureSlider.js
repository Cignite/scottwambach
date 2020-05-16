import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';
import Wrapper from '../../styles/utilities/Wrapper';
import PageLink from '../helpers/PageLink';
import { colors, breakpoints } from '../../styles/utilities/settings';
import { slickStyles } from '../../styles/utilities/elements';
import SvgLoader from '../helpers/SvgLoader';

const FeatureSlider = ({ content: { slidesVisible, features } }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: slidesVisible,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: breakpoints.ipadLand,
        settings: {
          slidesToShow: 2.25,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: breakpoints.ipadPort,
        settings: {
          slidesToShow: 1.25,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: breakpoints.mobile,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <SFeatureSlider>
      <Wrapper narrow>
        <Slider {...settings}>
          {features.map(({ _key, copy, heading, icon, link }) => (
            <Feature key={_key}>
              <SvgLoader name={icon.icon} width={30} color={colors.blue} />
              <h4>{heading}</h4>
              <p>{copy}</p>
              {link && link.copy && <PageLink content={link} />}
            </Feature>
          ))}
        </Slider>
      </Wrapper>
    </SFeatureSlider>
  );
};

export default FeatureSlider;

const SFeatureSlider = styled.div`
  ${slickStyles};
`;

const Feature = styled.div`
  padding-right: 30px;
`;
