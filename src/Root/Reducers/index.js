import { combineReducers } from 'redux';
import auth from './auth';
import confirmNavigation from './confirmNavigation';

const rootReducer = combineReducers({
  auth,
  confirmNavigation,
});

export default rootReducer;
