import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Wrapper from '../styles/utilities/Wrapper';
import Pagination, { SPagination } from '../components/modules/Pagination';
import ProductCard, { SProductCard } from '../components/modules/ProductCard';
import { misc } from '../styles/utilities/settings';

const Shop = ({ pageContext, pageContext: { group } }) => (
  <Layout title="Shop" path="shop" pageImage={null}>
    <div
      style={{
        textAlign: 'center',
        margin: `${misc.sectionMargin / 2}px 0`,
      }}
    >
      <h1>Shop</h1>
    </div>
    <Wrapper>
      <SShop>
        {group.map(
          (card, index) =>
            !card._rawParentProduct && (
              <ProductCard key={card._key + index} content={card} />
            )
        )}
        <Pagination pageContext={pageContext} />
      </SShop>
    </Wrapper>
  </Layout>
);

export default Shop;

export const SShop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;

  ${SProductCard} {
    width: 25%;
    margin-right: 30px;
  }

  ${SPagination} {
    width: 100%;
  }
`;
