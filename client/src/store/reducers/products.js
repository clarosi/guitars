import * as actionTypes from '../actions/actionTypes';

const initialState = {
    toShopArticles: [],
    toShopSize: 0,
    productBySell: [],
    productByArrival: [],
    productBrands: [],
    productWoods: [],
    addedProduct: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCT_BY_SELL:
            return {
                ...state,
                productBySell: action.payload.doc
            }; 
        case actionTypes.GET_PRODUCT_BY_ARRIVAL:
            return {
                ...state,
                productByArrival: action.payload.doc
            };
        case actionTypes.GET_PRODUCT_BRANDS:
            return {
                ...state,
                productBrands: action.payload.brands
            };
        case actionTypes.GET_PRODUCT_WOODS:
            return {
                ...state,
                productWoods: action.payload.woods
            };
        case actionTypes.GET_PRODUCTS_TO_SHOP:
            const newArticles = [
                ...action.payload.prevData,
                ...action.payload.data.articles
            ];

            return {
                ...state,
                toShopArticles: newArticles,
                toShopSize: action.payload.data.size,
            }; 
        case actionTypes.ADD_PRODUCT:
            return Object.assign({}, state, {
                addedProduct: action.payload.data
            });   
        case actionTypes.CLEAR_PRODUCT:
            return Object.assign({}, state, {
                addedProduct: action.payload
            }); 
        default:
            return state;
    }
};

export default reducer;