import * as actionTypes from '../actions/actionTypes';

const initialState = {
    toShopArticles: [],
    toShopSize: 0,
    productBySell: [],
    productByArrival: [],
    productBrands: [],
    productWoods: [],
    productDetails: [],
    addedProduct: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCT_DETAILS:
            // old school syntax
            // return {
            //     ...state,
            //     productDetails: action.payload.doc
            // };
            return Object.assign({}, state, {
                productDetails: action.payload.doc
            });
        case actionTypes.GET_PRODUCT_BY_SELL:
            return Object.assign({}, state, {
                productBySell: action.payload.doc
            });
        case actionTypes.GET_PRODUCT_BY_ARRIVAL:
            return Object.assign({}, state, {
                productByArrival: action.payload.doc
            });
        case actionTypes.GET_PRODUCT_BRANDS:
            return Object.assign({}, state, {
                productBrands: action.payload.brands
            });
        case actionTypes.GET_PRODUCT_WOODS:
            return Object.assign({}, state, {
                productWoods: action.payload.woods
            });
        case actionTypes.GET_PRODUCTS_TO_SHOP:
            const newArticles = [
                ...action.payload.prevData,
                ...action.payload.data.articles
            ];

            return Object.assign({}, state, {
                toShopArticles: newArticles,
                toShopSize: action.payload.data.size
            });
        case actionTypes.ADD_PRODUCT_BRAND:
            const newProductBrands = [
                ...action.payload.prevData,
                action.payload.data.doc
            ];

            return Object.assign({}, state, {
                productBrands: newProductBrands
            }); 
        case actionTypes.ADD_PRODUCT_WOOD:
            const newProductWoods = [
                ...action.payload.prevData,
                action.payload.data.doc
            ];

            return Object.assign({}, state, {
                productWoods: newProductWoods
            }); 
        case actionTypes.ADD_PRODUCT:
            return Object.assign({}, state, {
                addedProduct: action.payload.data
            });   
        case actionTypes.CLEAR_PRODUCT:
            return Object.assign({}, state, {
                addedProduct: action.payload
            });
        case actionTypes.CLEAR_PRODUCT_DETAILS:
            return Object.assign({}, state, {
                productDetails: action.payload
            });
        default:
            return state;
    }
};

export default reducer;