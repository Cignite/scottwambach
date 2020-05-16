import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import Wrapper from '../../styles/utilities/Wrapper';
import BackgroundImage, { SBackgroundImage } from '../helpers/BackgroundImage';

const CurratedContent = ({ content }) => {
  const { posts, pages, products } = useStaticQuery(graphql`
    {
      products: allSanityProduct {
        edges {
          node {
            _id
            title
            slug {
              current
            }
            _rawMainImage
            title
          }
        }
      }
      pages: allSanityPage {
        edges {
          node {
            _id
            title
            slug {
              current
            }
            _rawMainImage
            title
          }
        }
      }
      posts: allSanityPost {
        edges {
          node {
            _id
            title
            slug {
              current
            }
            _rawMainImage
            title
          }
        }
      }
    }
  `);
  return (
    <SCurratedContent>
      <Wrapper>
        <div>
          {content.posts.map(({ _ref }, index) =>
            [...posts.edges, ...pages.edges, ...products.edges].map(
              ({ node: { _id, title, _rawMainImage, slug } }) =>
                _id === _ref && (
                  <Link key={_id + index} to={slug.current}>
                    <div className="inner">
                      <BackgroundImage src={_rawMainImage} alt={title} />
                      <h4>{title}</h4>
                    </div>
                  </Link>
                )
            )
          )}
        </div>
      </Wrapper>
    </SCurratedContent>
  );
};

export default CurratedContent;

const SCurratedContent = styled.div`
  ${Wrapper} {
    > div {
      display: flex;
      justify-content: center;
      margin-right: -30px;

      a {
        width: 33.333%;
        padding-right: 30px;
        text-decoration: none;
      }

      h4 {
        margin: 0;
      }
    }
  }

  ${SBackgroundImage} {
    height: 200px;
  }

  h3 {
    text-align: center;
  }
`;
