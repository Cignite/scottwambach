import React from 'react';
import moment from 'moment';
import Layout from '../components/Layout';
import { misc } from '../styles/utilities/settings';
import Article from '../components/modules/Article';
import Wrapper from '../styles/utilities/Wrapper';
import Pagination from '../components/modules/Pagination';

const Archive = ({
  pageContext,
  pageContext: { title, pathPrefix, group },
}) => (
  <Layout title={title} path={pathPrefix}>
    <div
      style={{
        textAlign: 'center',
        margin: `${misc.sectionMargin / 2}px 0`,
      }}
    >
      <h1>{title}</h1>
    </div>
    <Wrapper>
      {group.map(post => (
        <Article
          key={post._id}
          content={{
            title: post.title,
            slug: post.slug.current,
            image: post.mainImage,
            user: post.user,
            excerpt: post.metaDescription,
            date: moment(post.publishedAt).format('MMMM Do YYYY'),
          }}
        />
      ))}
      <Pagination pageContext={pageContext} />
    </Wrapper>
  </Layout>
);

export default Archive;
