import * as CONSTANTS from '../constants';

// property search
export function esPropertySearchRequest() {
  return {
    type: CONSTANTS.ES_PROPERTY_SEARCH_REQUEST
  };
}

export function esPropertySearchSuccess(data) {
  return {
    type: CONSTANTS.ES_PROPERTY_SEARCH_SUCCESS,
    ...data
  };
}

export function esPropertySearchError(error) {
  return {
    type: CONSTANTS.ES_PROPERTY_SEARCH_ERROR,
    error
  };
}

// city search
export function esCitySearchRequest() {
  return {
    type: CONSTANTS.ES_CITY_SEARCH_REQUEST
  };
}

export function esCitySearchSuccess(data) {
  return {
    type: CONSTANTS.ES_CITY_SEARCH_SUCCESS,
    ...data
  };
}

export function esCitySearchError(error) {
  return {
    type: CONSTANTS.ES_CITY_SEARCH_ERROR,
    error
  };
}

// agent search
export function esAgentSearchRequest() {
  return {
    type: CONSTANTS.ES_AGENT_SEARCH_REQUEST
  };
}

export function esAgentSearchSuccess(data) {
  return {
    type: CONSTANTS.ES_AGENT_SEARCH_SUCCESS,
    ...data
  };
}

export function esAgentSearchError(error) {
  return {
    type: CONSTANTS.ES_AGENT_SEARCH_ERROR,
    error
  };
}

// agent search
export function esCommunitySearchRequest() {
  return {
    type: CONSTANTS.ES_COMMUNITY_SEARCH_REQUEST
  };
}

export function esCommunitySearchSuccess(data) {
  return {
    type: CONSTANTS.ES_COMMUNITY_SEARCH_SUCCESS,
    ...data
  };
}

export function esCommunitySearchError(error) {
  return {
    type: CONSTANTS.ES_COMMUNITY_SEARCH_ERROR,
    error
  };
}

export default {
  esPropertySearchRequest,
  esPropertySearchSuccess,
  esPropertySearchError,
  esCitySearchRequest,
  esCitySearchSuccess,
  esCitySearchError,
  esCommunitySearchRequest,
  esCommunitySearchSuccess,
  esCommunitySearchError,
  esAgentSearchRequest,
  esAgentSearchSuccess,
  esAgentSearchError
};
