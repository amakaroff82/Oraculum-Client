import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { TableHeader } from './TableHeader';

const defaultProps = {
  classes: {},
  headerLabel: 'Test',
  leftButtons: [<div>{'TestLButton'}</div>],
  rightButtons: [<div>{'TestRButton1'}</div>, <div>{'TestRButton2'}</div>],
};

const setup = props => {
  props = { ...defaultProps, ...props };

  return shallow(<TableHeader {...props} />);
};

describe('<TableHeader />', () => {
  it('renders snapshot correctly with required props', () => {
    const tree = setup();
    expect(toJson(tree)).toMatchSnapshot();
  });
});
