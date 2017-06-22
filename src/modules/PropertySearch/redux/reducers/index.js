import { fromJS } from 'immutable';
import * as CONSTANTS from '../constants';

import boundsChangeReducer from './boundsChangeReducer';
import googlePlaceAPISuccessReducer from './googlePlaceAPISuccessReducer';

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
  hoverIndex: -1, // only hover in table
  hoverState: false, // false: hover, true: brief info
});

function propertySearchReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.SEARCH_MAP_BOUNDS_CHANGE:
      return boundsChangeReducer(state, action);
    case CONSTANTS.SEARCH_MAP_SHOW_BRIEF:
      return state.set('hoverState', true);
    case CONSTANTS.SEARCH_MAP_TOGGLE_HOVER_INDEX:
      return state
        .set('hoverIndex', action.hoverIndex)
        .set('hoverState', false);
    case CONSTANTS.SEARCH_MAP_TOGGLE_INFOBOX:
      {
        const { infoBoxIndex } = action;
        const currentIndex = state.get('infoBoxIndex');
        return state.set('infoBoxIndex', infoBoxIndex === currentIndex ? -1 : infoBoxIndex);
      }
    case CONSTANTS.GOOGLE_PLACE_SEARCH_SUCCESS:
      return googlePlaceAPISuccessReducer(state, action);
    case CONSTANTS.PROPERTY_SEARCH_SUCCESS:
      return state.set('markers', fromJS(action.response.data));
    default:
  }
  return state;
}

export default propertySearchReducer;
