import { createSelector } from 'reselect';
import { calcFilteredAndSortedMarkers } from 'modules/PropertySearch/utils';

const selectModule = (state) => state.get('propertySearch');

const selectMapInfo = createSelector(
  selectModule,
  (substate) => substate.get('mapInfo')
);

const selectMarkers = createSelector(
  selectModule,
  (substate) => substate.get('markers')
);

const selectFilteredMarkers = createSelector(
  selectMapInfo,
  selectMarkers,
  (mapInfo, markers) => calcFilteredAndSortedMarkers(markers, mapInfo)
);

export default {
  selectModule,
  selectMapInfo,
  selectMarkers,
  selectFilteredMarkers
};
