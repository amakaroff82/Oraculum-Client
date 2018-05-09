import { types, updateNavDialog } from './confirmNavigation';

describe('confirmNavigation actions', () => {
  describe('updateNavDialog', () => {
    it('should create an action to update the confirmNavigation dialog', () => {
      const mockPayload = {
        open: true,
        message: 'Hello World',
        callback: jest.fn(),
      };
      const expected = {
        type: types.UPDATE_NAV_DIALOG,
        payload: mockPayload,
      };

      expect(updateNavDialog(mockPayload)).toEqual(expected);
    });
  });
});
