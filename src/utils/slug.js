import limax from 'limax';

export function getSlug(str) {
  return limax(str);
}

export function getString(slug) {
  return slug.replace(/-/g, ' ');
}
