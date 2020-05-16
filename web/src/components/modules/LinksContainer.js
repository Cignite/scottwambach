import React from 'react';

import styled from 'styled-components';
import PageLink from '../helpers/PageLink';
import { button } from '../../styles/utilities/elements';
import { breakpoints } from '../../styles/utilities/settings';

const LinksContainer = ({ content }) => (
  <SLinksContainer multi={content.length > 1}>
    {content.map(link => (
      <PageLink key={link._key} content={link} />
    ))}
  </SLinksContainer>
);

export default LinksContainer;

export const SLinksContainer = styled.div`
  @media screen and (min-width: ${breakpoints.ipadPort}px) {
    display: flex;
    justify-content: center;
  }

  a {
    ${button};

    ${({ multi }) =>
      multi &&
      `
      @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
        width: 100%;
        margin-top: 10px;
      }
    `}

    + a {
      @media screen and (min-width: ${breakpoints.ipadPort}px) {
        margin-left: 20px;
      }
    }
  }
`;
