const sanityClient = require('@sanity/client');
const path = require('path');

const { GATSBY_SANITY_ID } = process.env;
const { GATSBY_SANITY_DATASET } = process.env;
const { GATSBY_SANITY_TOKEN } = process.env;

const client = sanityClient({
  projectId: GATSBY_SANITY_ID,
  dataset: GATSBY_SANITY_DATASET,
  token: GATSBY_SANITY_TOKEN,
  useCdn: true,
});

module.exports = async ({ actions }) => {
  const { createPage } = actions;
  const query = `*[_type == 'portfolioItem' && !(_id in path("drafts.**"))] {
    _id,
    title,
    "slug": slug.current,
    highlightedPages
  }`;
  const portfolio = await client.fetch(query).then(data => data);

  portfolio.forEach(work => {
    createPage({
      path: work.slug,
      component: path.resolve('./src/templates/Work.js'),
      context: {
        id: work._id,
      },
    });
  });
};
