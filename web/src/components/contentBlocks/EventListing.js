// import React from 'react';
// import { graphql, StaticQuery } from 'gatsby';
// import styled from 'styled-components';
// import dateFormatter from '../../js/dateFormatter';
// import Wrapper from '../../styles/utilities/Wrapper';
// import Event from '../modules/Event';
// import { breakpoints } from '../../styles/utilities/settings';

// const NewEventsArray = events => {
//   const updatedEvents = [];

//   events.forEach(({ event }) => {
//     if (new Date(event.date) >= new Date()) {
//       updatedEvents.push({
//         event: {
//           _id: event._id,
//           title: event.title,
//           cityStateZip: event.cityStateZip,
//           street: event.street,
//           description: event.description,
//           time: event.time,
//           date: event.date,
//           dateTime: new Date(event.date),
//           link: event.link,
//         },
//       });
//     }

//     if (event.reoccuringDates) {
//       event.reoccuringDates.forEach((reDate, index) => {
//         if (new Date(dateFormatter(reDate, 1)) >= new Date()) {
//           updatedEvents.push({
//             event: {
//               _id: event._id + index,
//               title: event.title,
//               cityStateZip: event.cityStateZip,
//               street: event.street,
//               description: event.description,
//               time: event.time,
//               date: dateFormatter(reDate, 1),
//               dateTime: new Date(dateFormatter(reDate, 1)),
//               link: event.link,
//             },
//           });
//         }
//       });
//     }
//   });

//   const sortedEvents = updatedEvents.sort(
//     (a, b) => a.event.dateTime - b.event.dateTime
//   );

//   return updatedEvents.length !== 0 ? sortedEvents : events;
// };

// const EventListing = () => (
//   <SEventListing>
//     <Wrapper>
//       <div className="listing">
//         <StaticQuery
//           query={EVENTLISTING_QUERY}
//           render={({ allEvents: { events } }) =>
//             NewEventsArray(events).map(({ event }, index) => (
//               <Event key={event._id + index} content={event} />
//             ))
//           }
//         />
//       </div>
//     </Wrapper>
//   </SEventListing>
// );

// export default EventListing;

// const EVENTLISTING_QUERY = graphql`
//   {
//     allEvents: allSanityEvent(sort: { fields: date, order: ASC }) {
//       events: edges {
//         event: node {
//           _id
//           title
//           cityStateZip
//           time
//           street
//           description
//           link
//           date(formatString: "ll")
//           reoccuringDates
//         }
//       }
//     }
//   }
// `;

// const SEventListing = styled.div`
//   margin-bottom: -30px;

//   .listing {
//     @media screen and (min-width: ${breakpoints.ipadPort}px) {
//       display: flex;
//       flex-wrap: wrap;
//       margin-right: -30px;
//     }

//     > div {
//       padding: 40px 0;

//       @media screen and (min-width: ${breakpoints.ipadPort}px) {
//         width: 33.333%;
//         padding: 40px 30px 30px 0;
//       }

//       @media screen and (max-width: ${breakpoints.ipadPort - 1}px) {
//         max-width: 400px;
//         margin: 0 auto;
//       }
//     }
//   }
// `;
