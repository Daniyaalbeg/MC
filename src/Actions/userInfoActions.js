import axios from 'axios';
import { API, rootURL, production } from '../config'

export const GET_USER_INFO = "GET_USER_INFO";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILURE = "GET_USER_INFO_FAILURE";

export const DELETE_USER_INFO_EVENT = "DELETE_USER_INFO_EVENT"

export const gettingUserInfo = () => ({
  type: GET_USER_INFO
});

export const gettingUserInfoSuccess = (userInfo) => ({
  type: GET_USER_INFO_SUCCESS,
  payload: userInfo
});

export const gettingUserInfoFailure = (error) => ({
  type: GET_USER_INFO_FAILURE,
  payload: error
});

export const deleteUserInfoEvent = (id) => ({
  type: DELETE_USER_INFO_EVENT,
  payload: id
})

export function getUserInfo() {
  return async (dispatch, getState) => {
    dispatch(gettingUserInfo())
    // const token = getState().auth.token;

    axios({
      method: 'get',
      url: rootURL(production)+API+'/auth/me',
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      dispatch(gettingUserInfoSuccess(res.data));
    })
    .catch((error) => {
      dispatch(gettingUserInfoFailure(error));
    });
  }
}

