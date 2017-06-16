import { createSelector } from 'reselect';

const selectModule = () => (state) => state.get('propertySearch');

const selectMapInfo = createSelector(
  selectModule(),
  (substate) => substate.get('mapInfo')
);

export default {
  selectMapInfo
};
