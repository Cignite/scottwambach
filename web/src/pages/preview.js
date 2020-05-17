import React, { useState, useEffect } from 'react';
import sanityClient from '@sanity/client';
import Layout from '../components/Layout';
import Loader from '../components/helpers/Loader';

const { GATSBY_SANITY_ID } = process.env;
const { GATSBY_SANITY_DATASET } = process.env;
const { GATSBY_SANITY_TOKEN } = process.env;

const preview = () => {
  // const [previewType, setPreviewType] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [pageLoad, setPageLoad] = useState(null);

  useEffect(() => {
    const client = sanityClient({
      projectId: GATSBY_SANITY_ID,
      dataset: GATSBY_SANITY_DATASET,
      token: GATSBY_SANITY_TOKEN,
      useCdn: true,
    });

    const idReturn = url => {
      const initSplit = url.split('?docid=')[1];
      const splitIDs = initSplit.split('&listing=')[0];
      const listing = initSplit.split('&listing=')[1];
      return [splitIDs, listing];
    };

    if (global.window.location.search) {
      const query = `*[_id in path("${
        idReturn(global.window.location.search)[0]
      }")]`;

      client.fetch(query).then(data => {
        setPreviewData(data[0]);
        setPageLoad(false);
        // setPreviewType(
        //   idReturn(global.window.location.search)[1] === '0'
        //     ? 'page'
        //     : 'listing'
        // );
      });
    }
  }, []);
  return (
    <Layout
      title="Preview"
      pageImage={null}
      transparentHeader={previewData && previewData.transparentHeader}
    >
      {pageLoad && !previewData && <Loader bg />}
      {!pageLoad && previewData && (
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
            {JSON.stringify(previewData, null, '    ')}
          </pre>
        </code>
      )}
    </Layout>
  );
};

export default preview;
