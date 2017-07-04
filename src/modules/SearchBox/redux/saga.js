import { takeEvery } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import _ from 'lodash';

// local dependencies
import { api } from 'services';
import { makeESParams } from 'utils';

import { selectFilters } from './selectors';
import actions from './actions';
import {
  SET_FILTER,
} from './constants';

export function* esPropertySearchRequest() {
  const state = yield select();
  const filterImmutable = selectFilters(state);
  const filters = Object.assign({}, _.omit(filterImmutable.toJS(), 'query'), {
    address: filterImmutable.get('query')
  });
  const esReq = makeESParams(filters);
  yield put(actions.setSearching(true));
  try {
    const data = yield call(api.fetchProperties.bind(null, esReq.apiPath, esReq.payload));
    yield put(actions.esPropertySearchSuccess(data));
  } catch (e) {
    yield put(actions.esPropertySearchError(e));
  }
  yield put(actions.setSearching(false));
}

export default [
  fork(takeEvery, SET_FILTER, esPropertySearchRequest),
];
