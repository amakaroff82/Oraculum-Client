import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SelectField from './SelectField';

const items = [
  { value: 'value1', label: 'label1' },
  { value: 'value2', label: 'label2' },
  { value: 'value3', label: 'label3' },
];
const value = items[1].value;

const defaultProps = {
  items,
  input: { value },
  meta: {},
};

const setupShallow = props => {
  props = { ...defaultProps, ...props };
  return shallow(<SelectField {...props} />);
};

describe('<SelectField /> component', () => {
  it('renders with default props correctly', () => {
    const selectField = setupShallow();
    expect(toJson(selectField)).toMatchSnapshot();
  });

  it('renders with label correctly', () => {
    const selectField = setupShallow({ label: 'foo' });
    expect(toJson(selectField)).toMatchSnapshot();
  });

  it('renders with helperText correctly', () => {
    const selectField = setupShallow({ helperText: 'bar' });
    expect(toJson(selectField)).toMatchSnapshot();
  });

  it('renders error if touched, concat with helperText if present', () => {
    const selectField = setupShallow({
      helperText: 'bar',
      meta: { touched: true, error: 'sad' },
    });
    expect(toJson(selectField)).toMatchSnapshot();
  });

  it('does not render error if not touched', () => {
    const selectField = setupShallow({
      meta: { touched: false, error: 'should not show error' },
    });
    expect(toJson(selectField)).toMatchSnapshot();
  });

  it('respects custom MenuProps', () => {
    const selectField = setupShallow({
      MenuProps: { elevation: 4 },
    });
    expect(toJson(selectField)).toMatchSnapshot();
  });
});
