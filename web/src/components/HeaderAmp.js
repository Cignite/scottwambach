import React, { useContext } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { SiteContext } from './Layout';
import Wrapper from '../styles/utilities/Wrapper';
import { InnerHeader } from './Header';
import { colors } from '../styles/utilities/settings';

const HeaderAmp = () => {
  const { mainLogo, siteTitle } = useContext(SiteContext);

  return (
    <SHeaderAmp>
      <Wrapper>
        <InnerHeader>
          <Link to="/" className="logo">
            <img src={mainLogo.src} alt={siteTitle} />
          </Link>
        </InnerHeader>
      </Wrapper>
    </SHeaderAmp>
  );
};

export default HeaderAmp;

export const SHeaderAmp = styled.header`
  padding: 15px 0;
  box-shadow: 0 0 20px -10px ${colors.black};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background-color: ${colors.white};
`;
