// import React from 'react';
// import { graphql, useStaticQuery } from 'gatsby';
// import VisibilitySensor from 'react-visibility-sensor';
// import GoogleMapReact from 'google-map-react';
// import styled from 'styled-components';
// import Wrapper from '../../styles/utilities/Wrapper';
// import MapMarker from '../modules/MapMarker';
// import ImageSizer from '../helpers/ImageSizer';
// import { breakpoints } from '../../styles/utilities/settings';

// const { GATSBY_GOOGLEMAPAPI } = process.env;

// export default function Locations({ content }) {
//   const center = {
//     lat: 37.969643,
//     lng: -87.5885826,
//   };

//   const { locations } = useStaticQuery(graphql`
//     {
//       locations: allSanityLocation {
//         edges {
//           node {
//             _key
//             _rawMainImage
//             location {
//               lat
//               lng
//             }
//             cityStateZip
//             street
//             title
//           }
//         }
//       }
//     }
//   `);

//   return (
//     <Wrapper>
//       {content.alternateLayout ? (
//         <LocationsList>
//           {locations.edges.map(
//             ({ node: { _rawMainImage, title, cityStateZip, street } }) => (
//               <div>
//                 <a
//                   href={`https://www.google.com/maps/place/${street} ${cityStateZip}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <ImageSizer src={_rawMainImage} width={400} height={200} />
//                   <p>
//                     {title}
//                     <br />
//                     {`${street} ${cityStateZip}`}
//                   </p>
//                 </a>
//               </div>
//             )
//           )}
//         </LocationsList>
//       ) : (
//         <VisibilitySensor partialVisibility>
//           {({ isVisible }) => (
//             <div style={{ height: '400px', width: '100%' }}>
//               {isVisible && (
//                 <GoogleMapReact
//                   bootstrapURLKeys={{ key: GATSBY_GOOGLEMAPAPI }}
//                   defaultCenter={center}
//                   defaultZoom={13}
//                 >
//                   {locations.edges.map(({ node }, index) => (
//                     <MapMarker
//                       content={node}
//                       lat={node.location.lat}
//                       lng={node.location.lng}
//                       key={node._key + index}
//                     />
//                   ))}
//                 </GoogleMapReact>
//               )}
//             </div>
//           )}
//         </VisibilitySensor>
//       )}
//     </Wrapper>
//   );
// }

// export const LocationsList = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;

//   > div {
//     width: 100%;
//     max-width: ${breakpoints.pageWidth / 4 - 30}px;
//   }

//   a {
//     display: block;
//     padding: 0 15px 30px;
//     text-decoration: none;
//   }
// `;
