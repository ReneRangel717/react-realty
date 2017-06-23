import { fromJS } from 'immutable';
import * as CONSTANTS from '../constants';

import boundsChangeReducer from './boundsChangeReducer';
import googlePlaceAPISuccessReducer from './googlePlaceAPISuccessReducer';

// @TODO change default change, bounds, marginbounds to the location in URL, OR Boca Raton, FL
// marginbounds is used not to display markers on around the boundaries so that it goes out of the map.

const initialState = fromJS({
  mapInfo: {
    center: [26.3683064, -80.1289321],
    bounds: [26.4249029, -80.0655658, 26.3207559, -80.1710669],
    marginBounds: [26.4249029, -80.0655658, 26.3207559, -80.1710669],
    zoom: 9,
    city: 'boca raton'
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
    case CONSTANTS.SEARCH_MAP_SET_CITY:
      return state.update('mapInfo', mapInfo => mapInfo.merge({ city: action.city }));
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
