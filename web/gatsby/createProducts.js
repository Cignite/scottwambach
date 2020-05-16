const sanityClient = require('@sanity/client');
const path = require('path');
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
  const query = `*[_type == 'product'] | order(title asc) {
    title,
    _id,
    _key,
    "_rawSlug": slug,
    "_rawMainImage": mainImage,
    "_rawAdditionalImages": additionalImages,
    youtubeId,
    price,
    "_rawParentProduct": parentProduct,
    "relatedProducts": *[_type == 'product' && references(^.categories[]._ref)] | order(title asc) {
      title,
      _id,
      _key,
      "_rawSlug": slug,
      "_rawMainImage": mainImage,
      "_rawAdditionalImages": additionalImages,
      "_rawParentProduct": parentProduct,
      youtubeId,
      price,
    }
  }`;

  const products = await client.fetch(query).then(data => data);

  createPaginatedPages({
    edges: products,
    createPage,
    pageTemplate: './src/templates/Shop.js',
    pageLength: 10, // This is optional and defaults to 10 if not used
    pathPrefix: 'shop', // This is optional and defaults to an empty string if not used
    context: {}, // This is optional and defaults to an empty object if not used
  });

  products.forEach(product => {
    createPage({
      path: product._rawSlug.current,
      component: path.resolve('./src/templates/Product.js'),
      context: {
        id: product._id,
        content: product,
      },
    });
  });
};
