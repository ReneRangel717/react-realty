import * as CONSTANTS from './constants';

export function loadAgentDetailRequest(username) {
  return {
    type: CONSTANTS.LOAD_AGENT_DETAIL_REQUEST,
    username
  };
}

export function loadAgentDetailSuccess(agent) {
  return {
    type: CONSTANTS.LOAD_AGENT_DETAIL_SUCCESS,
    agent
  };
}

export function loadAgentDetailError(error) {
  return {
    type: CONSTANTS.LOAD_AGENT_DETAIL_ERROR,
    error
  };
}

export function setUsername(username) {
  return {
    type: CONSTANTS.SET_USERNAME,
    username
  };
}

export function setLoading(loading) {
  return {
    type: CONSTANTS.SET_LOADING,
    loading
  };
}

export default {
  loadAgentDetailRequest,
  loadAgentDetailSuccess,
  loadAgentDetailError,
  setUsername,
  setLoading
};
