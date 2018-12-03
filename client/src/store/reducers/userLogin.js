import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userData: {isAuth: false}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_USER:
            // old school syntax
            // return {
            //     ...state,
            //     userData: action.payload.data
            // };
            return Object.assign({}, state, {
                userData: action.payload.data
            });
        case actionTypes.AUTH_USER:
            return Object.assign({}, state, {
                userData: action.payload
            });
        case actionTypes.CLEAR_USER_STORE:
            return Object.assign({}, state, {
                userData: action.payload
            });
        default:
            return state;
    }
};

export default reducer;