import * as actionTypes from './actionTypes';

import { signinEndPoint, authEndPoint } from '../../shared/utils/endPointContants';
import { tokenName } from '../../shared/utils/stringConstants';
import { axiosGetRequest, axiosPostRequest } from '../../shared/utils/helperFunctions';

// Promise base action creators 
export const authUser = () => {
    const dummyToken = 'invalidDummyToken';
    const token = localStorage.getItem(tokenName) ? localStorage.getItem(tokenName) : dummyToken;
    
    return axiosGetRequest(`${authEndPoint}?token=${token}`, actionTypes.AUTH_USER);
};

export const loginUser = (payload) => {
    return axiosPostRequest(signinEndPoint, actionTypes.LOGIN_USER, payload);
};

export const clearUserStore = () => {
    return {
        type: actionTypes.CLEAR_USER_STORE,
        payload: {isAuth: false}
    };
}

// Non promise action creators
// const loginUserStart = () => {
//     return {
//         type: actionTypes.LOGIN_USER_START
//     };
// };

// const loginUserFailed = (error) => {
//     return {
//         type: actionTypes.LOGIN_USER_FAILED,
//         error
//     };
// };

// const loginUserSuccess = (userData) => {
//     return {
//         type: actionTypes.LOGIN_USER_SUCCESS,
//         userData
//     };
// };

// export const loginUser = (credentials) => {
//     return dispatch => {
//         dispatch(loginUserStart());
//         axios.post(signinEndPoint, credentials)
//         .then(res => {
//             localStorage.setItem(tokenName, res.data.user.token);
//             dispatch(loginUserSuccess(res.data));
//         })
//         .catch(err => {
//             dispatch(loginUserFailed(err.response.data.error));
//         });
//     };
// };
