export default function (filters) {
  const arr = [];
  Object.keys(filters).forEach((filterName) => {
    const filter = filters[filterName];
    if (Array.isArray(filter)) {
      filter.forEach((item) => {
        arr.push(`${filterName}=${item}`);
      });
    } else {
      arr.push(`${filterName}=${filter}`);
    }
  });
  return arr.join('&');
}
