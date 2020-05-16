export default function resolveProductionUrl(document) {
  return `https://scottwambach.netlify.com/preview?docid=${document._id}`;
}
