import React from 'react';
import styled from 'styled-components';
import ProductCard, { SProductCard } from './ProductCard';
import { misc } from '../../styles/utilities/settings';

const RelatedProducts = ({ content, current }) =>
  content.length > 1 && (
    <SRelatedProducts>
      <h2>You may also like:</h2>
      <div>
        {content.map(
          (item, index) =>
            !item._rawParentProduct &&
            index < 4 &&
            current !== item._id && (
              <ProductCard content={item} key={item._id + index} />
            )
        )}
      </div>
    </SRelatedProducts>
  );

export default RelatedProducts;

export const SRelatedProducts = styled.div`
  margin: ${misc.sectionMobileMargin}px 0;

  h2 {
    text-align: center;
  }

  > div {
    display: flex;
    justify-content: center;
  }

  ${SProductCard} {
    width: 33.3333%;
    max-width: 500px;

    + ${SProductCard} {
      margin-left: 30px;
    }
  }
`;
