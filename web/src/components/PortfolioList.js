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
          <div>
            <h5>{item.title}</h5>
            <p>{item.slug.current}</p>
          </div>
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
    padding: 15px 0;
    align-items: center;
    color: ${colors.text};
    text-decoration: none;
    position: relative;
    transition-duration: ${misc.animSpeed};
    transform: perspective(0) translateY(0) scale(1) rotateX(0deg) rotateY(0deg)
      rotateZ(0deg);
    z-index: 1;

    &:before {
      content: '';
      transition-duration: ${misc.animSpeed};
      pointer-events: none;
      background-color: ${colors.white};
      width: 102%;
      height: 102%;
      position: absolute;
      top: -1%;
      left: -1%;
      z-index: -1;
    }

    &:hover {
      color: ${colors.white};
      transform: perspective(1000px) translateY(-5px) scale(1.02) rotateX(-5deg)
        rotateY(0deg) rotateZ(0deg);

      &:before {
        background-color: ${colors.text};
        box-shadow: 0 -22px 30px -30px ${colors.black};
      }
    }

    div {
      &:nth-child(1) {
        width: 100%;
        margin: 0;
        padding-left: 15px;
      }

      &:nth-child(2) {
        width: 100px;
        border: 1px solid ${colors.gray};
      }
    }
  }

  h5,
  p {
    margin: 0;
  }
`;
