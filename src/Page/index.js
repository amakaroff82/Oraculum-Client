import React from 'react';
import PageContainer from './PageContainer';
import PageStore from './PageStore';
import { Provider } from 'react-redux';

const PageArea = () => (
  <Provider store={PageStore}>
    <PageContainer />
  </Provider>
);

export default PageArea;
