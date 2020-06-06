import React, { useContext } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import RichText from './RichText';
import { SiteContext } from './Layout';
import Wrapper from '../styles/utilities/Wrapper';
import {
  colors,
  misc,
  spacing,
  breakpoints,
  font,
} from '../styles/utilities/settings';
import Menu from './modules/Menu';
import Form from '../styles/modules/Form';
import SvgLoader from './helpers/SvgLoader';

const Header = () => {
  const { menuOpen, setMenuOpen, alertBar } = useContext(SiteContext);

  return (
    <SHeader menuOpen={menuOpen} alert={alertBar}>
      {alertBar && (
        <AlertBar>
          <RichText content={{ copy: alertBar }} />
        </AlertBar>
      )}
      <InnerHeader menuOpen={menuOpen}>
        <Link to="/" className="logo">
          <SvgLoader name="logo" width={100} />
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
        <MainMenu>
          <Menu menuTitle="Main Menu" />
        </MainMenu>
      </InnerHeader>
    </SHeader>
  );
};

export default Header;

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

// Main Menu Styles
export const MainMenu = styled.nav`
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
  }

  ul {
    > li {
      text-align: right;

      @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
        + li {
          border-top: 1px solid ${colors.black};
        }
      }

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
            @media screen and (min-width: ${breakpoints.ipadPort}px) {
              position: absolute;
              top: 100%;
              display: block;
              width: 200px;
            }
          }
        }
      }

      ul {
        display: none;

        @media screen and (min-width: ${breakpoints.ipadPort}px) {
          background-color: ${colors.white};
        }

        li {
          text-align: left;

          @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
            text-align: right;
            border-top: 1px solid ${colors.gray};
          }
        }

        a {
          color: ${colors.text};
        }
      }

      > a {
        display: block;
        @media screen and (min-width: ${breakpoints.ipadPort}px) {
          padding: 10px;
        }

        @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
          padding: 15px 20px;
        }
      }
    }
  }

  .subToggle {
    @media screen and (min-width: ${breakpoints.ipadPort}px) {
      display: none;
    }

    @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
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
    }
  }
`;

// Inner Container Styles
export const InnerHeader = styled.div`
  @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${MainMenu} {
      right: ${({ menuOpen }) => (menuOpen ? '0' : '-80vw')};
    }
  }

  .logo {
    display: block;
    position: relative;
    z-index: 3;
    transition-duration: ${misc.animSpeed};

    @media screen and (min-width: ${breakpoints.ipadPort}px) {
      text-align: right;
    }

    @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
      left: ${({ menuOpen }) => (menuOpen ? '20vw' : '0')};
    }

    &:hover {
      background: none;
    }

    svg {
      max-width: 100px;
      margin-bottom: 20px;
    }
  }
`;

// Header Styles
export const SHeader = styled.header`
  width: 160px;
  z-index: 10;
  transition-duration: ${misc.animSpeed};
  background-color: ${colors.white};
  font-family: ${font.secondary};

  @media screen and (min-width: ${breakpoints.ipadPort}px) {
    position: sticky;
    top: 50px;
    border-right: 1px solid ${colors.text};
    padding-right: 30px;
    margin-right: 30px;
  }

  @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
    width: 100%;
  }

  &:before {
    @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
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
    }
  }

  a {
    color: ${colors.text};
    text-transform: uppercase;

    &:hover {
      @media screen and (min-width: ${breakpoints.ipadPort}px) {
        background-color: ${colors.text};
        color: ${colors.white};
      }
    }
  }

  ${Wrapper} {
    max-width: none;
  }

  ${MainMenu} {
    @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
      ${({ alert }) =>
        alert ? 'height: calc(100vh - 26px); margin-top: 26px;' : ''}
    }
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
