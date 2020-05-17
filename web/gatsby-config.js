require('dotenv').config({
  path: '.env',
});

const { GATSBY_SITEURL } = process.env;
const { GATSBY_SANITY_TOKEN } = process.env;
const { GATSBY_SANITY_ID } = process.env;
const { GATSBY_SANITY_DATASET } = process.env;
const { GATSBY_ENV } = process.env;

module.exports = {
  siteMetadata: {
    siteUrl: GATSBY_SITEURL,
    sanityId: GATSBY_SANITY_ID,
    dataset: GATSBY_SANITY_DATASET,
    environment: GATSBY_ENV,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'dataFiles',
        path: `${__dirname}/data/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'image',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-yaml',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'scottwambach',
        short_name: 'scottwambach',
        start_url: '/',
        background_color: '#1A77B9',
        theme_color: '#1A77B9',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Oswald',
            variants: ['700'],
          },
          {
            family: 'Raleway',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: GATSBY_SANITY_ID,
        dataset: GATSBY_SANITY_DATASET,
        token: GATSBY_SANITY_TOKEN,
        watchMode: true,
      },
    },
  ],
};
