import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { pages } from './Reducers/pages';
import { tags } from './Reducers/tags';
import { table } from './Reducers/table';

const rootReducer = combineReducers({
    pages,
    tags,
    table,
    form: formReducer,
});

export default rootReducer;
