import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import ImageSizer from '../components/helpers/ImageSizer';

import { SImageLoader } from '../components/helpers/ImageLoader';
import { colors } from '../styles/utilities/settings';
import PortfolioList from '../components/PortfolioList';
import InstaFeed from '../components/InstaFeed';

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
        <ImageSizer src={mainImage} alt="I Can See" height={400} width={800} />
      </FeaturedImage>
      <div className="content">
        <PortfolioList />
        <InstaFeed />
      </div>
    </Layout>
  );
};

export default IndexPage;

const FeaturedImage = styled.div`
  position: relative;

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
`;
