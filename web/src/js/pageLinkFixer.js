const { GATSBY_SITEURL } = process.env;

export default function pageLinkFixer(url) {
  const fixedLink = url.split(GATSBY_SITEURL);
  return fixedLink[0] !== '' ? fixedLink[0] : fixedLink[1];
}
