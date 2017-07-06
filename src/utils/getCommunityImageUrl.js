export default function getCommunityImageUrl(image) {
  return `${process.env.IMG_BASE_URL}community_images/${image}`;
}
