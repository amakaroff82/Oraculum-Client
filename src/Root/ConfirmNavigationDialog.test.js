import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ConfirmNavigationDialog from './ConfirmNavigationDialog';
import ActionButtons from '../Shared/ActionButtons';

const defaultProps = {
  confirmNavigation: {
    open: true,
    message: 'Hello World',
    callback: jest.fn(),
  },
  updateNavDialog: jest.fn(),
};

const setup = props => {
  props = { ...defaultProps, ...props };

  return shallow(<ConfirmNavigationDialog {...props} />);
};

describe('<ConfirmNavigationDialog />', () => {
  let tree;

  beforeAll(() => {
    tree = setup();
  });

  it('renders snapshot correctly with required props', () => {
    expect(toJson(tree)).toMatchSnapshot();
  });

  describe('performs correct behavior on cancel button click', () => {
    beforeAll(() => {
      tree
        .find(ActionButtons)
        .props()
        .cancelButtonProps.onClick();
    });

    afterAll(() => {
      defaultProps.confirmNavigation.callback.mockReset();
      defaultProps.updateNavDialog.mockReset();
    });

    it('closes the confirmation dialog', () => {
      expect(defaultProps.updateNavDialog).toBeCalledWith({ open: false });
    });

    it('calls the confirm navigation callback with correct arg', () => {
      expect(defaultProps.confirmNavigation.callback).toBeCalledWith(false);
    });
  });

  describe('performs correct behavior on confirm button click', () => {
    beforeAll(() => {
      tree
        .find(ActionButtons)
        .props()
        .primaryButtonProps.onClick();
    });

    afterAll(() => {
      defaultProps.confirmNavigation.callback.mockReset();
      defaultProps.updateNavDialog.mockReset();
    });

    it('closes the confirmation dialog', () => {
      expect(defaultProps.updateNavDialog).toBeCalledWith({ open: false });
    });

    it('calls the confirm navigation callback with correct arg', () => {
      expect(defaultProps.confirmNavigation.callback).toBeCalledWith(true);
    });
  });

  describe('performs correct behavior on backdrop click', () => {
    beforeAll(() => {
      const backDropClickHandler = tree.props().onRequestClose;
      backDropClickHandler();
    });

    it('closes the confirmation dialog', () => {
      expect(defaultProps.updateNavDialog).toBeCalledWith({ open: false });
    });

    it('calls the confirm navigation callback with correct arg', () => {
      expect(defaultProps.confirmNavigation.callback).toBeCalledWith(false);
    });
  });
});
