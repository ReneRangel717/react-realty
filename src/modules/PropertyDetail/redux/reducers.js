import { fromJS } from 'immutable';
import * as CONSTANTS from '../constants';

const initialState = fromJS({
  propertyInfo: null,
  slug: '',
  city: 'Boca Raton'
});

function propertyDetailReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.PROPERTY_SEARCH_SUCCESS:
      return state.set('propertyInfo', fromJS(action.property));
    default:
  }
  return state;
}

export default propertyDetailReducer;
