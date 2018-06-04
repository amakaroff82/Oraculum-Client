import * as actionTypes from '../../actions';

export const initialTableState = {
  sorting: [],
  isFilterable: false,
  columns: new Set([
    'title',
    'url',
    'email',
  ]),
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
    default:
  }
  return state;
};
