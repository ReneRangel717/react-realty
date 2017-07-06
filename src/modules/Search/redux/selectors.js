import { createSelector } from 'reselect';

const selectModule = (state) => state.get('search');

const selectFilters = createSelector(
  selectModule,
  (substate) => substate.get('filters')
);

const selectProperties = createSelector(
  selectModule,
  (substate) => substate.get('properties')
);

const selectCities = createSelector(
  selectModule,
  (substate) => substate.get('cities')
);

const selectCommunities = createSelector(
  selectModule,
  (substate) => substate.get('communities')
);

const selectSearching = createSelector(
  selectModule,
  (substate) => substate.get('searching')
);

const selectMapInfo = createSelector(
  selectModule,
  (substate) => substate.get('mapInfo')
);

const selectPath = (state) => state.get('route').get('locationBeforeTransitions').pathname;

export default {
  selectModule,
  selectFilters,
  selectProperties,
  selectCities,
  selectCommunities,
  selectSearching,
  selectMapInfo,
  selectPath
};
