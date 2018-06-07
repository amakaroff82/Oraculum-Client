import { types } from '../Actions/auth';

export const initialAuthState = {
  user: null,
  data: null,
  errors: null,
  isSubmitting: false,
};

const localStorage = window.localStorage;

if(localStorage.user){
  try{
    initialAuthState.user = JSON.parse(localStorage.user);
  }
  catch(ex){}
}

const auth = (state = initialAuthState, action) => {
  switch (action.type) {
    case types.POST_GOOGLE_USER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case types.LOGIN_USER_REQUEST:
    case types.POST_USER_REQUEST:
    case types.EDIT_USER_REQUEST:
      return {
        ...state,
        data: action.data,
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
    case types.FETCH_USER_REQUEST:
      return {
        ...state,
        userId: action.userId,
        isSubmitting: true,
      };
    case types.POST_GOOGLE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        isSubmitting: false,
      };
    case types.POST_USER_SUCCESS:
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.data.data ? action.data.data.user : null,
        errors: action.data.errors,
        isSubmitting: false,
      };
    case types.EDIT_USER_SUCCESS:
      if (action.data.errors) {
        return {
          ...state,
          errors: action.data.errors,
          isSubmitting: false,
        };
      }
      return {
        ...state,
        user: action.data.data,
        errors: action.data.errors,
        isSubmitting: false,
      };
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.data,
        errors: null,
        isSubmitting: false,
      };
    case types.POST_GOOGLE_USER_FAILURE:
    case types.POST_USER_FAILURE:
    case types.LOGIN_USER_FAILURE:
    case types.EDIT_USER_FAILURE:
    case types.FETCH_USER_FAILURE:
      return {
        ...state,
        isSubmitting: false,
      };
    default:
  }

  return state;
};

export default auth;
