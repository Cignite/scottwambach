import React from 'react';
import refID from '../../js/refID';
import { SiteContext } from '../Layout';

const Video = ({ src }) => (
  <SiteContext.Consumer>
    {({
      siteMeta: {
        siteMetadata: { sanityId, dataset },
      },
    }) => (
      <video playsInline autoPlay muted loop>
        <source
          src={`https://cdn.sanity.io/files/${sanityId}/${dataset}/${refID(
            src.asset._ref
          )}.mp4`}
          type="video/mp4"
        />
      </video>
    )}
  </SiteContext.Consumer>
);

export default Video;
