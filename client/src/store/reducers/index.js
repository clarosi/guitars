import { combineReducers } from 'redux';
import userLoginReducer from './userLogin';
import productReducer from './products';

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    product: productReducer
});

export default rootReducer;