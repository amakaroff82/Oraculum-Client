import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Autocomplete } from './Autocomplete';

const defaultProps = {
  classes: {},
  input: { value: ['foo', 'bar'], onBlur: jest.fn(), onChange: jest.fn() },
  meta: {},
};

const setupShallow = props => {
  props = { ...defaultProps, ...props };
  return shallow(<Autocomplete {...props} />);
};

describe('<Autocomplete /> component', () => {
  it('renders with default props correctly', () => {
    const autocomplete = setupShallow();
    expect(toJson(autocomplete)).toMatchSnapshot();
  });

  it('renders with label correctly', () => {
    const autocomplete = setupShallow({ label: 'foo' });
    expect(toJson(autocomplete)).toMatchSnapshot();
  });

  it('renders with helperText correctly', () => {
    const autocomplete = setupShallow({ helperText: 'bar' });
    expect(toJson(autocomplete)).toMatchSnapshot();
  });

  it('renders error correctly', () => {
    const autocomplete = setupShallow({ meta: { error: 'sad' } });
    expect(toJson(autocomplete)).toMatchSnapshot();
  });

  it('renders error, concat with helperText if present', () => {
    const autocomplete = setupShallow({
      helperText: 'bar',
      meta: { error: 'sad' },
    });
    expect(toJson(autocomplete)).toMatchSnapshot();
  });
});
