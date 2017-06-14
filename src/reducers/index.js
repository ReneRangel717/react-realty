import * as ActionTypes from '../actions';
import merge from 'lodash/merge';
import { combineReducers } from 'redux';

function router(state = { pathname: '/' }, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_ROUTER_STATE:
      return action.state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  router
});

export default rootReducer;
