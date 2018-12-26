import { combineReducers } from 'redux';
import user from './user';
import product from './products';
import site from './site';

const rootReducer = combineReducers({
    user,
    product,
    site
});

export default rootReducer;