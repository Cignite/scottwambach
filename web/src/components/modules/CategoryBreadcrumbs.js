import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Wrapper from '../../styles/utilities/Wrapper';
import { colors, font } from '../../styles/utilities/settings';

const CategoryBreadcrumbs = ({ content }) => (
  <CategoryList>
    <Wrapper narrow>
      <ul>
        <strong>CATEGORIES:</strong>
        {content.map((category, index) => (
          <li key={category._id}>
            {index !== 0 && ' / '}
            <Link to={category.slug.current}>{category.title}</Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  </CategoryList>
);

export default CategoryBreadcrumbs;

export const CategoryList = styled.div`
  margin-bottom: 20px;
  text-transform: uppercase;

  ul {
    margin-left: 0;
    display: flex;
    /* align-items: center; */
  }

  strong {
    margin-right: 20px;
  }

  li {
    list-style: none;
    vertical-align: middle;

    + li {
      margin-left: 10px;
    }
  }

  a {
    color: ${colors.text};
    font-family: ${font.primary};
    text-decoration: none;
    font-size: 12px;
    letter-spacing: 1px;
  }
`;
