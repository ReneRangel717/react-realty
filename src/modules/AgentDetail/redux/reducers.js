import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initialState = fromJS({
  agentInfo: {},
  reviews: [],
  loading: false,
  username: ''
});

function agentDetailReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.LOAD_AGENT_DETAIL_REQUEST:
    case CONSTANTS.LOAD_AGENT_REVIEWS_REQUEST:
      return state.set('loading', true);
    case CONSTANTS.LOAD_AGENT_DETAIL_SUCCESS:
      return state.set('agentInfo', fromJS(action.agent.agent));
    case CONSTANTS.LOAD_AGENT_REVIEWS_SUCCESS:
      return state.set('reviews', fromJS(action.reviews.reviews));
    case CONSTANTS.SET_USERNAME:
      return state.set('username', action.username);
    case CONSTANTS.SET_LOADING:
      return state.set('loading', action.loading);
    default:
  }
  return state;
}

export default agentDetailReducer;
