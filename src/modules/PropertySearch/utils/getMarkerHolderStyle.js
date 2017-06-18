export default function getMarkerHolderStyle(size = { width: 70, height: 40 }, origin = { x: 1, y: 1 }) {
  const left = -size.width * origin.x;
  const top = -size.height * origin.y;
  return {
    position: 'absolute',
    width: size.width,
    height: size.height,
    left,
    top,
    cursor: 'pointer'
  };
}
