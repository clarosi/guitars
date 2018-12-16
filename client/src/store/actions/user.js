import * as actionTypes from './actionTypes';

import * as route from '../../shared/utils/endPointContants';
import { tokenName } from '../../shared/utils/stringConstants';
import { axiosGetRequest, axiosPostRequest } from '../../shared/utils/helperFunctions';
import axios from '../../axios/axiosGuitars';

// Promise base action creators 
// axiosGetRequest(url, actionType, data = null, defaultVal = null)
// axiosPostRequest(url, actionType, data = null, prevData = [], defaultVal = null)

export const authUser = () => {
    const token = localStorage.getItem(tokenName);
    return axiosGetRequest(`${route.authEndPoint}?token=${token}`, actionTypes.AUTH_USER);
};

export const loginUser = (payload) => {
    return axiosPostRequest(route.signinEndPoint, actionTypes.LOGIN_USER, payload, [], {data: {isAuth: false}});
};

export const addToCartUser = (id) => {
    const token = localStorage.getItem(tokenName);
    return axiosPostRequest(`${route.addToCartUserEndPoint}?token=${token}&id=${id}`, actionTypes.ADD_TO_CART_USER);
};

export const updateUserProfile = (payload) => {
    const token = localStorage.getItem(tokenName);
    return axiosPostRequest(`${route.updateProfileEndPoint}?token=${token}`, actionTypes.UPDATE_USER_PROFILE, payload);
};

export const onSuccessPurchase = (payload) => {
    const token = localStorage.getItem(tokenName);
    const request = axios.post(`${route.successPaymentEndPoint}?token=${token}`, payload)
    .then(res => res.data);
    
    return {
        type: actionTypes.ON_SUCCESS_PURCHASE_USER,
        payload: request
    }; 
};

export const getCartItemUser = (cartItems, userCart) => {
    const request = axios.get(`${route.productByIdEndPoint}?id=${cartItems}&type=array`)
    .then(res => {
        userCart.forEach(itemCart => {
            res.data.doc.forEach((itemDoc, index) => {
                if (itemCart.id === itemDoc._id) {
                    res.data.doc[index].quantity = itemCart.quantity
                }
            });
        });

        return res.data.doc;
    })
    .catch(() => []);

    return {
        type: actionTypes.GET_CART_ITEMS_USER,
        payload: request
    };
};

export const removeCartItem = (id) => {
    const token = localStorage.getItem(tokenName);
    const request = axios.get(`${route.removeFromCartEndPoint}?token=${token}&id=${id}`)
    .then(res => {
        res.data.cart.forEach(itemCart => {
            res.data.cartDetails.forEach((itemDetails, index) => {
                if (itemCart.id === itemDetails._id) {
                    res.data.cartDetails[index].quantity = itemCart.quantity;
                }
            });
        });

        return res.data;
    });

    return {
        type: actionTypes.REMOVE_CART_ITEM,
        payload: request
    };
};

export const clearUserStore = () => {
    return {
        type: actionTypes.CLEAR_USER_STORE,
        payload: {isAuth: false}
    };
};
