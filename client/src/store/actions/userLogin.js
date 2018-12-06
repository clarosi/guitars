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

export const clearUserStore = () => {
    return {
        type: actionTypes.CLEAR_USER_STORE,
        payload: {isAuth: false}
    };
}
