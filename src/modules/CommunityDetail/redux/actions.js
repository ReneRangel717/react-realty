import * as CONSTANTS from './constants';

export function loadCommunityDetailRequest(slug) {
  return {
    type: CONSTANTS.LOAD_COMMUNITY_DETAIL_REQUEST,
    slug
  };
}

export function loadCommunityDetailSuccess(community) {
  return {
    type: CONSTANTS.LOAD_COMMUNITY_DETAIL_SUCCESS,
    community
  };
}

export function loadCommunityDetailError(error) {
  return {
    type: CONSTANTS.LOAD_COMMUNITY_DETAIL_ERROR,
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
  loadCommunityDetailRequest,
  loadCommunityDetailSuccess,
  loadCommunityDetailError,
  setSlug,
  setLoading
};
