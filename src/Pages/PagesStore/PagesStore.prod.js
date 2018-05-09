/* global require, module */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from '../sagas';

const sagaMiddleWare = createSagaMiddleware();

const PagesStore = createStore(
    rootReducer,
    compose(applyMiddleware(thunk, sagaMiddleWare))
);

sagaMiddleWare.run(rootSaga);

export default PagesStore;
