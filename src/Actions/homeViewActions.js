import axios from 'axios';
import { API, rootURL, production } from '../config'


export const GET_STAT_INFO = "GET_STAT_INFO";
export const GET_STAT_INFO_SUCCESS = "GET_STAT_INFO_SUCCESS";
export const GET_STAT_INFO_FAILURE = "GET_STAT_INFO_FAILURE";

export const gettingStatInfo = () => ({
  type: GET_STAT_INFO
});

export const gettingStatInfoSuccess = (data) => ({
  type: GET_STAT_INFO_SUCCESS,
  payload: data
});

export const gettingStatInfoFailure = (error) => ({
  type: GET_STAT_INFO_FAILURE,
  payload: error
});


export function getStatInfo() {
  return async dispatch => {
    dispatch(gettingStatInfo());

    axios({
      method: 'get',
      url: rootURL(production)+API+'/info',
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => {
      dispatch(gettingStatInfoSuccess(res.data));
    })
    .catch((error) => {
      dispatch(gettingStatInfoFailure(error));
      setTimeout(() => {
        dispatch(getStatInfo())
      }, 2000)
    });
  }
}


export const GET_FEATURED_INFO = "GET_FEATURED_INFO"
export const GET_FEATURED_INFO_SUCCESS = "GET_FEATURED_INFO_SUCCESS"
export const GET_FEATURED_INFO_FAILURE = "GET_FEATURED_INFO_FAILURE"

export const gettingFeaturedInfo = () => ({
  type: GET_FEATURED_INFO
});

export const gettingFeaturedInfoSuccess = (data) => ({
  type: GET_FEATURED_INFO_SUCCESS,
  payload: data
});

export const gettingFeaturedInfoFailure = (error) => ({
  type: GET_FEATURED_INFO_FAILURE,
  payload: error
});


export function getFeaturedInfo() {
  return async dispatch => {
    dispatch(gettingFeaturedInfo());

    axios({
      method: 'get',
      url: rootURL(production)+API+'/info/featured',
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => {
      dispatch(gettingFeaturedInfoSuccess(res.data));
    })
    .catch((error) => {
      dispatch(gettingFeaturedInfoFailure(error));
      setTimeout(() => {
        dispatch(getFeaturedInfo())
      }, 2000)
    });
  }
}