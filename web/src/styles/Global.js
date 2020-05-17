import { createGlobalStyle } from 'styled-components';
import { font, spacing, misc, colors } from './utilities/settings';
import { richTextContent } from './utilities/elements';

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    -webkit-font-smoothing: antialiased;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
    font-family: ${font.primary};
    ${({ open }) => (open ? 'overflow: hidden;' : '')};
    color: ${colors.text};
    background-color: ${colors.white};
  }

  html {
    box-sizing: border-box;
  }

  main {
    &.alert {
      padding-top: ${spacing.headerAlert};
    }
  }

  .skip-link {
    &:focus {
      z-index: 9999 !important;
    }
  }

  .body-content {
    ${richTextContent};
    width: 100%;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  strong {
    font-weight: bold;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    text-decoration: none;
  }

  img {
    height: auto;
    width: 100%;
  }

  .slick-list {
    transition-duration: ${misc.animSpeed};
  }

  .slick-dots {
    margin: 0 !important;
  }
`;

export default GlobalStyle;
