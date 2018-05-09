import React from 'react';
import { shallowWithIntl } from './Helpers/intl-enzyme-test-helper.js';
import { Footer } from './Footer';

const defaultProps = {
  classes: {
    dashboardFooter: 'class',
    dashboardFooterLink: 'class',
    dashboardFooterCopy: 'class',
  },
};

const setup = customProps => {
  const props = { ...defaultProps, ...customProps };
  return shallowWithIntl(<Footer {...props} />);
};

describe('<Footer/>', () => {
  it('should render without crashing', () => {
    setup();
  });
  it('should not render nav-bar on printing', () => {
    window.location.hash = '?mode=print';
    const wrapper = setup();
    expect(wrapper.find('.footer').length).toBe(0);
  });
});
