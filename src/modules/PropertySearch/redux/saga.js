import { takeEvery } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';

// local dependencies
import { api } from 'services';
import { makeESParams } from 'utils';
import * as apiConstants from 'constants/api';

import actions from './actions';
import { PROPERTY_SEARCH_REQUEST } from './constants';

// @TODO select filter from redux store
export function* propertySearchRequest(postBody) {
  const payload = {
    method: 'GET',
    body: makeESParams(postBody)
  };
  const url = apiConstants.SEARCH_API_PATH;
  try {
    const data = yield call(api.fetchProperties.bind(null, url, payload));
    yield put(actions.propertySearchSuccess(data));
  } catch (e) {
    yield put(actions.propertySearchError(e));
  }
}

export default [
  fork(takeEvery, PROPERTY_SEARCH_REQUEST, propertySearchRequest),
];
