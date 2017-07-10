import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initialState = fromJS({
  communityInfo: {},
  loading: false,
  slug: '' // this contains slug including city
});

function communityDetailReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.LOAD_COMMUNITY_DETAIL_REQUEST:
      return state.set('loading', true);
    case CONSTANTS.LOAD_COMMUNITY_DETAIL_SUCCESS:
      return state.set('communityInfo', fromJS(action.community.community));
    case CONSTANTS.SET_SLUG:
      return state.set('slug', action.slug);
    case CONSTANTS.SET_LOADING:
      return state.set('loading', action.loading);
    default:
  }
  return state;
}

export default communityDetailReducer;
