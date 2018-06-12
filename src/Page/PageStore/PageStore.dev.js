import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from '../sagas';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools
    ? devTools({
        name: 'Page',
    })
    : compose;

const sagaMiddleWare = createSagaMiddleware();

const PageStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, createLogger(), sagaMiddleWare))
);

sagaMiddleWare.run(rootSaga);

export default PageStore;
