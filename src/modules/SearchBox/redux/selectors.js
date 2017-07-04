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

const selectSearching = createSelector(
  selectModule,
  (substate) => substate.get('searching')
);

export default {
  selectModule,
  selectFilters,
  selectProperties,
  selectSearching,
};
