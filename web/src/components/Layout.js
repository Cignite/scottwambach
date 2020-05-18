import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { setConfig } from 'react-hot-loader';
import styled from 'styled-components';
import GlobalStyle from '../styles/Global';
import Header from './Header';
import Footer from './Footer';
import { colors, breakpoints } from '../styles/utilities/settings';
import Dochead from './Dochead';
import Wrapper from '../styles/utilities/Wrapper';
import { SInstaFeed } from './InstaFeed';
import { SPortfolioList } from './PortfolioList';

setConfig({
  showReactDomPatchNotification: false,
});
export const SiteContext = React.createContext();

const Layout = ({
  transparentHeader,
  amp,
  children,
  title,
  description,
  path,
  pageImage,
}) => {
  const {
    menus,
    allImages,
    siteMeta,
    site,
    site: {
      _rawAlertBar,
      mainLogo: {
        asset: { fluid },
      },
    },
  } = useStaticQuery(graphql`
    {
      site: sanitySiteSettings {
        title
        description
        _rawAlertBar
        mainLogo {
          asset {
            fluid(maxWidth: 150, toFormat: PNG) {
              src
              sizes
              aspectRatio
              srcSet
              base64
            }
          }
        }
      }
      siteMeta: site {
        siteMetadata {
          sanityId
          dataset
        }
      }
      menus: allSanityMenu {
        edges {
          node {
            title
            items {
              _key
              link {
                url
                newTab
                copy
              }
              subItems {
                _key
                copy
                newTab
                url
              }
            }
          }
        }
      }
      allImages: allSanityImageAsset {
        nodes {
          url
          id
          description
          fluid {
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
          metadata {
            lqip
            dimensions {
              height
              width
            }
          }
        }
      }
    }
  `);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SiteContext.Provider
      value={{
        siteTitle: site.title,
        siteDescription: site.description,
        alertBar: _rawAlertBar,
        mainLogo: fluid,
        menus: menus.edges,
        allImages: allImages.nodes,
        siteMeta,
        menuOpen,
        setMenuOpen,
      }}
    >
      <Dochead
        title={title}
        description={description || site.description}
        path={path}
        siteName={site.title}
        pageImage={pageImage || null}
        amp={amp}
      />
      <GlobalStyle open={menuOpen} transparentHeader={transparentHeader} />
      <SLayout
        className={_rawAlertBar ? 'alert' : null}
        style={{
          paddingTop: amp && '73px',
        }}
      >
        <a
          style={{
            position: 'fixed',
            zIndex: '-9999',
            padding: '20px',
            background: colors.black,
            color: colors.white,
            border: `3px solid ${colors.white}`,
          }}
          className="skip-link"
          href="#bodyContent"
        >
          Skip to body.
        </a>
        <Wrapper>
          <Header />
          <div id="bodyContent" className="body-content">
            {children}
          </div>
        </Wrapper>
        <Footer />
      </SLayout>
    </SiteContext.Provider>
  );
};

export default Layout;

const SLayout = styled.main`
  > ${Wrapper} {
    padding-top: 50px;

    @media screen and (min-width: ${breakpoints.ipadPort}px) {
      display: flex;
      align-items: flex-start;
    }
  }

  .skip-link {
    opacity: 0;

    &:focus {
      opacity: 1;
    }
  }

  .content {
    display: flex;
    justify-content: space-between;

    ${SPortfolioList} {
      width: calc(100% - 260px);
    }

    ${SInstaFeed} {
      width: 250px;
    }
  }
`;
