import * as actionTypes from '../../actions';

export const initialPageState = {
  data: [],
  isLoading: false,
  error: null,
};

export const page = (state = initialPageState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FETCH_PAGE_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        error: null,
      };
    case actionTypes.FETCH_PAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
  }

  return state;
};
