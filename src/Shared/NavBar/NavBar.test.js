import React from 'react';
import { shallowWithIntl } from '../Helpers/intl-enzyme-test-helper.js';
import { NavBar } from './NavBar';
import NavBarMenu from './NavBarMenu';
import { menus, adminMenus } from './NavBarMenus';

const defaultProps = {
  classes: {
    root: 'class',
    appbar: 'class',
    tabs: 'class',
    link: 'class',
    active: 'class',
  },
  window: {
    App: {
      user: {
        isAdmin: true,
      },
    },
  },
};

const setup = customProps => {
  const props = { ...defaultProps, ...customProps };
  return shallowWithIntl(<NavBar {...props} />);
};

describe('<NavBar/>', () => {
  it('should render without crashing', () => {
    setup();
  });

  it(`should render the nav bar menu and admin menu`, () => {
    const wrapper = setup();
    const expectedMenuCount = menus.length + adminMenus.length;
    expect(wrapper.find(NavBarMenu).length).toBe(expectedMenuCount);
  });

  it(`should render the nav bar menu without the admin menu`, () => {
    const newProps = {
      window: {
        App: {
          user: {
            isAdmin: false,
          },
        },
      },
    };
    const wrapper = setup(newProps);

    const expectedMenuCount = menus.length;
    expect(wrapper.find(NavBarMenu).length).toBe(expectedMenuCount);
  });

  it('should not render nav-bar on printing', () => {
    window.location.hash = '?mode=print';
    const newProps = {
      window: {
        App: {
          user: {
            isAdmin: false,
          },
        },
      },
    };
    const wrapper = setup(newProps);
    expect(wrapper.find('.nav-bar').length).toBe(0);
  });
});
