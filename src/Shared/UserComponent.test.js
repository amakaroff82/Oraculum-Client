import * as React from 'react';
import { shallow } from 'enzyme';
import UserComponent from './UserComponent';

describe('<UserComponent />', () => {
  it('renders the correct text without crashing', () => {
    const user = shallow(<UserComponent name="Kate" />);
    expect(user.find('div').text()).toEqual('Kate');
  });
});
