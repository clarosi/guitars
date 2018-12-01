import * as actionTypes from './actionTypes';

import { 
    productEndPoint, 
    productBrandsEndPoint, 
    productWoodsEndPoint,
    getProductsToShopEndPoint,
    productAddEndPoint
} from '../../shared/utils/endPointContants';
import { axiosGetRequest, axiosPostRequest } from '../../shared/utils/helperFunctions';
import { tokenName } from '../../shared/utils/stringConstants';

// Promise base action creators 
export const getProductBySell = () => {
    return axiosGetRequest(`${productEndPoint}?sortBy=sold&order=desc&limit=4`, actionTypes.GET_PRODUCT_BY_SELL);
};

export const getProductByArticle = () => {
    return axiosGetRequest(`${productEndPoint}?sortBy=createdAt&order=desc&limit=4`, actionTypes.GET_PRODUCT_BY_ARRIVAL);
};

export const getProductBrands = () => {
    return axiosGetRequest(productBrandsEndPoint, actionTypes.GET_PRODUCT_BRANDS);
};

export const getProductWoods = () => {
    return axiosGetRequest(productWoodsEndPoint, actionTypes.GET_PRODUCT_WOODS);
};

export const getProductsToShop = (payload, prevData = []) => {
    return axiosPostRequest(getProductsToShopEndPoint, actionTypes.GET_PRODUCTS_TO_SHOP, payload, prevData);
};

export const addProduct = (payload) => {       
    const token = localStorage.getItem(tokenName);
    return axiosPostRequest(`${productAddEndPoint}?token=${token}`, actionTypes.ADD_PRODUCT, payload);
};

export const clearProduct = () => {
    return {
        type: actionTypes.CLEAR_PRODUCT,
        payload: null
    };
};