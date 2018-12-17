import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userData: {isAuth: false},
    cartItemDetails: [],
    successPurchase: false,
    updateUser: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_USER:
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
        case actionTypes.UPDATE_USER_PROFILE:
            return Object.assign({}, state, {
                updateUser: action.payload.data.success
            }); 
        case actionTypes.CLEAR_USER_PROFILE:
            return Object.assign({}, state, {
                updateUser: action.payload
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
        case actionTypes.ON_SUCCESS_PURCHASE_USER:
            const copyUserData = Object.assign({}, state.userData);
            const newUser = copyUserData.user;
            newUser.cart = action.payload.data.cart;

            return Object.assign({}, state, {
                successPurchase: action.payload.data.success,
                cartItemDetails: action.payload.data.cartDetails,
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