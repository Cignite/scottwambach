import React from 'react';
import Layout from '../components/Layout';
import Pagination from '../components/modules/Pagination';
import Article from '../components/modules/Article';
import Wrapper from '../styles/utilities/Wrapper';
import { misc } from '../styles/utilities/settings';

const Page = ({ pageContext, pageContext: { group } }) => (
  <Layout title="Blog" path="blog">
    <>
      <div
        style={{
          textAlign: 'center',
          margin: `${misc.sectionMargin / 2}px 0`,
        }}
      >
        <h1>Blog</h1>
      </div>
      <Wrapper>
        {group.map(
          ({
            node: {
              _id,
              title,
              slug,
              _rawMainImage,
              user,
              publishedAt,
              metaDescription,
            },
          }) => (
            <Article
              key={_id}
              content={{
                title,
                slug: slug.current,
                image: _rawMainImage,
                user,
                excerpt: metaDescription,
                date: publishedAt,
              }}
            />
          )
        )}
        <Pagination pageContext={pageContext} />
      </Wrapper>
    </>
  </Layout>
);

export default Page;
