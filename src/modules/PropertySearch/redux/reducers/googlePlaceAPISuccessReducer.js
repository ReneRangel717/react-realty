import { fitBounds } from 'google-map-react/utils';
import $ from 'jquery';

function getMapSize() {
  const $map = $('.mapContainer');
  if (__SERVER__ || !$map.length) {
    return { width: 640, height: 480 };
  }

  return { width: $map.width(), height: $map.height };
}

export default function (state, action) {
  const size = getMapSize();
  const { response } = action;

  if (!response.geometry) {
    console.error('Geometry is missing from google place API');
    return state;
  }

  const bounds = {
    ne: response.geometry.viewport.northeast,
    sw: response.geometry.viewport.southwest
  };

  const { center, zoom } = fitBounds(bounds, size);
  return state.update('mapInfo', mapInfo => mapInfo.merge({ center, zoom }));
}
