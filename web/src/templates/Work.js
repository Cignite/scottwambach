import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import RichText from '../components/RichText';
import imageUrlFor, { buildImageObj } from '../js/imageUrlFor';

const Work = ({
  data: {
    work: { title, body, slug, description, highlightedPages },
  },
}) => (
  <Layout
    path={slug.current}
    title={title}
    description={description}
    pageImage={
      highlightedPages
        ? imageUrlFor(buildImageObj(highlightedPages[0]))
            .width(600)
            .quality(90)
            .url()
        : null
    }
  >
    <h1>{title}</h1>
    <RichText content={{ copy: body }} />
  </Layout>
);

export default Work;

export const query = graphql`
  query PostQuery($id: String!) {
    work: sanityPortfolioItem(_id: { eq: $id }) {
      title
      highlightedPages: _rawHighlightedPages
      description: metaDescription
      body: _rawBody
      slug: _rawSlug
    }
  }
`;
