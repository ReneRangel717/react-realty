// selectLocationState expects a plain JS object for the routing state
const selectLocationState = (state) => state.get('route').toJS();

export {
  selectLocationState,
};
