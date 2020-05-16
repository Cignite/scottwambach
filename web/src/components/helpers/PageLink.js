import React from 'react';
import { Link } from 'gatsby';

const PageLink = ({ content, style }) => (
  <>
    {(content.page || content.url) === '#' ? (
      <span style={style}>{content.copy}</span>
    ) : (
      <>
        {content.newTab ? (
          <a
            href={content.url}
            target="_blank"
            rel="noopener noreferrer"
            style={style}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: content.copy,
              }}
            />
          </a>
        ) : (
          <Link style={style} to={content.url}>
            <span
              dangerouslySetInnerHTML={{
                __html: content.copy,
              }}
            />
          </Link>
        )}
      </>
    )}
  </>
);

export default PageLink;
