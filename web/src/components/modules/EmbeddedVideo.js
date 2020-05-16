import React from 'react';

import styled from 'styled-components';

const EmbeddedVideo = ({ title, videoId, objectId }) => (
  <SEmbeddedVideo>
    <div className="inner">
      <iframe
        loading="lazy"
        title={title}
        src={`https://www.youtube.com/embed/${videoId}?feature=oembed`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen=""
        id={objectId || videoId}
      />
    </div>
  </SEmbeddedVideo>
);

export default EmbeddedVideo;

export const SEmbeddedVideo = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  position: relative;
  overflow: hidden;

  img {
    display: none;
  }

  .inner {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0 !important;
    top: 0 !important;

    iframe {
      width: 100%;
      height: 100%;
    }
  }
`;
