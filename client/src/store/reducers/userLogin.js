import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userData: {isAuth: false},
    isLoading: false,
    error: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_USER_START:
            return {
                ...state,
                isLoading: true,
                error: ''
            }; 
        case actionTypes.LOGIN_USER_FAILED:
            return {
                ...state,
                userData: {isAuth: false},
                isLoading: false,
                error: action.error
            };
        case actionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                userData: action.userData,
                isLoading: false,
                error: '',
            };
        case actionTypes.AUTH_USER:
            return {
                ...state,
                userData: action.payload
            };
        default:
            return state;
    }
};

export default reducer;