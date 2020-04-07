import axios from 'axios';

export const GET_USER_INFO = "GET_USER_INFO";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILURE = "GET_USER_INFO_FAILURE";

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

export function getUserInfo() {
  return async (dispatch, getState) => {
    dispatch(gettingUserInfo())
    const token = getState().auth.token;

    axios({
      method: 'get',
      url: 'http://localhost:8000/auth/me',
      headers: {'Content-Type': 'application/json', 'x-access-token': token}
    })
    .then((res) => {
      console.log(res.data);
      dispatch(gettingUserInfoSuccess(res.data));
    })
    .catch((error) => {
      dispatch(gettingUserInfoFailure(error));
    });
  }
}

