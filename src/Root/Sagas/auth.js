import { all, call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../Actions/auth';
import { loginUserWithGoogle, logoutUser, getUserData, registerUser, login } from '../../content/api'
import {initialAuthState} from "../Reducers/auth";

const localStorage = window.localStorage;

// worker Saga: will be fired on POST_GOOGLE_USER_REQUEST actions
export function* postGoogleUser() {
    try {
        const data = yield call(loginUserWithGoogle);
        yield put({ type: types.POST_GOOGLE_USER_SUCCESS, user: data });
        window.location.reload();
    } catch (e) {
        yield put({ type: types.POST_GOOGLE_USER_FAILURE });
    }
}

export function* loginUser(action) {
  try {
    const data = yield call(login, action.data);
    yield put({ type: types.LOGIN_USER_SUCCESS, data: data });
  } catch (e) {
    yield put({ type: types.LOGIN_USER_FAILURE });
  }
}

export function* postUser(action) {
    try {
        const data = yield call(registerUser, action.data);
        yield put({ type: types.POST_USER_SUCCESS, data: data });
    } catch (e) {
        yield put({ type: types.POST_USER_FAILURE });
    }
}

// worker Saga: will be fired on POST_CACHED_USER_REQUEST actions
export function* postCachedUser() {
    try {
        const data = yield call(getUserData);
      localStorage.user = JSON.stringify(data);

      yield put({ type: types.POST_GOOGLE_USER_SUCCESS, user: data });
        //window.location.reload(); //temporary solution
    } catch (e) {
        yield put({ type: types.POST_GOOGLE_USER_FAILURE });
    }
}

export function* postLogoutUser() {
    try {
        yield call(logoutUser);
        yield put({ type: types.POST_GOOGLE_USER_SUCCESS, user: null });
    } catch (e) {
        yield put({ type: types.POST_GOOGLE_USER_FAILURE });
    }
}

export function* watchPostGoogleUser() {
    yield takeLatest(types.POST_GOOGLE_USER_REQUEST, postGoogleUser);
}


export function* watchLoginUser() {
    yield takeLatest(types.LOGIN_USER_REQUEST, loginUser);
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
      watchPostGoogleUser(),
      watchPostUser(),
      watchLoginUser(),
      watchPostCachedUser(),
      watchPostLogoutUser(),
  ]);
}
