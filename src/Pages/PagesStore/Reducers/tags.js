import * as actionTypes from '../../actions';

export const initialTagsState = {
  data: [],
  isLoading: false,
  error: null,
};

export const tags = (state = initialTagsState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TAGS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FETCH_TAGS_SUCCESS:
      return {
        ...state,
        data: action.tags,
        isLoading: false,
        error: null,
      };
    case actionTypes.FETCH_TAGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
  }

  return state;
};
