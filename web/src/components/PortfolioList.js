import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import ImageSizer from './helpers/ImageSizer';
import { colors, misc } from '../styles/utilities/settings';

const PortfolioList = () => {
  const {
    portfolio: { items },
  } = useStaticQuery(graphql`
    {
      portfolio: allSanityPortfolioItem(sort: { order: ASC, fields: title }) {
        items: nodes {
          _id
          title
          slug {
            current
          }
          highlightedPages: _rawHighlightedPages
        }
      }
    }
  `);
  return (
    <SPortfolioList>
      {items.map(item => (
        <Link to={item.slug.current} key={item._id}>
          <h3>{item.title}</h3>
          <div>
            <ImageSizer
              src={item.highlightedPages[0]}
              width={250}
              height={150}
              alt={item.title}
            />
          </div>
        </Link>
      ))}
    </SPortfolioList>
  );
};

export default PortfolioList;

const SPortfolioList = styled.div`
  a {
    display: flex;
    flex-direction: row-reverse;
    padding: 30px 10px;
    align-items: center;
    color: ${colors.text};
    text-decoration: none;
    transition-duration: ${misc.animSpeed};
    background-color: ${colors.white};

    + a {
      border-top: 1px solid ${colors.gray};
    }

    &:hover {
      color: ${colors.text};
      box-shadow: 0 0 50px -30px ${colors.black};
      border-color: ${colors.white};
    }

    > div {
      width: 200px;
      border: 1px solid ${colors.gray};
    }
  }

  h3 {
    width: 100%;
    margin: 0;
    padding-left: 30px;
  }
`;
