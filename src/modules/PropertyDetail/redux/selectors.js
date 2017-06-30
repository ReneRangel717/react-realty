import { createSelector } from 'reselect';

const selectModule = (state) => state.get('propertyDetail');

const selectPropertyInfo = createSelector(
  selectModule,
  (substate) => substate.get('propertyInfo')
);

const selectSlug = createSelector(
  selectModule,
  (substate) => substate.get('slug')
);

const selectLoading = createSelector(
  selectModule,
  (substate) => substate.get('loading')
);

const selectPath = (state) => state.get('route.locationBeforeTransitions.pathname');

export default {
  selectModule,
  selectPropertyInfo,
  selectSlug,
  selectLoading,
  selectPath
};
