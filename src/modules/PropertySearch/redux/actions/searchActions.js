import * as CONSTANTS from '../constants';

export function propertySearchRequest() {
  return {
    type: CONSTANTS.PROPERTY_SEARCH_REQUEST
  };
}

export function propertySearchSuccess(data) {
  console.log(data);
  return {
    type: CONSTANTS.PROPERTY_SEARCH_SUCCESS,
    ...data
  };
}

// @TODO manipulate various error types
export function propertySearchError(error) {
  return {
    type: CONSTANTS.PROPERTY_SEARCH_ERROR,
    error
  };
}

export default {
  propertySearchRequest,
  propertySearchSuccess,
  propertySearchError
};
