import $ from 'jquery';

export default function getMapSize(className = 'mapContainer') {
  const $map = $(`.${className}`);
  if (__SERVER__ || !$map.length) {
    return { width: 640, height: 480 };
  }

  return { width: $map.width(), height: $map.height() };
}
