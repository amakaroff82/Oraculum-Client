/* global require, module */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../Reducers';
import rootSaga from '../Sagas/auth';

const sagaMiddleWare = createSagaMiddleware();

export const RootStore = createStore(
  rootReducer,
  compose(applyMiddleware(thunk, sagaMiddleWare))
);

sagaMiddleWare.run(rootSaga);

export default RootStore;
