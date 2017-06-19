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
  markers: [{
    _id: '123',
    lat: 60.138043,
    lng: 30.237157,
    price: 203000,
    description: 'Nice 1 bed 1.5 bath top floor unit with wood laminate flooring in the living area, an updated kitchen...',
    mlsid: 'beaches20170613204719284000000000',
    piccount: 24
  }, {
    _id: '124',
    lat: 59.934280,
    lng: 30.335099,
    price: 1203000,
    description: 'Great 1 bed 1.5 bath top floor unit with wood laminate flooring in the living area, an updated kitchen...',
    mlsid: 'beaches20170614224303940911000000',
    piccount: 16
  }, {
    _id: '125',
    lat: 60.338043,
    lng: 29.835157,
    price: 2300000,
    description: 'Awesome 1 bed 1.5 bath top floor unit with wood laminate flooring in the living area, an updated kitchen...',
    mlsid: 'beaches20170614183421376967000000',
    piccount: 29
  }],
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
    default:
  }
  return state;
}

export default propertySearchReducer;
