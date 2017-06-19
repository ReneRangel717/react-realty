export const MARKER_POS_OFFSET_X = -30;
export const MARKER_POS_OFFSET_Y = -20;

export default function customDistanceToMouse(markerPos, mousePos) {
  const x = markerPos.x;
  const y = markerPos.y;
  const distance = Math.sqrt((x - mousePos.x) * (x - mousePos.x) + (y - mousePos.y) * (y - mousePos.y));
  console.log(markerPos, x, y, distance);
  return distance;
}
