export default function getMarkerStyle(size = { width: 70, height: 40 }, origin = { x: 1, y: 1 }) {
  const sizeOriginX = size.width * origin.x;
  const sizeOriginY = size.height * origin.y;

  return {
    position: 'absolute',
    width: size.width,
    height: size.height,
    left: 0,
    top: 0,
    willChange: 'transform', // it looks like this setting make firefox random marker movements smaller
    transition: 'transform 0.25s cubic-bezier(0.485, 1.650, 0.545, 0.835)',
    transformOrigin: `${sizeOriginX}px ${sizeOriginY}px`
  };
}
