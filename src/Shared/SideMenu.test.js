import React from 'react';
import { SideMenu } from './SideMenu';
import toJson from 'enzyme-to-json';
import { ListItem } from 'material-ui/List';
import { shallowWithIntl } from './Helpers/intl-enzyme-test-helper';

const defaultProps = {
  classes: {
    drawer: 'drawer',
    header: 'header',
  },
  titleId: 'Test Title Id',
  buttonAction: jest.fn(),
  buttonTextId: 'Test Button Text Id',
};

const setup = props => {
  props = { ...defaultProps, ...props };

  return shallowWithIntl(<SideMenu {...props} />);
};

describe('<SideMenu/> component', () => {
  it('renders snapshot correctly with listItems array', () => {
    const tree = setup({
      listItems: [<ListItem key="1" />, <ListItem key="2" />],
    });
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders successfully with empty listItems array', () => {
    const tree = setup({ listItems: [] });
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders successfully when listItems is null', () => {
    const tree = setup({ listItems: null });
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders successfully without listItems', () => {
    const tree = setup();
    expect(toJson(tree)).toMatchSnapshot();
  });
});
