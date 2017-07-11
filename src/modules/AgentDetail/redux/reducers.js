import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initialState = fromJS({
  agentInfo: {},
  loading: false,
  username: ''
});

function agentDetailReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.LOAD_AGENT_DETAIL_REQUEST:
      return state.set('loading', true);
    case CONSTANTS.LOAD_AGENT_DETAIL_SUCCESS:
      return state.set('agentInfo', fromJS(action.agent.agent));
    case CONSTANTS.SET_USERNAME:
      return state.set('username', action.username);
    case CONSTANTS.SET_LOADING:
      return state.set('loading', action.loading);
    default:
  }
  return state;
}

export default agentDetailReducer;
