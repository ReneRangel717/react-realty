import { combineReducers } from 'redux-immutable';

import propertySearchReducer from 'modules/PropertySearch/redux/reducers';
import routerReducer from './routerReducer';

const rootReducer = combineReducers({
  route: routerReducer,
  propertySearch: propertySearchReducer
});

export default rootReducer;
