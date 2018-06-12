import { combineReducers } from 'redux';
import { page } from './Reducers/page';

const rootReducer = combineReducers({
    page,
});

export default rootReducer;
