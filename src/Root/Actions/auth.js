// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export const types = {
  POST_GOOGLE_USER_REQUEST: 'POST_GOOGLE_USER_REQUEST',
  POST_GOOGLE_USER_SUCCESS: 'POST_GOOGLE_USER_SUCCESS',
  POST_GOOGLE_USER_FAILURE: 'POST_GOOGLE_USER_FAILURE',

  POST_CACHED_USER_REQUEST: 'POST_CACHED_USER_REQUEST',

  POST_LOGOUT_USER_REQUEST: 'POST_LOGOUT_USER_REQUEST',

  LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST',
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAILURE: 'LOGIN_USER_FAILURE',

  POST_USER_REQUEST: 'POST_USER_REQUEST',
  POST_USER_SUCCESS: 'POST_USER_SUCCESS',
  POST_USER_FAILURE: 'POST_USER_FAILURE',
};

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const loginUserWithGoogle = () => ({
  type: types.POST_GOOGLE_USER_REQUEST,
});

export const loginUser = data => ({
  type: types.LOGIN_USER_REQUEST,
  data: data,
});

export const loginCachedUser = () => ({
  type: types.POST_CACHED_USER_REQUEST,
});

export const logoutUser = () => ({
  type: types.POST_LOGOUT_USER_REQUEST,
});

export const registerUser = data => ({
  type: types.POST_USER_REQUEST,
  data: data,
});
