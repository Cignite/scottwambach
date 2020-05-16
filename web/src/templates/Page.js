import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content from '../components/Content';
import imageUrlFor, { buildImageObj } from '../js/imageUrlFor';

const Page = ({
  data: {
    page: {
      title,
      slug: { current },
      _rawPageContent,
      _rawMainImage,
      transparentHeader,
      metaTitle,
      metaDescription,
    },
  },
}) => (
  <Layout
    title={metaTitle || title}
    description={metaDescription}
    path={current}
    transparentHeader={transparentHeader}
    pageImage={
      _rawMainImage
        ? imageUrlFor(buildImageObj(_rawMainImage))
            .width(600)
            .quality(90)
            .url()
        : null
    }
  >
    <Content mainImage={_rawMainImage} contentArray={_rawPageContent} />
  </Layout>
);

export default Page;

export const query = graphql`
  query PageQuery($id: String!) {
    page: sanityPage(_id: { eq: $id }) {
      title
      slug {
        current
      }
      _rawMainImage
      _rawPageContent
      transparentHeader
      metaTitle
      metaDescription
    }
  }
`;
