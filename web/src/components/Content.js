import React from 'react';
import styled from 'styled-components';
import ImageBlock from './contentBlocks/ImageBlock';
import RichText from './contentBlocks/RichText';
import DataTable from './contentBlocks/DataTable';
import CallToActionBanner from './contentBlocks/CallToActionBanner';
import ImageFeatures from './contentBlocks/ImageFeatures';
import ImageGallery from './contentBlocks/ImageGallery';
import FeatureSlider from './contentBlocks/FeatureSlider';
import Locations from './contentBlocks/Locations';
import CodeBlock from './contentBlocks/CodeBlock';
import CurratedContent from './contentBlocks/CurratedContent';
import EventListing from './contentBlocks/EventListing';
import HeroBanner from './contentBlocks/HeroBanner';
import Carousel from './contentBlocks/Carousel';
import HeadingContent from './modules/HeadingContent';
import TiledLinks from './contentBlocks/TiledLinks';

const Content = ({ contentArray, mainImage }) =>
  contentArray &&
  contentArray.map(content => (
    <React.Fragment key={content._key}>
      {content._type === 'codeBlock' ? (
        <>
          {content.code.language === 'html' ? (
            <Section noMargin={content.noMargin}>
              <CodeBlock content={content} />
            </Section>
          ) : (
            <CodeBlock content={content} />
          )}
        </>
      ) : (
        <Section
          id={`${content._type}_${content._key}`}
          noMargin={content.noMargin}
        >
          {content._type === 'heroBanner' && (
            <HeroBanner mainImage={mainImage} content={content} />
          )}
          {content._type === 'videoBanner' && (
            <HeroBanner mainImage={mainImage} content={content} />
          )}
          {content._type === 'carousel' && (
            <Carousel mainImage={mainImage} content={content} />
          )}
          {content._type === 'richText' && <RichText content={content} />}
          {content._type === 'imageBlock' && <ImageBlock content={content} />}
          {content._type === 'dataTable' && <DataTable content={content} />}
          {content._type === 'sectionHeading' && (
            <HeadingContent centered content={content} />
          )}
          {content._type === 'callToActionBanner' && (
            <CallToActionBanner content={content} />
          )}
          {content._type === 'imageFeatures' && (
            <ImageFeatures content={content} />
          )}
          {content._type === 'imageGallery' && (
            <ImageGallery content={content} />
          )}
          {content._type === 'locationsList' && <Locations content={content} />}
          {content._type === 'featureSlider' && (
            <FeatureSlider content={content} />
          )}
          {content._type === 'curratedContent' && (
            <CurratedContent content={content} />
          )}
          {content._type === 'eventListing' && (
            <EventListing content={content} />
          )}
          {content._type === 'tiledLinks' && <TiledLinks content={content} />}
        </Section>
      )}
    </React.Fragment>
  ));

export default Content;

export const Section = styled.section`
  ${({ noMargin }) => noMargin && 'margin-bottom: 0;'}
`;
