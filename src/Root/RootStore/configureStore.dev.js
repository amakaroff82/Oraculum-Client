import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../Reducers';
import rootSaga from '../Sagas/auth';

const sagaMiddleWare = createSagaMiddleware();

const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools
  ? devTools({
      name: 'Root',
    })
  : compose;

const RootStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, createLogger(), sagaMiddleWare))
);

sagaMiddleWare.run(rootSaga);

export default RootStore;
