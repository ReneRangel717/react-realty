import { createSelector } from 'reselect';

const selectModule = (state) => state.get('agentDetail');

const selectAgentInfo = createSelector(
  selectModule,
  (substate) => substate.get('agentInfo')
);

const selectUsername = createSelector(
  selectModule,
  (substate) => substate.get('username')
);

const selectLoading = createSelector(
  selectModule,
  (substate) => substate.get('loading')
);

export default {
  selectModule,
  selectAgentInfo,
  selectUsername,
  selectLoading
};
