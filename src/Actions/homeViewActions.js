import axios from 'axios';
import { API, rootURL, production } from '../config'


export const GET_MAIN_INFO = "GET_MAIN_INFO";
export const GET_MAIN_INFO_SUCCESS = "GET_MAIN_INFO_SUCCESS";
export const GET_MAIN_INFO_FAILURE = "GET_MAIN_INFO_FAILURE";

export const gettingMainInfo = () => ({
  type: GET_MAIN_INFO
});

export const gettingMainInfoSuccess = (data) => ({
  type: GET_MAIN_INFO_SUCCESS,
  payload: data
});

export const gettingMainInfoFailure = (error) => ({
  type: GET_MAIN_INFO_FAILURE,
  payload: error
});

export function getMainInfo() {
  return async dispatch => {
    dispatch(gettingMainInfo());

    axios({
      method: 'get',
      url: rootURL(production)+API+'/info',
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => {
      dispatch(gettingMainInfoSuccess(res.data));
    })
    .catch((error) => {
      dispatch(gettingMainInfoFailure(error));
    });
  }
}