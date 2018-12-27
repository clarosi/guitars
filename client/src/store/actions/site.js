import * as actionTypes from './actionTypes';

import * as route from '../../shared/utils/endPointContants';
import { tokenName } from '../../shared/utils/stringConstants';
import { axiosGetRequest, axiosPostRequest } from '../../shared/utils/helperFunctions';

// Promise base action creators 
// axiosGetRequest(url, actionType, data = null, defaultVal = null)
// axiosPostRequest(url, actionType, data = null, prevData = [], defaultVal = null)

export const getSiteInfo = () => {
    return axiosGetRequest(`${route.getSiteInfo}`, actionTypes.GET_SITE_INFO);
};

export const updateSiteInfo = (data) => {
    const token = localStorage.getItem(tokenName);
    return axiosPostRequest(`${route.getSiteInfo}?token=${token}`, actionTypes.UPDATE_SITE_INFO, data);
};
