import React from 'react';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';

import styled from 'styled-components';
import { colors, misc } from '../styles/utilities/settings';

const InstaFeed = () => {
  const {
    instagram: { images },
  } = useStaticQuery(graphql`
    {
      instagram: allInstaNode(
        sort: { fields: timestamp, order: DESC }
        limit: 6
      ) {
        images: nodes {
          id
          localFile {
            childImageSharp {
              fluid(maxWidth: 150, maxHeight: 150) {
                src
                base64
                presentationHeight
                presentationWidth
                sizes
                srcSet
                srcSetWebp
                srcWebp
                aspectRatio
              }
            }
          }
        }
      }
    }
  `);
  return (
    <SInstaFeed>
      {images.map(image => (
        <a
          key={image.id}
          target="_blank"
          rel="noreferrer"
          href={`https://www.instagram.com/p/${image.id}`}
        >
          <Img fluid={image.localFile.childImageSharp.fluid} />
        </a>
      ))}
    </SInstaFeed>
  );
};

export default InstaFeed;

export const SInstaFeed = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  a {
    display: block;
    width: 50%;
    height: 0;
    padding-bottom: 50%;
    overflow: hidden;
    transition-duration: ${misc.animSpeed};
    border-bottom: 10px solid ${colors.white};
    border-left: 10px solid ${colors.white};
    filter: blur(0) grayscale(0);

    &:hover {
      filter: blur(2px) grayscale(1);

      .gatsby-image-wrapper {
        transform: scale(1.1);
      }
    }
  }

  .gatsby-image-wrapper {
    transition-duration: ${misc.animSpeed};
    transform: scale(1);
  }

  img {
    margin: 0 auto;
  }
`;
