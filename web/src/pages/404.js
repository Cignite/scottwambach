import React from 'react';
import Layout, { SiteContext } from '../components/Layout';
import Dochead from '../components/Dochead';

const ErrorPage = () => (
  <Layout>
    <SiteContext.Consumer>
      {value => (
        <>
          <Dochead
            title="404 Page Not Found"
            siteName={value.siteTitle}
            pageImage={null}
          />
          404 Page not found!
        </>
      )}
    </SiteContext.Consumer>
  </Layout>
);

export default ErrorPage;
