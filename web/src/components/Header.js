import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import RichText from './contentBlocks/RichText';
import { SiteContext } from './Layout';
import Wrapper from '../styles/utilities/Wrapper';
import {
  colors,
  misc,
  spacing,
  breakpoints,
} from '../styles/utilities/settings';
import Menu from './modules/Menu';
import { above, below } from '../styles/utilities/mediaQueries';
import Form from '../styles/modules/Form';
import { Input, Submit } from '../styles/modules/Inputs';
import SvgLoader from './helpers/SvgLoader';

const Header = () => {
  const {
    transparentHeader,
    headerScroll,
    setHeaderScroll,
    menuOpen,
    setMenuOpen,
    alertBar,
    mainLogo,
    siteTitle,
    siteDescription,
  } = useContext(SiteContext);

  const [searchToggle, setSearchToggle] = useState(false);

  const handleScroll = () => {
    if (global.window.scrollY > global.window.innerHeight / 4) {
      setHeaderScroll(true);
    } else {
      setHeaderScroll(false);
    }
  };

  useEffect(() => {
    global.window.addEventListener('scroll', e => {
      handleScroll(e);
    });
    return () => {
      global.window.removeEventListener('scroll', e => {
        handleScroll(e);
      });
    };
  }, []);

  return (
    <SHeader
      transparent={transparentHeader && !headerScroll}
      search={searchToggle}
      menuOpen={menuOpen}
      alert={alertBar}
    >
      {alertBar && (
        <AlertBar>
          <RichText content={{ copy: alertBar }} />
        </AlertBar>
      )}
      <Wrapper>
        <InnerHeader
          transparent={transparentHeader && !headerScroll}
          menuOpen={menuOpen}
        >
          <Link to="/" className="logo">
            <img src={mainLogo.src} alt={siteTitle} />
            <p>{siteDescription}</p>
          </Link>
          <MenuToggle
            href={null}
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            close={menuOpen}
          >
            <span />
            <span />
            <span />
          </MenuToggle>
          <MainMenu transparent={transparentHeader && !headerScroll}>
            <Menu menuTitle="Main Menu" />
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                global.document.getElementById('searchInput').focus();
                setSearchToggle(!searchToggle);
              }}
            >
              <SvgLoader name="search" width={16} color={colors.blue} />
            </a>
            <div className="search">
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  if (typeof window !== 'undefined') {
                    global.window.location.href = '/search';
                  }
                }}
                className="singleSubmit"
              >
                <Input
                  type="search"
                  id="searchInput"
                  placeholder="What are you looking for?"
                  onChange={e => {
                    if (typeof window !== 'undefined') {
                      global.localStorage.setItem('searchTerm', e.target.value);
                    }
                  }}
                />
                <Submit type="submit" value="Search" />
                <CloseSearch
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    setSearchToggle(false);
                  }}
                >
                  <span />
                  <span />
                </CloseSearch>
              </Form>
            </div>
            <TopBarMenu alert={alertBar}>
              <Wrapper>
                <Menu menuTitle="Top Menu" />
              </Wrapper>
            </TopBarMenu>
          </MainMenu>
        </InnerHeader>
      </Wrapper>
    </SHeader>
  );
};

export default Header;

// Close Search

const CloseSearch = styled.a`
  cursor: pointer;
  height: 30px;
  width: 30px;
  display: block;
  position: absolute;
  top: 0;
  right: -30px;
  background-color: ${colors.blackOverlay};

  span {
    display: block;
    height: 2px;
    width: 24px;
    background-color: ${colors.white};
    margin: 0 auto;
    transform: rotate(45deg);
    position: relative;
    top: 14px;

    + span {
      transform: rotate(-45deg);
      top: 12px;
    }
  }
`;

// Menu Toggle Styles
export const MenuToggle = styled.a`
  cursor: pointer;
  position: relative;
  z-index: 3;
  padding: 7px 0;
  height: 30px;
  width: 30px;
  transition-duration: ${misc.animSpeed};
  transform: rotate(${({ close }) => (close ? '0deg' : '180deg')});

  span {
    width: 24px;
    margin: 0 auto;
    height: 2px;
    display: block;
    background-color: ${colors.text};
    transition-duration: ${misc.animSpeed};
    position: relative;

    + span {
      margin-top: 6px;
    }

    &:nth-child(1) {
      transform: rotate(${({ close }) => (close ? '45deg' : '0deg')});
      top: ${({ close }) => (close ? '7px' : '0px')};
    }

    &:nth-child(2) {
      transform: scale(${({ close }) => (close ? '0' : '1')});
    }

    &:nth-child(3) {
      transform: rotate(${({ close }) => (close ? '-45deg' : '0deg')});
      bottom: ${({ close }) => (close ? '9px' : '0px')};
    }
  }

  @media screen and (min-width: ${breakpoints.ipadPort}px) {
    display: none;
  }
`;

// Alert Bar Styles
export const AlertBar = styled.div`
  background-color: ${colors.red};
  color: ${colors.white};
  text-align: center;
  padding: 5px 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  font-size: 12px;
  min-height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Top Bar Menu Styles
export const TopBarMenu = styled.div`
  padding: ${({ alert }) => (alert ? '30px 0 5px' : '5px 0')};

  @media screen and (min-width: ${breakpoints.ipadPort}px) {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }

  ${Wrapper} {
    @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
      padding: 0;
    }
  }

  li {
    a {
      text-decoration: underline;
      font-size: 12px;
    }
  }
