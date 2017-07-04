import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initialState = fromJS({
  filters: {
    query: '',
    price: [],
    sqft: [],
    type: '',
    location: [26.4249029, -80.0655658, 26.3207559, -80.1710669],
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
  searching: false,
});

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.SET_SEARCHING:
      return state.set('searching', action.searching);
    case CONSTANTS.SET_FILTER:
      return state.setIn(['filters', action.filterName], fromJS(action.filter));
    case CONSTANTS.ES_PROPERTY_SEARCH_SUCCESS:
      return state.set('properties', fromJS(action.response.data));
    default:
  }
  return state;
}

export default searchReducer;
