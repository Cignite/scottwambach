export default function pageTrimmer(link) {
  const linkSlug = link.split('/')[link.split('/').length - 1];
  const filename = linkSlug.replace('.com', '').replace('.org', '');
  return filename;
}
