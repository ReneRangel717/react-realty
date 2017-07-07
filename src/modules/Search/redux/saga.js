import { takeEvery } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import _ from 'lodash';
import { push } from 'react-router-redux';
import { fitBounds } from 'google-map-react/utils';

// local dependencies
import { api } from 'services';
import { makeESParams, makeUrlSearch, getMapSize } from 'utils';
import { selectFilters, selectPath } from './selectors';
import actions from './actions';
import {
  CITY_RESULT_LIMIT,
  COMMUNITY_RESULT_LIMIT,
  AGENT_RESULT_LIMIT
} from 'constants/api';
import {
  SET_FILTER,
  ES_CITY_SEARCH_REQUEST,
  ES_COMMUNITY_SEARCH_REQUEST,
  ES_AGENT_SEARCH_REQUEST,
  GOOGLE_PLACE_CITY_SEARCH_REQUEST,
  GOOGLE_PLACE_COMMUNITY_SEARCH_REQUEST
} from './constants';

// property search
export function* esPropertySearchRequest(params) {
  if (params && params.silent) {
    return;
  }

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

// city search
export function* esCitySearchRequest() {
  const state = yield select();
  const filterImmutable = selectFilters(state);
  const query = filterImmutable.toJS().query;
  const esReq = makeESParams('cities/_search', {
    city: query
  }, CITY_RESULT_LIMIT);
  yield put(actions.setSearching(true));
  try {
    const data = yield call(api.fetchESResult.bind(null, esReq.apiPath, esReq.payload));
    yield put(actions.esCitySearchSuccess(data));
  } catch (e) {
    yield put(actions.esCitySearchError(e));
  }
  yield put(actions.setSearching(false));
}

// community search
export function* esCommunitySearchRequest() {
  const state = yield select();
  const filterImmutable = selectFilters(state);
  const query = filterImmutable.toJS().query;
  const esReq = makeESParams('communities/_search', {
    community: query
  }, COMMUNITY_RESULT_LIMIT);
  yield put(actions.setSearching(true));
  try {
    const data = yield call(api.fetchESResult.bind(null, esReq.apiPath, esReq.payload));
    yield put(actions.esCommunitySearchSuccess(data));
  } catch (e) {
    yield put(actions.esCommunitySearchError(e));
  }
  yield put(actions.setSearching(false));
}

// agent search
export function* esAgentSearchRequest() {
  const state = yield select();
  const filterImmutable = selectFilters(state);
  const query = filterImmutable.toJS().query;
  const esReq = makeESParams('agents/_search', {
    name: query
  }, AGENT_RESULT_LIMIT);
  yield put(actions.setSearching(true));
  try {
    const data = yield call(api.fetchESResult.bind(null, esReq.apiPath, esReq.payload));
    yield put(actions.esAgentSearchSuccess(data));
  } catch (e) {
    yield put(actions.esAgentSearchError(e));
  }
  yield put(actions.setSearching(false));
}

function getMapInfo(googleMapResponse) {
  const size = getMapSize();

  if (!googleMapResponse || !googleMapResponse.geometry) {
    throw new Error('Geometry is missing from google place API result');
  }

  const bounds = {
    ne: googleMapResponse.geometry.viewport.northeast,
    sw: googleMapResponse.geometry.viewport.southwest
  };

  return fitBounds(bounds, size);
}

// place search for city
export function* googlePlaceCitySearchRequest(params) {
  yield put(actions.setSearching(true));
  try {
    const data = yield call(api.callGooglePlaceAPI.bind(null, `${params.city} USA`));
    const { center, zoom } = getMapInfo(data.response);
    yield put(actions.mapBoundsChange({ center, zoom }));
  } catch (e) {
    yield put(actions.googlePlaceSearchError(e));
  }
  yield put(actions.setSearching(false));
}

// place search for community
export function* googlePlaceCommunitySearchRequest(params) {
  yield put(actions.setSearching(true));
  try {
    const data = yield call(api.callGooglePlaceAPI.bind(null, `${params.community} ${params.address} USA`));
    if (data.response.geometry) {
      const { center, zoom } = getMapInfo(data.response);
      yield put(actions.mapBoundsChange({ center, zoom }));
    } else {
      // if location not found, use city as fallback
      yield* googlePlaceCitySearchRequest({ city: params.address });
    }
  } catch (e) {
    yield put(actions.googlePlaceSearchError(e));
  }
  yield put(actions.setSearching(false));
}

export default [
  fork(takeEvery, SET_FILTER, esPropertySearchRequest),
  fork(takeEvery, ES_CITY_SEARCH_REQUEST, esCitySearchRequest),
  fork(takeEvery, ES_COMMUNITY_SEARCH_REQUEST, esCommunitySearchRequest),
  fork(takeEvery, ES_AGENT_SEARCH_REQUEST, esAgentSearchRequest),
  fork(takeEvery, GOOGLE_PLACE_CITY_SEARCH_REQUEST, googlePlaceCitySearchRequest),
  fork(takeEvery, GOOGLE_PLACE_COMMUNITY_SEARCH_REQUEST, googlePlaceCommunitySearchRequest)
];
