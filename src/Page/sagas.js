import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actions';
import { requestPage } from './services/api';

export function* fetchPage(action) {
  try {
    const response = yield call(requestPage, action.pageId);

    yield put({
      type: actionTypes.FETCH_PAGE_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_PAGE_FAILURE,
      error: error,
    });
  }
}

export function* watchFetchPage() {
  yield takeLatest(actionTypes.FETCH_PAGE_REQUEST, fetchPage);
}

export default function* rootSaga() {
  yield all([
    watchFetchPage(),
  ]);
}
