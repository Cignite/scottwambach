import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import TypeIt from 'typeit-react';
import Layout from '../components/Layout';
import ImageSizer from '../components/helpers/ImageSizer';

import { SImageLoader } from '../components/helpers/ImageLoader';
import { colors } from '../styles/utilities/settings';
import PortfolioList from '../components/PortfolioList';

const IndexPage = () => {
  const {
    sanitySiteSettings: { mainImage },
  } = useStaticQuery(graphql`
    {
      sanitySiteSettings {
        mainImage: _rawBannerImage
      }
    }
  `);
  return (
    <Layout>
      <FeaturedImage>
        <TypeIt
          getBeforeInit={instance => {
            instance
              .type("Hi, I'm Scott.")
              .pause(1200)
              .type("<br />I'm a frontend")
              .pause(500)
              .delete(8)
              .type('javascript')
              .pause(500)
              .delete(10)
              .type('wordpress')
              .pause(500)
              .delete(9)
              .type('full-stack')
              .pause(700)
              .type(' guy?')
              .pause(500)
              .delete(5)
              .type(' developer.')
              .pause(5000);

            // Remember to return it!
            return instance;
          }}
          element="h1"
          options={{
            speed: 120,
            html: true,
          }}
        />
        <ImageSizer src={mainImage} alt="I Can See" height={400} width={800} />
      </FeaturedImage>
      <div className="content">
        <PortfolioList />
      </div>
    </Layout>
  );
};

export default IndexPage;

const FeaturedImage = styled.div`
  position: relative;
  margin-bottom: 30px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${colors.yellow};
    z-index: 1;
    opacity: 0.3;
  }

  ${SImageLoader} {
    filter: grayscale(1);
  }

  h1 {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 3;
    transform: translateY(-50%);
    width: 100%;
    padding: 30px;
    color: ${colors.white};
    font-size: 45px;
    text-shadow: 2px 3px 0px ${colors.yellow};
  }
`;
