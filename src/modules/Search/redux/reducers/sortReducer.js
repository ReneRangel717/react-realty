import { fromJS } from 'immutable';

export default function sortReducer(state, action) {
  const properties = state.get('properties');
  const newProperties = properties.sortBy(
    (property) => (property.get(action.sortValue[0])),
    (a, b) => {
      if (action.sortValue[1] === 'ascending') {
        if (a < b) { return -1; }
        if (a > b) { return 1; }
      } else {
        if (a > b) { return -1; }
        if (a < b) { return 1; }
      }
      return 0;
    }
  );
  return state.set('properties', newProperties).set('sort', fromJS(action.sortValue));
}
