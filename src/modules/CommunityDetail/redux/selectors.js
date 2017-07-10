import { createSelector } from 'reselect';

const selectModule = (state) => state.get('communityDetail');

const selectCommunityInfo = createSelector(
  selectModule,
  (substate) => substate.get('communityInfo')
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
  selectCommunityInfo,
  selectSlug,
  selectLoading,
  selectPath
};
