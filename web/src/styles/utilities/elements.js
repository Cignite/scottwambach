import { css } from 'styled-components';
import { colors, misc, font } from './settings';
import { below, above } from './mediaQueries';

export const richTextContent = css`
  line-height: 1.5;
  font-family: ${font.primary};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol,
  p,
  blockquote,
  img,
  amp-img,
  picture {
    margin: 20px 0;
    display: block;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    font-family: ${font.secondary};
  }

  h1 {
    font-size: 35px;
  }
  h2 {
    font-size: 30px;
  }
  h3 {
    font-size: 26px;
  }
  h4 {
    font-size: 22px;
  }
  h5 {
    font-size: 18px;
  }
  h6 {
    font-size: 16px;
  }

  ul,
  ol {
    margin-left: 15px;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  a {
    color: ${colors.blue};
    text-decoration: underline;

    &:hover {
      color: ${colors.orange};
    }
  }

  blockquote {
    background-color: ${colors.lightGray};
    padding: 20px;
    border-left: 20px solid ${colors.gray};
  }

  hr {
    margin: 40px 0;
    max-width: 80%;
  }

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  amp-img,
  picture {
    img {
      margin: 0;
    }
  }
`;

export const button = css`
  display: inline-block;
  appearance: none;
  border: 1px solid ${colors.blue};
  background-color: ${colors.blue};
  color: ${colors.white};
  padding: 10px 50px;
  text-decoration: none;
  cursor: pointer;
  transition-duration: ${misc.animSpeed};
  text-transform: uppercase;
  font-weight: 800;
  font-size: 16px;
  text-align: center;
  border-radius: 5px;

  &:hover {
    color: ${colors.blue};
    background-color: ${colors.white};
  }
`;

export const alertButton = css`
  ${button};
  border: 1px solid ${colors.red};
  background-color: ${colors.red};
  color: ${colors.white};

  &:hover {
    color: ${colors.red};
    background-color: ${colors.white};
  }
`;

export const whiteOutlineButton = css`
  ${button};
  background-color: transparent;
  border: 2px solid ${colors.white};
  color: ${colors.white};
  &:hover {
    color: ${colors.black};
    background-color: ${colors.white};
    opacity: 1;
  }
`;

export const absoluteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const imageBG = css`
  position: relative;
  overflow: hidden;

  > video,
  > .gatsby-image-wrapper,
  > picture {
    pointer-events: none;
    position: absolute !important;
    top: 50%;
    left: 50%;
    width: auto !important;
    height: auto !important;
    max-height: none;
    max-width: none;
    min-height: 101%;
    min-width: 101%;
    transform: translate(-50%, -50%);
    z-index: 0;
  }
  > picture img {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
`;

export const slickStyles = css`
  .slick-slide {
    ${below.midTab`
      padding: 0 0 0 50px;
    `}

    div {
      &:focus {
        outline: none;
      }
    }
  }

  .slick-arrow {
    height: 50px;
    width: 30px;
    z-index: 5;

    ${below.midTab`
      background-color: ${colors.gray};

      &:hover,
      &:focus {
        background-color: ${colors.gray};
      }
    `}

    &:before,
    &:after {
      content: '';
      height: 3px;
      width: 30px;
      background-color: ${colors.black};
      display: block;
      position: relative;
      margin: 0 auto;

      ${below.ipadMid`
        width: 20px;
      `}
    }

    &.slick-disabled {
      opacity: 0.25;

      &:before,
      &:after {
        opacity: 1;
      }
    }

    &.slick-prev {
      left: 0;

      ${above.midTab`
        left: -50px;
      `}

      &:before {
        transform: rotate(-45deg);
        top: -8px;
        ${below.ipadMid`
          top: -5px;
        `}
      }

      &:after {
        transform: rotate(45deg);
        top: 8px;
        ${below.ipadMid`
          top: 5px;
        `}
      }
    }

    &.slick-next {
      right: 0;

      ${above.midTab`
        right: -50px;
      `}

      &:before {
        top: -8px;
        transform: rotate(45deg);
        ${below.ipadMid`
          top: -5px;
        `}
      }

      &:after {
        transform: rotate(-45deg);
        top: 8px;
        ${below.ipadMid`
          top: 5px;
        `}
      }
    }
  }
`;
