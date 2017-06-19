import { fromJS } from 'immutable';
import * as CONSTANTS from '../constants';

import boundsChangeReducer from './boundsChangeReducer';

// @TODO change default change, bounds, marginbounds to the location in URL, OR Boca Raton, FL
// marginbounds is used not to display markers on around the boundaries so that it goes out of the map.

const initialState = fromJS({
  mapInfo: {
    center: [59.938043, 30.337157],
    bounds: [60.325132160343145, 29.13415407031249, 59.546382183279206, 31.54015992968749],
    marginBounds: [60.2843135300829, 29.21655153124999, 59.58811868963835, 31.45776246874999],
    zoom: 9,
  },
  markers: [],
  infoBoxIndex: -1, // info box displayed
  briefBoxIndex: -1, // small info box displayed
  highlightIndex: -1, // only highlighted in table
});

function propertySearchReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.SEARCH_MAP_BOUNDS_CHANGE:
      return boundsChangeReducer(state, action);
    case CONSTANTS.SEARCH_MAP_TOGGLE_BRIEF:
      return state.set('briefBoxIndex', action.briefBoxIndex);
    case CONSTANTS.SEARCH_MAP_TOGGLE_HIGHLIGHT_INDEX:
      return state.set('highlightIndex', action.highlightIndex);
    case CONSTANTS.SEARCH_MAP_TOGGLE_INFOBOX:
      {
        const { infoBoxIndex } = action;
        const currentIndex = state.get('infoBoxIndex');
        return state.set('infoBoxIndex', infoBoxIndex === currentIndex ? -1 : infoBoxIndex);
      }
    default:
  }
  return state;
}

export default propertySearchReducer;