`;

// Main Menu Styles
export const MainMenu = styled.nav`
  @media screen and (min-width: ${breakpoints.ipadPort}px) {
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
    position: fixed;
    top: 0;
    background-color: ${colors.white};
    width: 80vw;
    height: 100vh;
    transition-duration: ${misc.animSpeed};
    padding-top: ${spacing.headerMobile};
    z-index: 1;
    display: flex;
    flex-direction: column;
  }

  ${Form} {
    position: relative;
  }

  > a {
    padding-left: 10px;

    @media screen and (min-width: ${breakpoints.ipadPort}px) {
      cursor: pointer;
    }

    @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
      display: none;
    }

    &:hover {
      svg {
        path {
          @media screen and (min-width: ${breakpoints.ipadPort}px) {
            fill: ${colors.orange} !important;
          }
        }
      }
    }

    svg {
      path {
        ${({ transparent }) =>
          transparent && `fill: ${colors.white} !important;`}
      }
    }
  }

  ul {
    ${above.ipadPort`
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    `}

    > li {
      ${above.ipadPort`
        text-align: center;
      `}

      ${below.ipadPort`
        text-align: right;

        + li {
          border-top: 1px solid ${colors.black};
        }
      `}

      &.hasSub {
        position: relative;

        > a:first-of-type {
          @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
            padding-right: 70px;
          }
        }

        &.open {
          ul {
            @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
              display: block;
            }
          }
        }

        &:hover,
        &.open {
          ul {
            ${above.ipadPort`
              position: absolute;
              top: 100%;
              display: block;
              width: 200px;
            `}
          }
        }
      }

      ul {
        display: none;

        ${above.ipadPort`
          background-color: ${colors.white};
          ${({ transparent }) =>
            transparent
              ? ''
              : `box-shadow: 0 10px 10px -15px ${colors.black};`};
        `}

        li {
          text-align: left;

          ${below.ipadPort`
            text-align: right;
            border-top: 1px solid ${colors.gray};
          `}
        }

        a {
          color: ${({ transparent }) =>
            transparent ? colors.text : colors.blue};
        }
      }

      > a {
        display: block;
        @media screen and (min-width: ${breakpoints.ipadPort}px) {
          ${({ transparent }) => transparent && `color: ${colors.white};`}
          padding: 10px;
        }

        ${below.ipadPort`
          padding: 15px 20px;
        `}
      }
    }
  }

  ${TopBarMenu} {
    ul {
      display: flex;
      justify-content: flex-end;
    }

    li {
      margin-left: 20px;
      border-top: 0;
    }
  }

  .subToggle {
    ${above.ipadPort`
      display: none;
    `}

    ${below.ipadPort`
      border-left: 1px solid ${colors.black};
      position: absolute;
      right: 0;
      top: 0;
      height: 46px;
      width: 46px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
    `}
  }
`;

// Inner Container Styles
export const InnerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${below.ipadPort`
    ${MainMenu} {
      right: ${({ menuOpen }) => (menuOpen ? '0' : '-80vw')};
    }
  `}

  .logo {
    display: block;
    position: relative;
    z-index: 3;
    transition-duration: ${misc.animSpeed};
    ${({ transparent }) => transparent && `color: ${colors.white};`}
    ${below.ipadPort`
      left: ${({ menuOpen }) => (menuOpen ? '20vw' : '0')};
    `}
    img {
      height: 41px;
      width: auto;
      margin-right: 20px;

      ~ p {
        margin-top: 5px;
        font-size: 12px;
        ${below.ipadPort`
          display: none;
        `}
      }
    }
  }

  ${MenuToggle} {
    path {
      ${({ transparent, menuOpen }) =>
        transparent && !menuOpen && `fill: ${colors.white} !important;`}
    }
  }
`;

// Header Styles
export const SHeader = styled.header`
  padding: ${({ alert }) => (alert ? '45px 0 20px' : '30px 0 20px')};
  ${({ transparent }) =>
    transparent ? '' : `box-shadow: 0 0 20px -10px ${colors.black};`};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  transition-duration: ${misc.animSpeed};
  background-color: ${({ transparent }) =>
    transparent ? colors.transparent : colors.white};

  ${below.ipadPort`
    padding: ${({ alert }) => (alert ? '0 0 20px' : '20px 0')};
  `}

  &:before {
    ${below.ipadPort`
      content: '';
      display: block;
      background-color: ${colors.black};
      position: fixed;
      height: 100vh;
      width: 100vh;
      z-index: -1;
      transition-duration: ${misc.animSpeed};
      opacity: ${({ menuOpen }) => (menuOpen ? '0.7' : '0')};
      top: 0;
      left: 0;
      pointer-events: ${({ menuOpen }) => (menuOpen ? 'all' : 'none')};
    `}
  }

  a {
    color: ${colors.blue};
    &:hover {
      color: ${colors.orange};
    }
  }

  ${Wrapper} {
    max-width: none;
  }

  ${MainMenu} {
    ${below.ipadPort`
      ${({ alert }) =>
        alert ? 'height: calc(100vh - 26px); margin-top: 26px;' : ''}
    `}
  }

  .search {
    @media screen and (min-width: ${breakpoints.ipadPort}px) {
      top: 100%;
      z-index: 999;
      left: 0;
      overflow: hidden;
      position: absolute;
      opacity: ${({ search }) => (search ? '1' : '0')};
      pointer-events: ${({ search }) => (search ? 'all' : 'none')};
      transition-duration: ${misc.animSpeed};
      width: 100%;
    }

    @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
      border-top: 1px solid ${colors.gray};
      border-bottom: 1px solid ${colors.gray};
    }

    ${Form} {
      padding: 20px;

      @media screen and (min-width: ${breakpoints.ipadPort}px) {
        max-width: ${breakpoints.pageWidth - 60}px;
        background-color: ${colors.blackOverlay};
        margin: 30px auto 0;
      }
    }
  }
`;
