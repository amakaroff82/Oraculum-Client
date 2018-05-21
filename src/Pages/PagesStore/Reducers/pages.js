import * as actionTypes from '../../actions';

export const initialPagesState = {
    data: [],
    isLoading: false,
    error: null,
};

export const pages = (state = initialPagesState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_PAGES_REQUEST:
        case actionTypes.FETCH_PAGES_REQUEST:
        case actionTypes.POST_PAGE_REQUEST:
        case actionTypes.EDIT_PAGE_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case actionTypes.POST_PAGE_SUCCESS:
        case actionTypes.EDIT_PAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
            };

        case actionTypes.FETCH_PAGES_SUCCESS:
            return {
                ...state,
                data: action.pages,
                isLoading: false,
                error: null,
            };
        case actionTypes.FETCH_PAGES_FAILURE:
        case actionTypes.POST_PAGE_FAILURE:
        case actionTypes.EDIT_PAGE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        default:
    }

    return state;
};
