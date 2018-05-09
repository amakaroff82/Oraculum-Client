import React from 'react';
import { shallowWithIntl } from '../Helpers/intl-enzyme-test-helper';
import { NavBarMenu } from './NavBarMenu';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import GotoIcon from '../Icons/GotoIcon';

const defaultProps = {
  classes: {},
  openMenu: jest.fn(),
  closeMenu: () => {},
  menu: {
    menuItems: [
      {
        intlMessageId: 'journeysMenuItem',
        path: '/journeys',
      },
      {
        intlMessageId: 'messagesMenuItem',
        path: '/communication',
      },
      {
        intlMessageId: 'contentBuilderMenuItem',
        path: 'http://google.com',
        isExternal: true,
      },
    ],
  },
  state: {
    el: '1',
    opened: false,
  },
};
const setup = customProps => {
  const props = { ...defaultProps, ...customProps };
  return shallowWithIntl(<NavBarMenu {...props} />);
};

describe('NavBarMenu Component', () => {
  it('renders without crashing', () => {
    setup();
  });

  it('should call openMenu on button click', () => {
    const wrapper = setup();
    const button = wrapper.find(Button);
    expect(defaultProps.openMenu).toHaveBeenCalledTimes(0);
    button.simulate('click');
    expect(defaultProps.openMenu).toHaveBeenCalledTimes(1);
  });

  it('should render subpages', () => {
    const wrapper = setup();
    const menuItem = wrapper.find(MenuItem);
    expect(menuItem.length).toEqual(defaultProps.menu.menuItems.length);
  });

  it('should render external icon for external links', () => {
    const wrapper = setup();
    const menuItem = wrapper.find(MenuItem);
    expect(menuItem.find(GotoIcon).length).toEqual(1);
  });
});
