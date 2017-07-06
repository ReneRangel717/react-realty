import * as CONSTANTS from '../constants';

export function googlePlaceCitySearchRequest(city) {
  return {
    type: CONSTANTS.GOOGLE_PLACE_CITY_SEARCH_REQUEST,
    city
  };
}

export function googlePlaceCommunitySearchRequest(community, address) {
  return {
    type: CONSTANTS.GOOGLE_PLACE_COMMUNITY_SEARCH_REQUEST,
    community,
    address
  };
}

export function googlePlaceSearchError(error) {
  return {
    type: CONSTANTS.GOOGLE_PLACE_SEARCH_ERROR,
    error
  };
}

export default {
  googlePlaceCitySearchRequest,
  googlePlaceCommunitySearchRequest,
  googlePlaceSearchError
};
