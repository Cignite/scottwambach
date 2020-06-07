// const createPortfolioItems = require('./gatsby/createPortfolioItems');

// exports.createPages = async ({ actions, graphql }) => {
//   await createPortfolioItems({ actions, graphql });
// };

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  /* eslint-disable no-param-reassign */
  if (page.path.match(/^\/work/)) {
    page.matchPath = '/work/*';
    // Update the page.
    createPage(page);
  }
};
