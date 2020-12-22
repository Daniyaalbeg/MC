import axios from 'axios';
import { API, rootURL, production } from '../config'

export const GET_USER_INFO = "GET_USER_INFO";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILURE = "GET_USER_INFO_FAILURE";

export const GET_USER_INFO_BACKGROUND = "GET_USER_INFO_BACKGROUND"
export const GET_USER_INFO_BACKGROUND_SUCCESS = "GET_USER_INFO_BACKGROUND_SUCCESS"
export const GET_USER_INFO_BACKGROUND_FAILURE = "GET_USER_INFO_BACKGROUND_FAILURE" 

export const RESET_USER_INFO_GET = "RESET_USER_INFO_GET"

export const DELETE_USER_INFO_EVENT = "DELETE_USER_INFO_EVENT"

export const DELETE_USER_INFO_GROUP = "DELETE_USER_INFO_GROUP"

export const ADD_SUPPLY_ITEM = "ADD_SUPPLY_ITEM"

export const ADD_FAQ_ITEM = "ADD_FAQ_ITEM"

export const DELETE_FAQ_ITEM = "DELETE_FAQ_ITEM"

export const ADD_UPDATE_ITEM = "ADD_UPDATE_ITEM"

export const ACCEPT_SUPPLY_REQUEST = "ACCEPT_SUPPLY_REQUEST"


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

export const gettingUserInfoBackground = () => ({
  type: GET_USER_INFO_BACKGROUND
});
export const gettingUserInfoBackgroundSuccess = (userInfo) => ({
  type: GET_USER_INFO_BACKGROUND_SUCCESS,
  payload: userInfo
});
export const gettingUserInfoBackgroundFailure = (error) => ({
  type: GET_USER_INFO_BACKGROUND_FAILURE,
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

export const addSupplyItem = (supplyItem, orgID, projectID) => ({
  type: ADD_SUPPLY_ITEM,
  payload: { supplyItem, orgID, projectID }
})

export const addFaqItem = (faqItem, faqOrgID, faqProjectID) => ({
  type: ADD_FAQ_ITEM,
  payload: { faqItem, faqOrgID, faqProjectID }
})

export const addUpdateItem = (updateItem, updateOrgID, updateProjectID) => ({
  type: ADD_UPDATE_ITEM,
  payload: { updateItem, updateOrgID, updateProjectID }
})

export const deleteFaqItem = (deletedFaqItem, deleteFaqOrgID, deleteFaqProjectID) => ({
  type: DELETE_FAQ_ITEM,
  payload: { deletedFaqItem, deleteFaqOrgID, deleteFaqProjectID }
})

// export const acceptSupplyRequest = (projectID, deleteFaqOrgID, deleteFaqProjectID) => ({
//   type: ACCEPT_SUPPLY_REQUEST,
//   payload: { deletedFaqItem, deleteFaqOrgID, deleteFaqProjectID }
// })

export function getUserInfo() {
  return async dispatch => {
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

export function getUserInfoBackground() {
  return async (dispatch, getState) => {
    dispatch(gettingUserInfoBackground())

    axios({
      method: 'get',
      url: rootURL(production)+API+'/auth/me',
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      dispatch(gettingUserInfoBackgroundSuccess(res.data));
    })
    .catch((error) => {
      dispatch(gettingUserInfoBackgroundFailure(error));
    });
  }
}

