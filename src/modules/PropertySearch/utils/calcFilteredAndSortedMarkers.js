import { List } from 'immutable';

function pointInSect(x, a, b) {
  return (x - a) * (x - b) <= 0;
}

function pointInRect(pt, rect) {
  return pointInSect(pt.get('lat'), rect.get(0), rect.get(2)) && pointInSect(pt.get('lng'), rect.get(1), rect.get(3));
}

export default function calcFilteredAndSortedMarkers(markers, mapInfo) {
  const marginBounds = mapInfo && mapInfo.get('marginBounds');

  if (!markers || !marginBounds) {
    return new List();
  }

  return markers.filter(m => pointInRect(m, marginBounds));
}
