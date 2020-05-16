import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import ColorSwatch from './ColorSwatch';

const CustomFields = ({ content }) => {
  const {
    products: { nodes },
  } = useStaticQuery(graphql`
    {
      products: allSanityProduct {
        nodes {
          _id
          _key
          _rawSlug
        }
      }
    }
  `);
  return (
    <SCustomFields>
      {content.fields.map(
        ({ name, options, visibility }, index) =>
          visibility !== 'cartOnly' && (
            <li key={name + index}>
              <strong>{name}</strong>
              <br />
              {options &&
                options.length !== 0 &&
                options.map(option => (
                  <span key={option._key}>
                    {option.linkedProduct ? (
                      nodes.map(
                        product =>
                          product._id === option.linkedProduct._ref && (
                            <Link
                              to={product._rawSlug.current}
                              key={product._key + index}
                            >
                              {name === 'Colors' ? (
                                <ColorSwatch
                                  color={option.label
                                    .replace(new RegExp('\\[(.*?)\\]', 'g'), '')
                                    .toLowerCase()}
                                />
                              ) : (
                                option.label.replace(
                                  new RegExp('\\[(.*?)\\]', 'g'),
                                  ''
                                )
                              )}
                            </Link>
                          )
                      )
                    ) : name === 'Colors' ? (
                      <ColorSwatch
                        color={option.label
                          .replace(new RegExp('\\[(.*?)\\]', 'g'), '')
                          .toLowerCase()}
                      />
                    ) : (
                      option.label.replace(new RegExp('\\[(.*?)\\]', 'g'), '')
                    )}
                  </span>
                ))}
            </li>
          )
      )}
    </SCustomFields>
  );
};

export default CustomFields;

export const SCustomFields = styled.ul`
  span {
    + span {
      margin-left: 5px;
    }
  }
`;
