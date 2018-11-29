import * as actionTypes from './actionTypes';

import { signinEndPoint, authEndPoint } from '../../shared/utils/endPointContants';
import { tokenName } from '../../shared/utils/stringConstants';
import { axiosGetRequest } from '../../shared/utils/helperFunctions';
import axios from '../../axios/axiosGuitars';

// Promise base action creators 
export const authUser = () => {
    const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV.eyJlbWFpbCI6Inp5cnVzQHlhaG9vLmNvb.GdQulGc1Z38wlrX4kI5buWUFmENDYnut6jvNcM';
    const token = localStorage.getItem(tokenName) ? localStorage.getItem(tokenName) : dummyToken;
    
    return axiosGetRequest(`${authEndPoint}?token=${token}`, actionTypes.AUTH_USER);
};

// Non promise action creators
const loginUserStart = () => {
    return {
        type: actionTypes.LOGIN_USER_START
    };
};

const loginUserFailed = (error) => {
    return {
        type: actionTypes.LOGIN_USER_FAILED,
        error
    };
};

const loginUserSuccess = (userData) => {
    return {
        type: actionTypes.LOGIN_USER_SUCCESS,
        userData
    };
};

export const loginUser = (credentials) => {
    return dispatch => {
        dispatch(loginUserStart());
        axios.post(signinEndPoint, credentials)
        .then(res => {
            localStorage.setItem(tokenName, res.data.user.token);
            dispatch(loginUserSuccess(res.data));
        })
        .catch(err => {
            dispatch(loginUserFailed(err.response.data.error));
        });
    };
};