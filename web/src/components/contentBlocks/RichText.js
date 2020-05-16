import React from 'react';
import PortableText from '@sanity/block-content-to-react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';
import VisibilitySensor from 'react-visibility-sensor';
import Wrapper from '../../styles/utilities/Wrapper';
import { absoluteCenter } from '../../styles/utilities/elements';
import SvgLoader from '../helpers/SvgLoader';
import ImageLoader from '../helpers/ImageLoader';

export default function RichText({ content, noWrapper }) {
  const {
    pages,
    posts,
    site: {
      siteMetadata: { sanityId, dataset },
    },
  } = useStaticQuery(graphql`
    {
      pages: allSanityPage {
        nodes {
          _id
          _rawSlug
        }
      }
      posts: allSanityPost {
        nodes {
          _id
          _rawSlug
        }
      }
      site {
        siteMetadata {
          sanityId
          dataset
        }
      }
    }
  `);

  const findMatch = mark => {
    const allContent = [];
    let slug = '';

    pages.nodes.map(page => allContent.push(page));
    posts.nodes.map(post => allContent.push(post));

    allContent.map(contentItem => {
      if (contentItem._id === mark.reference._ref) {
        slug = contentItem._rawSlug.current;
      }
    });
    return slug;
  };

  const serializers = {
    types: {
      image: ({ node }) => (
        <VisibilitySensor partialVisibility>
          {({ isVisible }) => <ImageLoader src={node} visible={isVisible} />}
        </VisibilitySensor>
      ),
    },
    marks: {
      internalLink: ({ mark, children }) => (
        <Link to={findMatch(mark)}>{children}</Link>
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
    <SRichText centered={content.centered}>
      <Wrapper
        narrower={content.narrow}
        narrow={!content.narrow}
        style={{
          padding: noWrapper && '0',
          maxWidth: noWrapper && 'none',
        }}
      >
        {content.iconSelector && (
          <SvgLoader
            name={content.iconSelector.icon}
            color={content.color.colors}
            width={500}
          />
        )}
        <PortableText
          blocks={content.copy}
          projectId={sanityId}
          serializers={serializers}
          dataset={dataset}
        />
      </Wrapper>
    </SRichText>
  );
}

const SRichText = styled.div`
  text-align: ${({ centered }) => (centered ? 'center' : 'left')};
  position: relative;

  svg {
    opacity: 0.1;
    max-width: 260px;
    width: 50%;
    ${absoluteCenter};
  }
`;
