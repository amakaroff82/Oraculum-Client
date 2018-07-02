import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actions';
import {
    requestPages,
    requestAllPages,
    requestTags
} from './services/api';

// worker Saga: will be fired on FETCH_PAGES_REQUEST actions
export function* fetchPages(action) {
  try {
    const response = yield call(requestPages, action.userId);

    // Initial data sort by last modified date.
    const sortedPages = yield response.data.sort((a, b) => {
      return new Date(b.dateLastModified) - new Date(a.dateLastModified);
    });

    yield put({
      type: actionTypes.FETCH_PAGES_SUCCESS,
      pages: sortedPages,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_PAGES_FAILURE,
      error: error,
    });
  }
}

// worker Saga: will be fired on FETCH_ALL_PAGES_REQUEST actions
export function* fetchAllPages(action) {
  try {
    const response = yield call(requestAllPages);

    // Initial data sort by last modified date.
    const sortedPages = yield response.data.sort((a, b) => {
      return new Date(b.dateLastModified) - new Date(a.dateLastModified);
    });

    yield put({
      type: actionTypes.FETCH_PAGES_SUCCESS,
      pages: sortedPages,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_PAGES_FAILURE,
      error: error,
    });
  }
}

export function* fetchTags(action) {
  try {
    const response = yield call(requestTags);

    yield put({
      type: actionTypes.FETCH_TAGS_SUCCESS,
      tags: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_TAGS_FAILURE,
      error: error,
    });
  }
}

export function* watchFetchPages() {
  yield takeLatest(actionTypes.FETCH_PAGES_REQUEST, fetchPages);
}

export function* watchFetchAllPages() {
  yield takeLatest(actionTypes.FETCH_ALL_PAGES_REQUEST, fetchAllPages);
}

export function* watchFetchTags() {
  yield takeLatest(actionTypes.FETCH_TAGS_REQUEST, fetchTags);
}


export default function* rootSaga() {
    yield all([
      watchFetchPages(),
      watchFetchAllPages(),
      watchFetchTags(),
    ]);
}
