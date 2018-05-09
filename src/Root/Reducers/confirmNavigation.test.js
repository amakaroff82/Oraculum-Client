import confirmNavigationReducer, { initialState } from './confirmNavigation';
import { types } from '../Actions/confirmNavigation';

describe('confirmNavigation reducer', () => {
  it('should return the initial state', () => {
    expect(confirmNavigationReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle UPDATE_NAV_DIALOG', () => {
    const payload = {
      open: true,
      message: 'Hello world',
      callback: jest.fn(),
    };
    expect(
      confirmNavigationReducer(initialState, {
        type: types.UPDATE_NAV_DIALOG,
        payload,
      })
    ).toEqual({
      ...initialState,
      ...payload,
    });
  });
});
