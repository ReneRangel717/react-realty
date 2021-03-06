import { fromJS } from 'immutable';
import * as CONSTANTS from '../constants';
import sortReducer from './sortReducer';

const initialState = fromJS({
  filters: {
    query: '',
    price: [],
    sqft: [],
    type: '',
    location: null,
    // status,
    // beds,
    // baths,
    // date,
    // age,
    // garage,
    // features
  },
  properties: [],
  cities: [],
  communities: [],
  agents: [],
  searching: false,

  mapInfo: {
    center: [26.3683064, -80.1289321],
    zoom: 9,
  },
  sidebar: true,
  view: 'table',
  sort: [],
  infoBoxIndex: -1, // info box displayed
  hoverIndex: -1, // only hover in table
  hoverState: false, // false: hover, true: brief info
});

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.SEARCH_BOUNDS_CHANGE:
      {
        const { center, zoom } = action;
        return state.update('mapInfo', mapInfo => mapInfo.merge({ center, zoom }))
          .set('infoBoxIndex', -1)
          .set('briefBoxIndex', -1);
      }
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
    case CONSTANTS.SET_SEARCHING:
      return state.set('searching', action.searching);
    case CONSTANTS.SET_FILTER:
      return state.setIn(['filters', action.filterName], fromJS(action.filter));
    case CONSTANTS.ES_PROPERTY_SEARCH_SUCCESS:
      return state.set('properties', fromJS(action.response.data));
    case CONSTANTS.ES_CITY_SEARCH_SUCCESS:
      return state.set('cities', fromJS(action.response.data));
    case CONSTANTS.ES_COMMUNITY_SEARCH_SUCCESS:
      return state.set('communities', fromJS(action.response.data));
    case CONSTANTS.ES_AGENT_SEARCH_SUCCESS:
      return state.set('agents', fromJS(action.response.data));
    case CONSTANTS.TOGGLE_SIDEBAR:
      return state.set('sidebar', typeof action.toggle === 'undefined' ? !state.get('sidebar') : action.toggle);
    case CONSTANTS.SET_LISTING_VIEW:
      return state.set('view', action.view);
    case CONSTANTS.SET_SORT:
      return sortReducer(state, action);
    default:
  }
  return state;
}

export default searchReducer;
