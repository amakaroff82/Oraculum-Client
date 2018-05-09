import * as React from 'react';
import { shallowWithIntl } from '../../Shared/Helpers/intl-enzyme-test-helper';
import toJson from 'enzyme-to-json';
import { DataTableRowActions } from './DataTableRowActions';

const defaultProps = {
  classes: {},
  actions: [],
};

const setup = setupProps => {
  const props = { ...defaultProps, ...setupProps };
  return shallowWithIntl(<DataTableRowActions {...props} />);
};

describe('<DataTableRowActions />', () => {
  it('renders snapshot correctly with required props', () => {
    const tree = setup();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders snapshot correctly with a child action', () => {
    const altProps = {
      actions: [
        {
          childComponent: <div />,
        },
      ],
    };
    const tree = setup(altProps);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
