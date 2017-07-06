import { takeEvery } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import _ from 'lodash';
import { push } from 'react-router-redux';

// local dependencies
import { api } from 'services';
import { makeESParams, makeUrlSearch } from 'utils';

import { selectFilters, selectPath } from './selectors';
import actions from './actions';
import {
  CITY_RESULT_LIMIT,
  COMMUNITY_RESULT_LIMIT
} from 'constants/api';
import {
  SET_FILTER,
  ES_CITY_SEARCH_REQUEST,
  ES_COMMUNITY_SEARCH_REQUEST
} from './constants';

export function* esPropertySearchRequest() {
  const state = yield select();
  const filterImmutable = selectFilters(state);
  const filters = Object.assign({}, _.omit(filterImmutable.toJS(), 'query'), {
    address: filterImmutable.get('query')
  });
  const path = yield selectPath(state);
  if (path === '/home') {
    yield put(push(`${path}?${makeUrlSearch(filterImmutable.toJS())}`));
  }

  const esReq = makeESParams('properties/_search', filters);
  yield put(actions.setSearching(true));
  try {
    const data = yield call(api.fetchESResult.bind(null, esReq.apiPath, esReq.payload));
    yield put(actions.esPropertySearchSuccess(data));
  } catch (e) {
    yield put(actions.esPropertySearchError(e));
  }
  yield put(actions.setSearching(false));
}

export function* esCitySearchRequest() {
  const state = yield select();
  const filterImmutable = selectFilters(state);
  const query = filterImmutable.toJS().query;
  const esReq = makeESParams('cities/_search', {
    city: query
  });
  yield put(actions.setSearching(true));
  try {
    const data = yield call(api.fetchESResult.bind(null, esReq.apiPath, esReq.payload, CITY_RESULT_LIMIT));
    yield put(actions.esCitySearchSuccess(data));
  } catch (e) {
    yield put(actions.esCitySearchError(e));
  }
  yield put(actions.setSearching(false));
}

export function* esCommunitySearchRequest() {
  const state = yield select();
  const filterImmutable = selectFilters(state);
  const query = filterImmutable.toJS().query;
  const esReq = makeESParams('communities/_search', {
    community: query
  });
  yield put(actions.setSearching(true));
  try {
    const data = yield call(api.fetchESResult.bind(null, esReq.apiPath, esReq.payload, COMMUNITY_RESULT_LIMIT));
    yield put(actions.esCommunitySearchSuccess(data));
  } catch (e) {
    yield put(actions.esCommunitySearchError(e));
  }
  yield put(actions.setSearching(false));
}

export default [
  fork(takeEvery, SET_FILTER, esPropertySearchRequest),
  fork(takeEvery, ES_CITY_SEARCH_REQUEST, esCitySearchRequest),
  fork(takeEvery, ES_COMMUNITY_SEARCH_REQUEST, esCommunitySearchRequest)
];
