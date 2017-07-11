import { takeEvery } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';

// local dependencies
import { api } from 'services';
import actions from './actions';
import selectors from './selectors';
import {
  LOAD_AGENT_DETAIL_REQUEST,
} from './constants';

export function* loadAgentDetailRequest({ username }) {
  try {
    const state = yield select();
    const currentUsername = selectors.selectUsername(state);
    if (currentUsername !== username) {
      const data = yield call(api.callMongoAPI.bind(null, `agent/${username}`));
      yield put(actions.loadAgentDetailSuccess(data.response));
      yield put(actions.setUsername(username));
    }
  } catch (e) {
    yield put(actions.loadAgentDetailError(e));
  }
  yield put(actions.setLoading(false));
}

export default [
  fork(takeEvery, LOAD_AGENT_DETAIL_REQUEST, loadAgentDetailRequest),
];
