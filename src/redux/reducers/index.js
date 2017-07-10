import { combineReducers } from 'redux-immutable';

import propertySearchReducer from 'modules/PropertySearch/redux/reducers';
import propertyDetailReducer from 'modules/PropertyDetail/redux/reducers';
import communityDetailReducer from 'modules/CommunityDetail/redux/reducers';
import searchReducer from 'modules/Search/redux/reducers';
import routerReducer from './routerReducer';

const rootReducer = combineReducers({
  route: routerReducer,
  search: searchReducer,
  communityDetail: communityDetailReducer,
  propertySearch: propertySearchReducer,
  propertyDetail: propertyDetailReducer
});

export default rootReducer;
