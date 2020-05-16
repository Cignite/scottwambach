import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { setConfig } from 'react-hot-loader';
import Helmet from 'react-helmet';
import GlobalStyle from '../styles/Global';
import Header from './Header';
import Footer from './Footer';
import { colors } from '../styles/utilities/settings';
import Dochead from './Dochead';
import HeaderAmp from './HeaderAmp';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(false);
  const [headerScroll, setHeaderScroll] = useState(false);

  return (
    <SiteContext.Provider
      value={{
        siteTitle: site.title,
        siteDescription: site.description,
        alertBar: _rawAlertBar,
        mainLogo: fluid,
        menus: menus.edges,
        allImages: allImages.nodes,
        headerScroll,
        setHeaderScroll,
        transparentHeader,
        siteMeta,
        menuOpen,
        modalOpen,
        setMenuOpen,
        setModalOpen,
        searchTerm,
        setSearchTerm,
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
      {amp && (
        <Helmet
          script={[{ src: 'https://cdn.ampproject.org/v0.js', async: true }]}
          meta={[
            {
              name: 'viewport',
              content:
                'width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no',
            },
          ]}
        />
      )}
      <GlobalStyle
        open={modalOpen || menuOpen}
        transparentHeader={transparentHeader}
      />
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
      <main
        className={_rawAlertBar ? 'alert' : null}
        style={{
          paddingTop: amp && '73px',
        }}
      >
        {amp ? <HeaderAmp /> : <Header />}
        <div id="bodyContent" className="body-content">
          {children}
        </div>
        <Footer />
      </main>
    </SiteContext.Provider>
  );
};

export default Layout;
