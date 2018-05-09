import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actions';
import {
    requestPages,
} from './services/api';

// TODO: OCEMCM-280 -- Import named action creators to use with put calls


// worker Saga: will be fired on FETCH_PAGES_REQUEST actions
export function* fetchPages(action) {
    try {
        const data = yield call(requestPages, window.App.user.id);

        // Initial data sort by last modified date.
        const sortedData = yield data.sort((a, b) => {
            return new Date(b.dateLastModified) - new Date(a.dateLastModified);
        });

        yield put({
            type: actionTypes.FETCH_PAGES_SUCCESS,
            pages: sortedData,
        });
    } catch (error) {
        yield put({
            type: actionTypes.FETCH_PAGES_FAILURE,
            error: error,
        });
    }
}

export function* watchFetchPages() {
    yield takeLatest(actionTypes.FETCH_PAGES_REQUEST, fetchPages);
}




export default function* rootSaga() {
    yield all([
        watchFetchPages(),
    ]);
}
