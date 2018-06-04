import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { pages } from './Reducers/pages';
import { table } from './Reducers/table';
//import { modals } from './Reducers/modals';
//import { oceValues } from './Reducers/oceValues';

// TODO: OCEMCM-271 -- Add more robust state for error and success.

const rootReducer = combineReducers({
    pages,
    table,
    form: formReducer,
});

export default rootReducer;
