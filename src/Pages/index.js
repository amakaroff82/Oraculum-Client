import React from 'react';
import PagesTabPageContainer, { AllPagesTabPageContainer } from './PagesTabPageContainer';
import PagesStore from './PagesStore';
import { Provider } from 'react-redux';

const PagesArea = () => (
  <Provider store={PagesStore}>
    <PagesTabPageContainer/>
  </Provider>
);

export const AllPagesArea = () => (
  <Provider store={PagesStore}>
    <AllPagesTabPageContainer/>
  </Provider>
);

export default PagesArea;
