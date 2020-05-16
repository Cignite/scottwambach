import React from 'react';

import styled from 'styled-components';
import { Link } from 'gatsby';
import BackgroundImage, { SBackgroundImage } from '../helpers/BackgroundImage';
import { above, below } from '../../styles/utilities/mediaQueries';
import { breakpoints } from '../../styles/utilities/settings';

const Article = ({ content }) => (
  <SArticle>
    <div className="inner">
      <BackgroundImage
        maxWidth={breakpoints.pageWidth / 2}
        src={content.image}
        alt={content.title}
      />
      <div className="copy">
        <h3>{content.title}</h3>
        {content.user && content.date && (
          <p>{`by ${content.user.name} on ${content.date}`}</p>
        )}
        {content.excerpt && <p>{`${content.excerpt.substring(0, 100)}...`}</p>}
        <Link to={content.slug}>Read More...</Link>
      </div>
    </div>
  </SArticle>
);

export default Article;

const SArticle = styled.div`
  + div {
    margin-top: 30px;
  }

  .inner {
    ${above.ipadPort`
      display: flex;
    `}

    > div {
      ${above.ipadPort`
        width: 50%;
      `}
    }

    ${SBackgroundImage} {
      ${below.ipadPort`
        padding-bottom: 56%;
      `}
    }

    .copy {
      padding: 50px 30px;
      ${below.ipadPort`
        padding: 30px 0;
      `}
    }
  }
`;
