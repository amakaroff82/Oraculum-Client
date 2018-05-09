import { types } from '../Actions/confirmNavigation';

export const initialState = {
  open: false,
  message: '',
  callback: null,
};

const confirmNavigation = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_NAV_DIALOG:
      return {
        ...state,
        ...action.payload,
      };
    default:
  }

  return state;
};

export default confirmNavigation;
