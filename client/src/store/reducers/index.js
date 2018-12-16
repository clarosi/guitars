import { combineReducers } from 'redux';
import userReducer from './user';
import productReducer from './products';

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer
});

export default rootReducer;