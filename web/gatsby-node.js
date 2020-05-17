const createPortfolioItems = require('./gatsby/createPortfolioItems');

exports.createPages = async ({ actions, graphql }) => {
  await createPortfolioItems({ actions, graphql });
};
