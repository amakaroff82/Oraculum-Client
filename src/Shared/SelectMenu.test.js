import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { SelectMenu } from './SelectMenu';

const stringItems = [
  { value: 'value1', label: 'label1' },
  { value: 'value2', label: 'label2' },
  { value: 'value3', label: 'label3' },
];
const stringValue = stringItems[0].value;

const numberItems = [
  { value: 0, label: 'label1' },
  { value: 1, label: 'label2' },
  { value: 2, label: 'label3' },
];
const numberValue = numberItems[0].value;

const setupShallow = props => {
  return shallow(<SelectMenu {...props} />);
};

describe('<SelectMenu /> component', () => {
  it('renders correctly with string item values', () => {
    const selectMenu = setupShallow({ items: stringItems, value: stringValue });
    expect(toJson(selectMenu)).toMatchSnapshot();
  });

  it('renders correctly with number item values', () => {
    const selectMenu = setupShallow({ items: numberItems, value: numberValue });
    expect(toJson(selectMenu)).toMatchSnapshot();
  });
});
