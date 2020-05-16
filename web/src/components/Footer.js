import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Wrapper from '../styles/utilities/Wrapper';
import SocialList from './modules/SocialList';

import { colors, misc } from '../styles/utilities/settings';

const date = new Date();
const currentYear = date.getFullYear();

const Footer = () => {
  const {
    footer: { copyright },
  } = useStaticQuery(graphql`
    {
      footer: sanitySiteSettings {
        copyright
      }
    }
  `);
  return (
    <SFooter>
      <Wrapper>
        <div className="copy">
          <p
            dangerouslySetInnerHTML={{
              __html: copyright.replace('[date]', currentYear),
            }}
          />
        </div>
        <SocialList />
      </Wrapper>
    </SFooter>
  );
};

export default Footer;

const SFooter = styled.footer`
  background-color: ${colors.gray};
  padding: 50px 0;

  ${Wrapper} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  svg {
    transition-duration: ${misc.animSpeed};
  }

  a {
    display: inline-block;

    &:hover {
      svg {
        fill: ${colors.blue};
      }
    }
  }
`;
