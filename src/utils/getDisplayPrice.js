export default function getDisplayPrice(priceParam) {
  const price = parseFloat(priceParam);
  if (price < 20000) {
    const priceStr = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `$${priceStr}`;
  } else if (price >= 1000000) {
    return `$${Math.round(price / 1000000)}M`;
  }

  return `$${Math.round(price / 1000)}K`;
}
