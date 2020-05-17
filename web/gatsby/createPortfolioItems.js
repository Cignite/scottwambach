const sanityClient = require('@sanity/client');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const { GATSBY_SANITY_ID } = process.env;
const { GATSBY_SANITY_DATASET } = process.env;
const { GATSBY_SANITY_TOKEN } = process.env;

const client = sanityClient({
  projectId: GATSBY_SANITY_ID,
  dataset: GATSBY_SANITY_DATASET,
  token: GATSBY_SANITY_TOKEN,
  useCdn: true,
});

// const takeScreenshot = async (dir, link) => {
//   const linkSlug = link.split('/')[link.split('/').length - 1];
//   const filename = linkSlug.replace('.com', '').replace('.org', '');
//   const browser = await puppeteer.launch({
//     defaultViewport: {
//       width: 1200,
//       height: 600,
//       isLandscape: true,
//     },
//   });
//   const page = await browser.newPage();
//   fs.mkdir(path.join(__dirname, `../src/images${dir}`), () => {
//     console.log('Directory created successfully!');
//   });
//   const options = {
//     path: `src/images${dir}/${filename}.png`,
//     fullPage: true,
//   };

//   await page.goto(link);
//   await page.screenshot(options);
//   await browser.close();
// };

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
