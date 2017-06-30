import * as CONSTANTS from './constants';

export function loadPropertyDetailRequest(slug) {
  return {
    type: CONSTANTS.LOAD_PROPERTY_DETAIL_REQUEST,
    slug
  };
}

export function loadPropertyDetailSuccess(property) {
  return {
    type: CONSTANTS.LOAD_PROPERTY_DETAIL_SUCCESS,
    property
  };
}

export function loadPropertyDetailError(error) {
  return {
    type: CONSTANTS.LOAD_PROPERTY_DETAIL_ERROR,
    error
  };
}

export function setSlug(slug) {
  return {
    type: CONSTANTS.SET_SLUG,
    slug
  };
}

export function setLoading(loading) {
  return {
    type: CONSTANTS.SET_LOADING,
    loading
  };
}

export default {
  loadPropertyDetailRequest,
  loadPropertyDetailSuccess,
  loadPropertyDetailError,
  setSlug,
  setLoading
};
