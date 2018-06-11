import React from 'react';
import AccountContainer from './AccountContainer';
import { Provider } from 'react-redux';
import RootStore from '../Root/RootStore/configureStore';

const AccountArea = () => (
  <Provider store={RootStore}>
    <AccountContainer />
  </Provider>
);

export default AccountArea;
