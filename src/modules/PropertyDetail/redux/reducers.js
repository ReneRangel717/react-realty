import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initialState = fromJS({
  propertyInfo: {},
  loading: false,
  slug: '' // this contains slug including city
});

function propertyDetailReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.LOAD_PROPERTY_DETAIL_REQUEST:
      return state.set('loading', true);
    case CONSTANTS.LOAD_PROPERTY_DETAIL_SUCCESS:
      return state.set('propertyInfo', fromJS(action.property.property));
    case CONSTANTS.SET_SLUG:
      return state.set('slug', action.slug);
    case CONSTANTS.SET_LOADING:
      return state.set('loading', action.loading);
    default:
  }
  return state;
}

export default propertyDetailReducer;
