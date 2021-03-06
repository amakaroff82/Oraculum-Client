import * as actionTypes from '../../actions';

export const initialTableState = {
  sorting: [],
  isFilterable: false,
  columns: new Set([
    'title',
    'url',
    'email',
  ]),
  selectedTags: []
};

// TODO: OCEMCM-272 -- Manage the column names in a single place

export const table = (state = initialTableState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_FILTERABLE:
      return {
        ...state,
        isFilterable: !state.isFilterable,
      };
    case actionTypes.UPDATE_SORTING:
      return {
        ...state,
        sorting: action.sorting,
      };
    case actionTypes.UPDATE_SHOWN_COLUMNS:
      return {
        ...state,
        columns: action.columns,
      };
    case actionTypes.UPDATE_SELECTED_TAGS:
      return {
        ...state,
        selectedTags: action.selectedTags
      };
    default:
  }
  return state;
};
