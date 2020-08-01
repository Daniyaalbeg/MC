import axios from 'axios';
import { API, rootURL, production } from '../config'

export const GET_ORG_INFO = "GET_ORG_INFO";
export const GET_ORG_INFO_SUCCESS = "GET_ORG_INFO_SUCCESS";
export const GET_ORG_INFO_FAILURE = "GET_ORG_INFO_FAILURE";

export const gettingOrgInfo = () => ({
  type: GET_ORG_INFO
});

export const gettingOrgInfoSuccess = (data) => ({
  type: GET_ORG_INFO_SUCCESS,
  payload: data
});

export const gettingOrgInfoFailure = (error) => ({
  type: GET_ORG_INFO_FAILURE,
  payload: error
});

export function getOrgInfo() {
  return async dispatch => {
    dispatch(gettingOrgInfo());

    axios({
      method: 'get',
      url: rootURL(production)+API+'/organisation',
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => {
      dispatch(gettingOrgInfoSuccess(res.data));
    })
    .catch((error) => {
      dispatch(gettingOrgInfoFailure(error));
    });
  }
}