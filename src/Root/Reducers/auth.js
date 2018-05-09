import { types } from '../Actions/auth';

export const initialAuthState = {
  user: null,
  isError: false,
  isSubmitting: false,
};

const auth = (state = initialAuthState, action) => {
  switch (action.type) {
    case types.POST_USER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case types.POST_CACHED_USER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case types.POST_LOGOUT_USER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case types.POST_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        isError: false,
        isSubmitting: false,
      };
    case types.POST_USER_FAILURE:
      return {
        ...state,
        isError: true,
        isSubmitting: false,
      };
    default:
  }

  return state;
};

export default auth;
