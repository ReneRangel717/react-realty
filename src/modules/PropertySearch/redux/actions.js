import * as CONSTANTS from './constants';

/**
 * @param { center, zoom, bounds, marginBounds, } params
 */
export function mapBoundsChange(params) {
  return {
    type: CONSTANTS.SEARCH_MAP_BOUNDS_CHANGE,
    ...params
  };
}

export function mapToggleBrief(markerIndex) {
  return {
    type: CONSTANTS.SEARCH_MAP_TOGGLE_BRIEF,
    briefBoxIndex: markerIndex
  };
}

export function mapToggleInfobox(markerIndex) {
  return {
    type: CONSTANTS.SEARCH_MAP_TOGGLE_INFOBOX,
    infoBoxIndex: markerIndex
  };
}

export function mapToggleHighlightIndex(markerIndex) {
  return {
    type: CONSTANTS.SEARCH_MAP_TOGGLE_HIGHLIGHT_INDEX,
    highlightIndex: markerIndex
  };
}

export default {
  mapBoundsChange,
  mapToggleBrief,
  mapToggleInfobox,
  mapToggleHighlightIndex
};
