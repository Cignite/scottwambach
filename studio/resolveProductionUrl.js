export default function resolveProductionUrl(document) {
  return `https://scottwambach.netlify.app/preview?docid=${document._id}`;
}
