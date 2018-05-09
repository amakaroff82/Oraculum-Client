// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export const types = {
  UPDATE_NAV_DIALOG: 'UPDATE_NAV_DIALOG',
};

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const updateNavDialog = newUserDialog => ({
  type: types.UPDATE_NAV_DIALOG,
  payload: newUserDialog,
});
