import React from 'react';

import styled from 'styled-components';
import { colors } from '../../styles/utilities/settings';

const Event = ({
  content: { title, cityStateZip, street, description, time, date, link },
}) => {
  const parseDate = dateValue => dateValue.split(' ');
  return (
    <SEvent>
      <div>
        <div className="date">
          {parseDate(date).map((dateItem, index) => (
            <span key={dateItem + index}>{dateItem.replace(',', '')}</span>
          ))}
        </div>
        <h4>
          {title}
          <br />
          <span>{time}</span>
        </h4>
        <p>
          <strong>Where: </strong>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.google.com/maps/dir//${street} ${cityStateZip}`}
          >
            {`${street} ${cityStateZip}`}
          </a>
        </p>
        <p>{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          Learn More
        </a>
      </div>
    </SEvent>
  );
};

export default Event;

export const SEvent = styled.div`
  > div {
    background-color: ${colors.text};
    padding: 30px;
    position: relative;
    color: ${colors.white};

    .date {
      background-color: ${colors.text};
      border: 1px solid ${colors.white};
      color: ${colors.white};
      text-align: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -40px;
      height: 80px;
      width: 80px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      span {
        line-height: 1;
        display: block;
      }
    }

    a {
      color: ${colors.white};
    }
  }
`;
