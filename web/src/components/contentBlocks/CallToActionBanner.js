import React from 'react';
import styled from 'styled-components';
import { misc, colors } from '../../styles/utilities/settings';
import Wrapper from '../../styles/utilities/Wrapper';
import { whiteOutlineButton } from '../../styles/utilities/elements';
import HeadingContent from '../modules/HeadingContent';

const CallToActionBanner = ({ content, content: { backgroundColor } }) => (
  <SCallToActionBanner
    style={{
      backgroundColor: backgroundColor ? backgroundColor.colors : colors.blue,
      color: colors.white,
      textAlign: 'center',
    }}
  >
    <Wrapper narrow>
      <HeadingContent content={content} />
    </Wrapper>
  </SCallToActionBanner>
);

export default CallToActionBanner;

const SCallToActionBanner = styled.div`
  padding: ${misc.sectionMargin}px 0;

  > a {
    ${whiteOutlineButton};
  }
`;
