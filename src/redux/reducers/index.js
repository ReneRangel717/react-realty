import { combineReducers } from 'redux-immutable';

import propertySearchReducer from 'modules/PropertySearch/redux/reducers';
import propertyDetailReducer from 'modules/PropertyDetail/redux/reducers';
import communityDetailReducer from 'modules/CommunityDetail/redux/reducers';
import agentDetailReducer from 'modules/AgentDetail/redux/reducers';
import searchReducer from 'modules/Search/redux/reducers';
import routerReducer from './routerReducer';

const rootReducer = combineReducers({
  route: routerReducer,
  search: searchReducer,
  propertySearch: propertySearchReducer,
  communityDetail: communityDetailReducer,
  agentDetail: agentDetailReducer,
  propertyDetail: propertyDetailReducer
});

export default rootReducer;
