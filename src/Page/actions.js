export const FETCH_PAGE_REQUEST = 'FETCH_PAGE_REQUEST';
export const FETCH_PAGE_SUCCESS = 'FETCH_PAGE_SUCCESS';
export const FETCH_PAGE_FAILURE = 'FETCH_PAGE_FAILURE';

export const loadPage = pageId => ({ type: FETCH_PAGE_REQUEST, pageId: pageId });
