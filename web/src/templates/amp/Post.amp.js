import React from 'react';
import { graphql } from 'gatsby';
import PortableText from '@sanity/block-content-to-react';
import imageUrlFor, { buildImageObj } from '../../js/imageUrlFor';
import Layout from '../../components/Layout';

const PostAmp = ({
  data: {
    site: {
      siteMetadata: { sanityId, dataset },
    },
    page: { _rawMainImage, title, _rawBody, publishedAt, user },
  },
}) => {
  const serializers = {
    types: {
      image: ({ node }) => (
        <amp-img
          src={imageUrlFor(buildImageObj(node))
            .width(800)
            .height(300)
            .quality(90)
            .auto('format')}
          width={800}
          height={300}
          alt="..."
          layout="responsive"
        />
      ),
    },
    marks: {
      internalLink: ({ mark, children }) => (
        <a href={mark} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
      link: ({ mark, children }) => {
        const { blank, href } = mark;
        return blank ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ) : (
          <a href={href}>{children}</a>
        );
      },
    },
  };

  return (
    <Layout amp>
      <amp-img
        src={imageUrlFor(buildImageObj(_rawMainImage))
          .width(800)
          .height(300)
          .quality(90)
          .auto('format')}
        width={800}
        height={300}
        alt={title}
        layout="responsive"
        style={{
          margin: 0,
        }}
      />
      <div style={{ padding: '30px' }}>
        <h1>{title}</h1>
        <p>{`${publishedAt} by ${user.name}`}</p>
        <PortableText
          blocks={_rawBody}
          projectId={sanityId}
          serializers={serializers}
          dataset={dataset}
        />
      </div>
    </Layout>
  );
};

export default PostAmp;

export const query = graphql`
  query PostAmpQuery($id: String!) {
    site {
      siteMetadata {
        sanityId
        dataset
      }
    }
    page: sanityPost(_id: { eq: $id }) {
      title
      slug {
        current
      }
      user {
        name
      }
      publishedAt(formatString: "LL")
      _rawMainImage
      _rawBody
      metaTitle
      metaDescription
    }
  }
`;
