import React from 'react';
import Layout from '../components/Layout';

const Work = ({ pageContext }) => (
  <Layout>
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
        {JSON.stringify(pageContext, null, '    ')}
      </pre>
    </code>
    {/* Data Dump End */}
  </Layout>
);

export default Work;
