import * as actionTypes from '../actions/actionTypes';

const initialState = {
    siteData: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SITE_INFO:
            return Object.assign({}, state, {
                siteData: action.payload
            });
        case actionTypes.UPDATE_SITE_INFO:
            return Object.assign({}, state, {
                siteData: action.payload.data
            });
        default:
            return state;
    }
};

export default reducer;