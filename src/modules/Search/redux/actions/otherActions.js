import * as CONSTANTS from '../constants';

export function setSearching(searching) {
  return {
    type: CONSTANTS.SET_SEARCHING,
    searching
  };
}

export function setFilter(filterName, filter, silent = false) {
  return {
    type: CONSTANTS.SET_FILTER,
    filterName,
    filter,
    silent
  };
}

export function toggleSidebar(toggle) {
  return {
    type: CONSTANTS.TOGGLE_SIDEBAR,
    toggle
  };
}

export function setSort(sortValue) {
  return {
    type: CONSTANTS.SET_SORT,
    sortValue
  };
}

export function setListingView(view) {
  return {
    type: CONSTANTS.SET_LISTING_VIEW,
    view
  };
}

export default {
  setSearching,
  setFilter,
  toggleSidebar,
  setSort,
  setListingView
};
