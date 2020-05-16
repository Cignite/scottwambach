import React from 'react';
import styled from 'styled-components';
import { richTextContent, button } from '../../styles/utilities/elements';
import RichText from '../contentBlocks/RichText';
import LinksContainer, { SLinksContainer } from './LinksContainer';
import { colors } from '../../styles/utilities/settings';

const HeadingContent = ({
  hero,
  centered,
  content: { heading, links, copy, user, date },
}) => (
  <HeadingContainer centered={centered}>
    {hero ? <h1>{heading}</h1> : <h2>{heading}</h2>}
    {user && <p>{`by ${user}`}</p>}
    {date && <p>{`published on ${date}`}</p>}
    {copy && <RichText content={{ copy, centered: true }} />}
    {links && <LinksContainer content={links} />}
  </HeadingContainer>
);

export default HeadingContent;

export const HeadingContainer = styled.div`
  position: relative;
  z-index: 1;
  ${richTextContent};
  ${({ centered }) => centered && 'text-align: center;'}

  ${SLinksContainer} {
    a {
      color: ${colors.white};
      margin-top: 20px;
      ${button};
    }
  }
`;
