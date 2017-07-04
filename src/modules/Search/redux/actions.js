import * as CONSTANTS from './constants';

// @TODO implement community, city search
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

export function setSearching(searching) {
  return {
    type: CONSTANTS.SET_SEARCHING,
    searching
  };
}

export function setFilter(filterName, filter) {
  return {
    type: CONSTANTS.SET_FILTER,
    filterName,
    filter
  };
}


export default {
  esPropertySearchRequest,
  esPropertySearchSuccess,
  esPropertySearchError,
  setSearching,
  setFilter
};
