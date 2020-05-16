import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Wrapper from '../../styles/utilities/Wrapper';
import { misc } from '../../styles/utilities/settings';

const Pagination = ({ pageContext }) =>
  pageContext.pageCount !== 1 && (
    <SPagination>
      <Wrapper>
        {Array(pageContext.pageCount)
          .fill()
          .map((elm, index) => (
            <span key={index}>
              {index + 1 === pageContext.index ? (
                index + 1
              ) : (
                <Link
                  to={`/${pageContext.pathPrefix}${
                    index + 1 === 1 ? '' : `/${index + 1}`
                  }`}
                >
                  {index + 1}
                </Link>
              )}
            </span>
          ))}
      </Wrapper>
    </SPagination>
  );

export default Pagination;

export const SPagination = styled.div`
  ${Wrapper} {
    display: flex;
    justify-content: center;
    font-size: 22px;
    margin: ${misc.sectionMargin / 2}px 0;
  }

  span {
    display: block;

    + span {
      margin-left: 20px;
    }
  }
`;
