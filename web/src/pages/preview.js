import React, { useState, useEffect } from 'react';
import sanityClient from '@sanity/client';
import Layout from '../components/Layout';
import Content from '../components/Content';
import Loader from '../components/helpers/Loader';
import Post from '../components/preview/Post';

const { GATSBY_SANITY_ID } = process.env;
const { GATSBY_SANITY_DATASET } = process.env;
const { GATSBY_SANITY_TOKEN } = process.env;

const preview = () => {
  const [previewType, setPreviewType] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [author, setAuthor] = useState(null);
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
        setPreviewType(
          idReturn(global.window.location.search)[1] === '0'
            ? 'page'
            : 'listing'
        );

        if (data[0].user) {
          const userQuery = `*[_id in path("${data[0].user._ref}")]`;
          client.fetch(userQuery).then(userData => {
            setAuthor(userData[0]);
          });
        }
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
        <>
          {previewData._type === 'page' && (
            <>
              {previewData.pageContent && (
                <Content
                  mainImage={previewData.mainImage}
                  contentArray={previewData.pageContent}
                />
              )}
            </>
          )}
          {previewData._type === 'post' && (
            <Post content={previewData} type={previewType} author={author} />
          )}
        </>
      )}
    </Layout>
  );
};

export default preview;
