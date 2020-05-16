import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import SvgLoader from '../helpers/SvgLoader';
import { colors, misc, breakpoints } from '../../styles/utilities/settings';

const evenNum = num => num % 2 === 0;

const TileContent = ({ tile, index }) => (
  <>
    <SvgLoader
      name={tile.icon.icon}
      width={40}
      color={evenNum(index) ? colors.orange : colors.green}
    />
    <h5>{tile.heading}</h5>
    <p>{tile.link.copy}</p>
  </>
);

const TiledLinks = ({ content }) => (
  <STiledLinks>
    {content.tiles.map((tile, index) => (
      <Tile even={evenNum(index)} key={tile.heading + index}>
        {tile.link.newTab ? (
          <a href={tile.link.url} target="_blank" rel="noopener noreferrer">
            <TileContent tile={tile} index={index} />
          </a>
        ) : (
          <Link to={tile.link.url}>
            <TileContent tile={tile} index={index} />
          </Link>
        )}
      </Tile>
    ))}
  </STiledLinks>
);

export default TiledLinks;

const STiledLinks = styled.div`
  @media screen and (min-width: ${breakpoints.ipadPort}px) {
    display: flex;
  }
  > div {
    width: 100%;
    text-align: center;
  }
`;

const Tile = styled.div`
  text-transform: uppercase;
  a {
    display: block;
    height: 100%;
    padding: 50px 30px;
    text-decoration: none;
    color: ${colors.white};
    background-color: ${({ even }) => (even ? colors.blue : colors.darkBlue)};
    transition-duration: ${misc.animSpeed};
    &:hover {
      color: ${colors.white};
      opacity: 0.8;
    }
  }
  h5,
  p {
    margin: 0;
  }
  h5 {
    font-size: 25px;
    margin-top: 10px;
  }
`;
