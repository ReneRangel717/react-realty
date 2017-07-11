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

export function loadAgentReviewsRequest(username) {
  return {
    type: CONSTANTS.LOAD_AGENT_REVIEWS_REQUEST,
    username
  };
}

export function loadAgentReviewsSuccess(reviews) {
  return {
    type: CONSTANTS.LOAD_AGENT_REVIEWS_SUCCESS,
    reviews
  };
}

export function loadAgentReviewsError(error) {
  return {
    type: CONSTANTS.LOAD_AGENT_REVIEWS_ERROR,
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
  loadAgentReviewsRequest,
  loadAgentReviewsSuccess,
  loadAgentReviewsError,
  setUsername,
  setLoading
};
