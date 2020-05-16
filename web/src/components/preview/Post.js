import React from 'react';
import moment from 'moment';
import Article from '../modules/Article';
import Wrapper from '../../styles/utilities/Wrapper';
import { PostContent } from '../../templates/Post';

const Post = ({ content, type, author }) =>
  type !== 'listing' ? (
    <PostContent
      content={{
        _rawMainImage: content.mainImage,
        title: content.title,
        _rawBody: content.body,
        publishedAt: content.publishedAt,
        user: content.user,
      }}
    />
  ) : (
    <Wrapper>
      <Article
        content={{
          title: content.title,
          slug: content.slug.current,
          image: content.mainImage,
          user: author && author,
          excerpt: content.metaDescription,
          date: moment(content.publishedAt).format('MMMM Do YYYY'),
        }}
      />
    </Wrapper>
  );

export default Post;
