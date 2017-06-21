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

export function mapShowBrief() {
  return {
    type: CONSTANTS.SEARCH_MAP_SHOW_BRIEF
  };
}

export function mapToggleInfobox(markerIndex) {
  return {
    type: CONSTANTS.SEARCH_MAP_TOGGLE_INFOBOX,
    infoBoxIndex: markerIndex
  };
}

export function mapToggleHoverIndex(markerIndex) {
  return {
    type: CONSTANTS.SEARCH_MAP_TOGGLE_HOVER_INDEX,
    hoverIndex: markerIndex
  };
}

export function propertySearchRequest() {
  return {
    type: CONSTANTS.PROPERTY_SEARCH_REQUEST
  };
}

export function propertySearchSuccess(data) {
  console.log(data);
  return {
    type: CONSTANTS.PROPERTY_SEARCH_SUCCESS,
    ...data
  };
}

// @TODO manipulate various error types
export function propertySearchError(error) {
  return {
    type: CONSTANTS.PROPERTY_SEARCH_ERROR,
    error
  };
}

export default {
  mapBoundsChange,
  mapShowBrief,
  mapToggleInfobox,
  mapToggleHoverIndex,
  propertySearchRequest,
  propertySearchSuccess,
  propertySearchError
};
