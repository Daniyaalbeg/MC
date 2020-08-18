import axios from 'axios';
import { API, rootURL, production } from '../config'

export const GET_USER_INFO = "GET_USER_INFO";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILURE = "GET_USER_INFO_FAILURE";

export const RESET_USER_INFO_GET = "RESET_USER_INFO_GET"

export const DELETE_USER_INFO_EVENT = "DELETE_USER_INFO_EVENT"

export const DELETE_USER_INFO_GROUP = "DELETE_USER_INFO_GROUP"

export const ADD_NEW_SUPPLY_ITEM = "ADD_NEW_SUPPLY_ITEM"

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

export const resetUserInfoGet = () => ({
  type: RESET_USER_INFO_GET
});

export const deleteUserInfoEvent = (id) => ({
  type: DELETE_USER_INFO_EVENT,
  payload: id
})

export const deleteUserInfoGroup = (id) => ({
  type: DELETE_USER_INFO_GROUP,
  payload: id
})

export const addNewSupplyItem = (supplyItem, orgID, projectID) => ({
  type: ADD_NEW_SUPPLY_ITEM,
  payload: { supplyItem, orgID, projectID }
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

