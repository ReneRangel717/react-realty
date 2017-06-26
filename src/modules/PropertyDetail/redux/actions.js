import * as CONSTANTS from './constants';

export function loadPropertyDetailRequest() {
  return {
    type: CONSTANTS.LOAD_PROPERTY_DETAIL_REQUEST
  };
}

export function loadPropertyDetailSuccess(property) {
  return {
    type: CONSTANTS.LOAD_PROPERTY_DETAIL_SUCCESS,
    property
  };
}

// @TODO manipulate various error types
export function loadPropertyDetailError(error) {
  return {
    type: CONSTANTS.LOAD_PROPERTY_DETAIL_ERROR,
    error
  };
}

export default {
  loadPropertyDetailRequest,
  loadPropertyDetailSuccess,
  loadPropertyDetailError
};
