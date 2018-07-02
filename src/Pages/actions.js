//import GoogleAnalytics from 'react-ga';

export const FETCH_PAGES_REQUEST = 'FETCH_PAGES_REQUEST';
export const FETCH_ALL_PAGES_REQUEST = 'FETCH_ALL_PAGES_REQUEST';
export const FETCH_PAGES_SUCCESS = 'FETCH_PAGES_SUCCESS';
export const FETCH_PAGES_FAILURE = 'FETCH_PAGES_FAILURE';

export const POST_PAGE_REQUEST = 'POST_PAGE_REQUEST';
export const POST_PAGE_SUCCESS = 'POST_PAGE_SUCCESS';
export const POST_PAGE_FAILURE = 'POST_PAGE_FAILURE';

export const EDIT_PAGE_REQUEST = 'EDIT_PAGE_REQUEST';
export const EDIT_PAGE_SUCCESS = 'EDIT_PAGE_SUCCESS';
export const EDIT_PAGE_FAILURE = 'EDIT_PAGE_FAILURE';

export const FETCH_TAGS_REQUEST = 'FETCH_TAGS_REQUEST';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE';

export const FETCH_VALUES_REQUEST = 'FETCH_VALUES_REQUEST';
export const FETCH_VALUES_SUCCESS = 'FETCH_VALUES_SUCCESS';
export const FETCH_VALUES_FAILURE = 'FETCH_VALUES_FAILURE';

export const TOGGLE_CREATE_MODAL = 'TOGGLE_CREATE_MODAL';
export const TOGGLE_EDIT_MODAL = 'TOGGLE_EDIT_MODAL';
export const UPDATE_SORTING = 'UPDATE_SORTING';
export const TOGGLE_FILTERABLE = 'TOGGLE_FILTERABLE';
export const UPDATE_SHOWN_COLUMNS = 'UPDATE_SHOWN_COLUMNS';
export const UPDATE_SELECTED_TAGS = 'UPDATE_SELECTED_TAGS';

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

// Fetches the current list of pages from HubExchangeGateway API.
export const loadPages = (userId) => ({ type: FETCH_PAGES_REQUEST, userId: userId });
export const loadAllPages = () => ({ type: FETCH_ALL_PAGES_REQUEST });

// Creates a page with the HubExchangeGateway API.
export const createPage = pageParams => ({
    type: POST_PAGE_REQUEST,
    pageParams: pageParams,
});

// Edits a page with the HubExchangeGateway API.
export const editPage = pageParams => ({
    type: EDIT_PAGE_REQUEST,
    pageParams: pageParams,
});

export const loadTags = () => ({ type: FETCH_TAGS_REQUEST });

// Fetches the current list of values from HubExchangeGateway API.
export const loadValues = () => ({ type: FETCH_VALUES_REQUEST });

// Toggles visibility of create page modal.
export const toggleCreateModal = () => {
    /*GoogleAnalytics.event({
        category: 'Pages',
        action: 'Create Page Visiblity Changed',
        label: 'Button',
    });*/
    return { type: TOGGLE_CREATE_MODAL };
};

// Toggles visibility of edit page modal.
export const toggleEditModal = id => ({
    type: TOGGLE_EDIT_MODAL,
    pageId: id || null,
});

// Toggles filterability of pages table.
export const toggleFilterable = () => ({ type: TOGGLE_FILTERABLE });

// Updates the sorting method of pages table.
export const updateTableSorting = sorting => ({
    type: UPDATE_SORTING,
    sorting: sorting,
});

// Updates the shown columns of pages table. Not yet implemented in UI.
export const updateShownColumns = columns => ({
    type: UPDATE_SHOWN_COLUMNS,
    columns: columns,
});

export const updateSelectedTags = selectedTags=> ({
    type: UPDATE_SELECTED_TAGS,
    selectedTags: selectedTags,
});
