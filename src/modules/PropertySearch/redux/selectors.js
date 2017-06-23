import { createSelector } from 'reselect';

const selectModule = (state) => state.get('propertySearch');

const selectMapInfo = createSelector(
  selectModule,
  (substate) => substate.get('mapInfo')
);

const selectMarkers = createSelector(
  selectModule,
  (substate) => substate.get('markers')
);

// use selectFilteredMarkers as alias for now
const selectFilteredMarkers = selectMarkers;

export default {
  selectModule,
  selectMapInfo,
  selectMarkers,
  selectFilteredMarkers
};
