import axios from 'axios';
import { API, rootURL, production } from '../config'

export const GET_MAP_INFO = "GET_MAP_INFO";
export const GET_MAP_INFO_SUCCESS = "GET_MAP_INFO_SUCCESS";
export const GET_MAP_INFO_FAILURE = "GET_MAP_INFO_FAILURE";
export const GET_MAP_RESET_FETCH = "GET_MAP_RESET_FETCH";

export const gettingMapInfo = () => ({
  type: GET_MAP_INFO
});

export const gettingMapInfoSuccess = (data) => ({
  type: GET_MAP_INFO_SUCCESS,
  payload: data
});

export const gettingMapInfoFailure = (error) => ({
  type: GET_MAP_INFO_FAILURE,
  payload: error
});

export const getMapResetFetch = () => ({
  type: GET_MAP_RESET_FETCH
})

export function getMapEventInfo() {
  return async (dispatch, getState) => {
    // const filter = getState().mapInfo.mapActions.filter
    const filterCategory = getState().mapInfo.mapActions.filterCategory
    const search = getState().mapInfo.mapActions.search
  
    dispatch(gettingMapInfo());

    axios({
      method: 'get',
      url: rootURL(production)+API+'/event',
      headers: {'Content-Type': 'application/json'},
      params: {
        // filter: filter,
        filterCategory: filterCategory,
        search: search
      }
    })
    .then((res) => {
      dispatch(gettingMapInfoSuccess(res.data));
    })
    .catch((error) => {
      dispatch(gettingMapInfoFailure(error));
    });
  }
}

export function getMapProjectInfo() {
  return async (dispatch, getState) => {
    const filterCategory = getState().mapInfo.mapActions.filterCategory
    const search = getState().mapInfo.mapActions.search

    dispatch(gettingMapInfo());

    axios({
      method: 'get',
      url: rootURL(production)+API+'/project/map',
      headers: {'Content-Type': 'application/json'},
      params: {
        filterCategory: filterCategory,
        search: search
      }
    })
    .then((res) => {
      dispatch(gettingMapInfoSuccess(res.data));
    })
    .catch((error) => {
      dispatch(gettingMapInfoFailure(error));
    });
  }
}