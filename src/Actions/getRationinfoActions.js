import axios from 'axios';

export const GET_RATION_INFO = "GET_RATION_INFO";
export const GET_RATION_INFO_SUCCESS = "GET_RATION_INFO_SUCCESS";
export const GET_RATION_INFO_FAILURE = "GET_RATION_INFO_FAILURE";

export const gettingRationInfo = () => ({
  type: GET_RATION_INFO
});

export const gettingRationInfoSuccess = (data) => ({
  type: GET_RATION_INFO_SUCCESS,
  payload: data
});

export const gettingRationInfoFailure = (error) => ({
  type: GET_RATION_INFO_FAILURE,
  payload: error
});

export function getRationInfo() {
  return async dispatch => {
    dispatch(gettingRationInfo());

    axios({
      method: 'get',
      url: 'http://localhost:8000/rationEvent',
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => {
      dispatch(gettingRationInfoSuccess(res.data));
    })
    .catch((error) => {
      dispatch(gettingRationInfoFailure(error));
    });
  }
}