import * as React from 'react';
import { shallowWithIntl } from '../../Shared/Helpers/intl-enzyme-test-helper';
import toJson from 'enzyme-to-json';
import { DataTableRowAction } from './DataTableRowAction';

const defaultProps = {
  classes: {},
  childComponent: <div />,
  text: '',
  onClick: () => {},
};

const setup = setupProps => {
  const props = { ...defaultProps, ...setupProps };
  return shallowWithIntl(<DataTableRowAction {...props} />);
};

describe('<DataTableRowAction />', () => {
  it('renders snapshot correctly when onClick prop is present', () => {
    const tree = setup();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders snapshot correctly when onClick prop isnt present', () => {
    const altProps = {
      onClick: null,
    };
    const tree = setup(altProps);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
