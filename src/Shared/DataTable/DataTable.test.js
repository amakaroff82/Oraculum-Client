import * as React from 'react';
import { shallowWithIntl } from '../../Shared/Helpers/intl-enzyme-test-helper';
import toJson from 'enzyme-to-json';
import { mockJourneys, mockColumns } from '../../Journeys/Helpers/mocks';
import { DataTable } from './DataTable';

const defaultProps = {
  classes: {},
  data: mockJourneys,
  columns: mockColumns,
};

const setup = setupProps => {
  const props = { ...defaultProps, ...setupProps };
  return shallowWithIntl(<DataTable {...props} />);
};

describe('<DataTable />', () => {
  it('renders snapshot correctly with required props', () => {
    const tree = setup();
    expect(toJson(tree)).toMatchSnapshot();
  });
});
