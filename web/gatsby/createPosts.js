const path = require('path');
const createPaginatedPages = require('gatsby-paginate');

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise(resolve => {
    graphql(`
      {
        posts: allSanityPost(sort: { fields: publishedAt, order: DESC }) {
          edges {
            node {
              _id
              title
              slug {
                current
              }
              _rawMainImage
              _rawBody
              publishedAt(formatString: "LL")
              title
              user {
                name
              }
              metaTitle
              metaDescription
            }
          }
        }
      }
    `).then(results => {
      createPaginatedPages({
        edges: results.data.posts.edges,
        createPage,
        pageTemplate: './src/templates/Blog.js',
        pageLength: 2, // This is optional and defaults to 10 if not used
        pathPrefix: 'blog', // This is optional and defaults to an empty string if not used
      });
      results.data.posts.edges.forEach(({ node }) => {
        createPage({
          path: node.slug.current,
          component: path.resolve('./src/templates/Post.js'),
          context: {
            id: node._id,
          },
        });

        createPage({
          path: `${node.slug.current}/amp`,
          component: path.resolve('./src/templates/amp/Post.amp.js'),
          context: {
            id: node._id,
          },
        });
      });
      resolve();
    });
  });
};
