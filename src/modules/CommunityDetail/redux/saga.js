import { takeEvery } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';

// local dependencies
import { api } from 'services';
import actions from './actions';
import selectors from './selectors';
import {
  LOAD_COMMUNITY_DETAIL_REQUEST,
} from './constants';

export function* loadCommunityDetailRequest({ slug }) {
  try {
    const state = yield select();
    const currentSlug = selectors.selectSlug(state);

    if (currentSlug !== slug) {
      const data = yield call(api.callMongoAPI.bind(null, 'community', { slug }));
      yield put(actions.loadCommunityDetailSuccess(data.response));
      yield put(actions.setSlug(slug));
    }
  } catch (e) {
    yield put(actions.loadCommunityDetailError(e));
  }
  yield put(actions.setLoading(false));
}

export default [
  fork(takeEvery, LOAD_COMMUNITY_DETAIL_REQUEST, loadCommunityDetailRequest),
];
