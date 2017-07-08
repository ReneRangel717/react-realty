const pattern = /[0-9]/g;
export default function decideProperty(slug) {
  return pattern.test(slug);
}
