import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userData: {isAuth: false},
    cartItemDetails: []
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
        case actionTypes.GET_CART_ITEMS_USER: {
            return Object.assign({}, state, {
                cartItemDetails: action.payload
            });  
        }
        case actionTypes.ADD_TO_CART_USER:
            const copyUserData = Object.assign({}, state.userData);
            const newUser = copyUserData.user;
            newUser.cart = action.payload.data.doc;

            return Object.assign({}, state, {
                userData: {
                    ...state.userData,
                    user: newUser
                }
            });
        default:
            return state;
    }
};

export default reducer;