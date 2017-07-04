import { combineReducers } from 'redux-immutable';

import propertySearchReducer from 'modules/PropertySearch/redux/reducers';
import propertyDetailReducer from 'modules/PropertyDetail/redux/reducers';
import searchReducer from 'modules/SearchBox/redux/reducers';
import routerReducer from './routerReducer';

const rootReducer = combineReducers({
  route: routerReducer,
  search: searchReducer,
  propertySearch: propertySearchReducer,
  propertyDetail: propertyDetailReducer
});

export default rootReducer;
