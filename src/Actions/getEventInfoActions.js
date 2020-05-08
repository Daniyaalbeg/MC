import axios from 'axios';
import { API, rootURL, production } from '../config'

export const GET_EVENT_INFO = "GET_EVENT_INFO";
export const GET_EVENT_INFO_SUCCESS = "GET_EVENT_INFO_SUCCESS";
export const GET_EVENT_INFO_FAILURE = "GET_EVENT_INFO_FAILURE";
export const GET_EVENT_RESET_FETCH = "GET_EVENT_RESET_FETCH";

export const gettingEventInfo = () => ({
  type: GET_EVENT_INFO
});

export const gettingEventInfoSuccess = (data) => ({
  type: GET_EVENT_INFO_SUCCESS,
  payload: data
});

export const gettingEventInfoFailure = (error) => ({
  type: GET_EVENT_INFO_FAILURE,
  payload: error
});

export const getEventResetFetch = () => ({
  type: GET_EVENT_RESET_FETCH
})

export function getEventInfo() {
  return async dispatch => {
    dispatch(gettingEventInfo());

    axios({
      method: 'get',
      url: rootURL(production)+API+'/event',
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => {
      dispatch(gettingEventInfoSuccess(res.data));
    })
    .catch((error) => {
      dispatch(gettingEventInfoFailure(error));
    });
  }
}