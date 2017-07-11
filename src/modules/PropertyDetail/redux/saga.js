import { takeEvery } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';

// local dependencies
import { api } from 'services';
import actions from './actions';
import selectors from './selectors';
import {
  LOAD_PROPERTY_DETAIL_REQUEST,
} from './constants';

export function* loadPropertyDetailRequest({ slug }) {
  try {
    const state = yield select();
    const currentSlug = selectors.selectSlug(state);

    if (currentSlug !== slug) {
      const data = yield call(api.callMongoAPI.bind(null, 'property', { slug }));
      yield put(actions.loadPropertyDetailSuccess(data.response));
      yield put(actions.setSlug(slug));
    }
  } catch (e) {
    yield put(actions.loadPropertyDetailError(e));
  }
  yield put(actions.setLoading(false));
}

export default [
  fork(takeEvery, LOAD_PROPERTY_DETAIL_REQUEST, loadPropertyDetailRequest),
];
