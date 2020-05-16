const sanityClient = require('@sanity/client');
const createPaginatedPages = require('gatsby-paginate');

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
  const query = `*[_type == 'category']{
    title,
    slug,
    "relatedPosts": *[_type == 'post' && references(^._id)] {
      title,
      slug,
      mainImage,
      metaDescription,
      publishedAt,
      "user": *[_id == ^.user._ref][0] {
        name,
      },
    }
  } `;
  const categories = await client.fetch(query).then(data => data);

  categories.forEach(cat => {
    createPaginatedPages({
      edges: cat.relatedPosts,
      createPage,
      pageTemplate: './src/templates/Archive.js',
      pageLength: 2, // This is optional and defaults to 10 if not used
      pathPrefix: cat.slug.current, // This is optional and defaults to an empty string if not used
      context: {
        title: cat.title
      }
    });
  });
};
