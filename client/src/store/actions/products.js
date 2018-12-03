import * as actionTypes from './actionTypes';

import * as endPoint from '../../shared/utils/endPointContants';
import { axiosGetRequest, axiosPostRequest } from '../../shared/utils/helperFunctions';
import { tokenName } from '../../shared/utils/stringConstants';

const TOKEN = localStorage.getItem(tokenName);

// Promise base action creators
// axiosGetRequest(url, actionType, data = null, defaultVal = null)
export const getProductDetails = (productId) => {
    return axiosGetRequest(`${endPoint.productByIdEndPoint}?id=${productId}&type=single`, actionTypes.GET_PRODUCT_DETAILS, null, {doc: []});
};
 
export const getProductBySell = () => {
    return axiosGetRequest(`${endPoint.productEndPoint}?sortBy=sold&order=desc&limit=4`, actionTypes.GET_PRODUCT_BY_SELL);
};

export const getProductByArticle = () => {
    return axiosGetRequest(`${endPoint.productEndPoint}?sortBy=createdAt&order=desc&limit=4`, actionTypes.GET_PRODUCT_BY_ARRIVAL);
};

export const getProductBrands = () => {
    return axiosGetRequest(endPoint.productBrandsEndPoint, actionTypes.GET_PRODUCT_BRANDS);
};

export const getProductWoods = () => {
    return axiosGetRequest(endPoint.productWoodsEndPoint, actionTypes.GET_PRODUCT_WOODS);
};

// axiosPostRequest(url, actionType, data = null, prevData = [])
export const getProductsToShop = (payload, prevData = []) => {
    return axiosPostRequest(endPoint.getProductsToShopEndPoint, actionTypes.GET_PRODUCTS_TO_SHOP, payload, prevData);
};

export const addProduct = (payload) => {       
    return axiosPostRequest(`${endPoint.productAddEndPoint}?token=${TOKEN}`, actionTypes.ADD_PRODUCT, payload);
};

export const addProductBrand = (payload, prevData = []) => {
    return axiosPostRequest(`${endPoint.productAddBrandEndPoint}?token=${TOKEN}`, actionTypes.ADD_PRODUCT_BRAND, payload, prevData);
};

export const addProductWood = (payload, prevData = []) => {
    return axiosPostRequest(`${endPoint.productAddWoodEndPoint}?token=${TOKEN}`, actionTypes.ADD_PRODUCT_WOOD, payload, prevData);
};

export const clearProduct = () => {
    return {
        type: actionTypes.CLEAR_PRODUCT,
        payload: null
    };
};

export const clearProductDetails = () => {
    return {
        type: actionTypes.CLEAR_PRODUCT_DETAILS,
        payload: []
    };
};