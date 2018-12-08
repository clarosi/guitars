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
        case actionTypes.GET_CART_ITEMS_USER: 
            return Object.assign({}, state, {
                cartItemDetails: action.payload
            });  
        case actionTypes.REMOVE_CART_ITEM:
            const copyUserDataRemove = Object.assign({}, state.userData);
            const newUserRemove = copyUserDataRemove.user;
            newUserRemove.cart = action.payload.cart;

            return Object.assign({}, state, {
                cartItemDetails: action.payload.cartDetails,
                userData: {
                    ...state.userData,
                    user: newUserRemove
                }
            });
        case actionTypes.ADD_TO_CART_USER:
            const copyUserDataAdd = Object.assign({}, state.userData);
            const newUserAdd = copyUserDataAdd.user;
            newUserAdd.cart = action.payload.data.doc;

            return Object.assign({}, state, {
                userData: {
                    ...state.userData,
                    user: newUserAdd
                }
            });
        default:
            return state;
    }
};

export default reducer;