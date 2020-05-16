import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import SvgLoader from '../helpers/SvgLoader';

const SocialList = () => {
  const {
    settings: { socialList },
  } = useStaticQuery(graphql`
    {
      settings: sanitySiteSettings {
        socialList {
          _key
          icon
          link
        }
      }
    }
  `);
  return (
    <SSocialList>
      {socialList.map(({ icon, link, _key }) => (
        <li key={_key}>
          <a
            name={icon}
            title={icon}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SvgLoader name={icon} width={24} />
          </a>
        </li>
      ))}
    </SSocialList>
  );
};

export default SocialList;

const SSocialList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;

  svg {
    width: 100%;
  }

  li {
    width: 24px;

    + li {
      margin-left: 10px;
    }
  }
`;
