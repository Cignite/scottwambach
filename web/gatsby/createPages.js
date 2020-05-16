const path = require('path');

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise(resolve => {
    graphql(`
      {
        pages: allSanityPage {
          edges {
            node {
              _id
              title
              slug {
                current
              }
            }
          }
        }
        contact: sanitySiteSettings {
          cityStateZip
          street
          phone
          mainEmail
        }
      }
    `).then(results => {
      results.data.pages.edges.forEach(({ node }) => {
        createPage({
          path: node.slug.current,
          component: path.resolve('./src/templates/Page.js'),
          context: {
            id: node._id,
          },
        });
      });
      createPage({
        path: 'contact-us',
        component: path.resolve('./src/templates/ContactUs.js'),
        context: {
          siteSettings: results.data.siteSettings,
          content: results.data.contact,
        },
      });
      resolve();
    });
  });
};
