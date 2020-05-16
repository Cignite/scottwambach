import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import imageUrlFor, { buildImageObj } from '../js/imageUrlFor';
import { SHeroBanner } from '../components/contentBlocks/HeroBanner';
import BackgroundImage from '../components/helpers/BackgroundImage';
import HeadingContent from '../components/modules/HeadingContent';
import RichText from '../components/contentBlocks/RichText';
import CategoryBreadcrumbs from '../components/modules/CategoryBreadcrumbs';

export const PostContent = ({
  content: { _rawMainImage, title, _rawBody, publishedAt, user, categories },
}) => (
  <>
    <section>
      <BackgroundImage src={_rawMainImage}>
        <SHeroBanner>
          <HeadingContent
            hero
            content={{
              heading: title,
              user: user.name,
              date: publishedAt,
            }}
          />
        </SHeroBanner>
      </BackgroundImage>
    </section>
    {categories && categories.length !== 0 && (
      <CategoryBreadcrumbs content={categories} />
    )}
    <section>
      <RichText
        content={{
          copy: _rawBody,
        }}
      />
    </section>
  </>
);

const Post = ({ data: { page } }) => (
  <Layout
    path={page.slug.current}
    title={page.metaTitle || page.title}
    description={page.metaDescription}
    pageImage={
      page._rawMainImage
        ? imageUrlFor(buildImageObj(page._rawMainImage))
            .width(600)
            .quality(90)
            .url()
        : null
    }
  >
    <PostContent content={page} />
  </Layout>
);

export default Post;

export const query = graphql`
  query PostQuery($id: String!) {
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
      categories {
        _id
        title
        slug {
          current
        }
      }
      metaTitle
      metaDescription
    }
  }
`;
