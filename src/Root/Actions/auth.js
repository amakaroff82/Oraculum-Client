// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export const types = {
  POST_USER_REQUEST: 'POST_USER_REQUEST',
  POST_CACHED_USER_REQUEST: 'POST_CACHED_USER_REQUEST',
  POST_LOGOUT_USER_REQUEST: 'POST_LOGOUT_USER_REQUEST',
  POST_USER_SUCCESS: 'POST_USER_SUCCESS',
  POST_USER_FAILURE: 'POST_USER_FAILURE',
};

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const loginUser = () => ({
  type: types.POST_USER_REQUEST,
});

export const loginCachedUser = () => ({
    type: types.POST_CACHED_USER_REQUEST,
});

export const logoutUser = () => ({
    type: types.POST_LOGOUT_USER_REQUEST,
});
