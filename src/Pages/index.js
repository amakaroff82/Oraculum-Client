import React from 'react';
import PagesTabPageContainer from './PagesTabPageContainer';
import PagesStore from './PagesStore';
import { Provider } from 'react-redux';

const PagesArea = () => (
    <Provider store={PagesStore}>
        <PagesTabPageContainer />
    </Provider>
);

export default PagesArea;
