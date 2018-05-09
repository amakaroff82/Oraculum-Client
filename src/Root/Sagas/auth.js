import { all, call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../Actions/auth';
import { loginUser, logoutUser, getUserData } from '../../content/api'

// worker Saga: will be fired on POST_USER_REQUEST actions
export function* postUser() {
    try {
        const data = yield call(loginUser);
        yield put({ type: types.POST_USER_SUCCESS, user: data });
        window.location.reload();
    } catch (e) {
        yield put({ type: types.POST_USER_FAILURE });
    }
}

// worker Saga: will be fired on POST_CACHED_USER_REQUEST actions
export function* postCachedUser() {
    try {
        const data = yield call(getUserData);
        yield put({ type: types.POST_USER_SUCCESS, user: data });
        //window.location.reload(); //temporary solution
    } catch (e) {
        yield put({ type: types.POST_USER_FAILURE });
    }
}

export function* postLogoutUser() {
    try {
        yield call(logoutUser);
        yield put({ type: types.POST_USER_SUCCESS, user: null });
    } catch (e) {
        yield put({ type: types.POST_USER_FAILURE });
    }
}

export function* watchPostUser() {
    yield takeLatest(types.POST_USER_REQUEST, postUser);
}

export function* watchPostLogoutUser() {
    yield takeLatest(types.POST_LOGOUT_USER_REQUEST, postLogoutUser);
}

export function* watchPostCachedUser() {
    yield takeLatest(types.POST_CACHED_USER_REQUEST, postCachedUser);
}

export default function* rootSaga() {
  yield all([
      watchPostUser(),
      watchPostCachedUser(),
      watchPostLogoutUser(),
  ]);
}
