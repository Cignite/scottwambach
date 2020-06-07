import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import client from '../js/client';

const App = ({ location }) => {
  const [pageData, setPageData] = useState(null);

  const query = `*[_type == 'portfolioItem' && slug.current == '${location.pathname}' && !(_id in path("drafts.**"))] {
    _id,
    title,
    "slug": slug.current,
    highlightedPages
  }`;

  useEffect(() => {
    client.fetch(query).then(item => {
      setPageData(item[0]);
    });
  }, []);
  return (
    <Layout>
      {pageData && <h1>{pageData.title}</h1>}
      {/* Data Dump */}
      <code>
        <pre
          style={{
            fontFamily: 'monospace',
            display: 'block',
            padding: '50px',
            color: '#88ffbf',
            backgroundColor: 'black',
            textAlign: 'left',
            whiteSpace: 'pre-wrap',
          }}
        >
          {JSON.stringify(pageData, null, '    ')}
        </pre>
      </code>
      {/* Data Dump End */}
    </Layout>
  );
};

export default App;
