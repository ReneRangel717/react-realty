import * as CONSTANTS from '../constants';

export function googlePlaceSearchRequest(place) {
  return {
    type: CONSTANTS.GOOGLE_PLACE_SEARCH_REQUEST,
    place
  };
}

export function googlePlaceSearchSuccess(data) {
  console.log(data);
  return {
    type: CONSTANTS.GOOGLE_PLACE_SEARCH_SUCCESS,
    ...data
  };
}

export function googlePlaceSearchError(error) {
  return {
    type: CONSTANTS.GOOGLE_PLACE_SEARCH_ERROR,
    error
  };
}

export default {
  googlePlaceSearchRequest,
  googlePlaceSearchSuccess,
  googlePlaceSearchError
};
