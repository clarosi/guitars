import * as actionTypes from './actionTypes';

import { 
    signinEndPoint, 
    authEndPoint,
    addToCartUserEndPoint 
} from '../../shared/utils/endPointContants';
import { tokenName } from '../../shared/utils/stringConstants';
import { axiosGetRequest, axiosPostRequest } from '../../shared/utils/helperFunctions';

// Promise base action creators 
// axiosGetRequest(url, actionType, data = null, defaultVal = null)
// axiosPostRequest(url, actionType, data = null, prevData = [], defaultVal = null)

export const authUser = () => {
    const token = localStorage.getItem(tokenName);
    return axiosGetRequest(`${authEndPoint}?token=${token}`, actionTypes.AUTH_USER);
};

export const loginUser = (payload) => {
    return axiosPostRequest(signinEndPoint, actionTypes.LOGIN_USER, payload, [], {data: {isAuth: false}});
};

export const addToCartUser = (id) => {
    const token = localStorage.getItem(tokenName);
    return axiosPostRequest(`${addToCartUserEndPoint}?token=${token}&id=${id}`, actionTypes.ADD_TO_CART_USER);
};

export const getCartItemUser = () => {
    return {
        type: actionTypes.GET_CART_ITEMS_USER,
        payload: null
    };
};

export const clearUserStore = () => {
    return {
        type: actionTypes.CLEAR_USER_STORE,
        payload: {isAuth: false}
    };
}
