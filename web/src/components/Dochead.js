import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { SiteContext } from './Layout';

const Dochead = ({
  title,
  siteName,
  description,
  pageImage,
  metaName,
  metaContent,
  path,
}) => {
  const {
    siteMeta: {
      siteMetadata: { siteUrl, environment },
    },
  } = useContext(SiteContext);

  return (
    <Helmet
      title={title ? `${title} | ${siteName}` : `${siteName}`}
      meta={[
        { name: 'description', content: description },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:title',
          content: title ? `${title} | ${siteName}` : `${siteName}`,
        },
        { property: 'og:site_name', content: siteName },
        {
          property: 'og:url',
          content: `${siteUrl}${path !== '/' ? `/${path}` : ''}`,
        },
        { property: 'og:image', content: pageImage },
        { property: 'og:image:secure_url', content: pageImage },
        {
          name: environment !== 'production' && 'robots',
          content: environment !== 'production' && 'noindex, nofollow',
        },
        { name: metaName, content: metaContent },
      ]}
    >
      <html lang="en" />
    </Helmet>
  );
};

export default Dochead;
