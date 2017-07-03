import { takeEvery } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';

// local dependencies
import { api } from 'services';
import { makeESParams } from 'utils';

import { selectMapInfo } from './selectors';
import actions from './actions';
import {
  PROPERTY_SEARCH_REQUEST,
  GOOGLE_PLACE_SEARCH_REQUEST,
  SEARCH_MAP_BOUNDS_CHANGE
} from './constants';

export function* propertySearchRequest() {
  const state = yield select();
  const mapInfo = selectMapInfo(state);
  const esReq = makeESParams({ location: mapInfo.toJS().bounds });
  try {
    const data = yield call(api.fetchProperties.bind(null, esReq.apiPath, esReq.payload));
    yield put(actions.propertySearchSuccess(data));
  } catch (e) {
    yield put(actions.propertySearchError(e));
  }
}

export function* googlePlaceSearchRequest(params) {
  try {
    const data = yield call(api.callGooglePlaceAPI.bind(null, params.place));
    yield put(actions.googlePlaceSearchSuccess(data));
  } catch (e) {
    yield put(actions.googlePlaceSearchError(e));
  }
}

export default [
  fork(takeEvery, SEARCH_MAP_BOUNDS_CHANGE, propertySearchRequest),
  fork(takeEvery, PROPERTY_SEARCH_REQUEST, propertySearchRequest),
  fork(takeEvery, GOOGLE_PLACE_SEARCH_REQUEST, googlePlaceSearchRequest),
];
