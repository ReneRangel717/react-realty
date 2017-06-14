/* eslint-disable no-constant-condition */
import { take, put, call, fork, select } from 'redux-saga/effects';
import { api, history } from '../services';
import * as actions from '../actions';

/**
 **** Subroutines ****
 */

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass it to apiFn
function* fetchEntity(entity, apiFn, id, url) {
  yield put(entity.request(id));
  const { response, error } = yield call(apiFn, url || id);
  if (response) {
    yield put(entity.success(id, response));
  } else {
    yield put(entity.failure(id, error));
  }
}


/**
 ****************************** WATCHERS ***********************************
 **/

// trigger router navigation via history
function* watchNavigate() {
  while (true) {
    const { pathname } = yield take(actions.NAVIGATE);
    yield history.push(pathname);
  }
}

export default function* root() {
  yield [
    fork(watchNavigate)
  ];
}
