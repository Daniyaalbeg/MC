import axios from 'axios';
import { API, rootURL, production } from '../config'
import { deleteUserInfoEvent } from './userInfoActions'
import { faGameConsoleHandheld } from '@fortawesome/pro-duotone-svg-icons';

export const DELETE_EVENT = "DELETE_EVENT"
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS"
export const DELETE_EVENT_FAILURE = "DELETE_EVENT_FAILURE"
export const RESET_DELETE = "RESET_DELETE"

export const deletingEvent = () => ({
  type: DELETE_EVENT
})

export const deletingEventSuccess = () => ({
  type: DELETE_EVENT_SUCCESS
})

export const deletingEventFailure = (error) => ({
  type: DELETE_EVENT_FAILURE,
  payload: error
})

export const resetDelete = () => ({
  type: RESET_DELETE
})

export function deleteEvent(eventID) {
  return async dispatch => {
    dispatch(deletingEvent())

    axios({
      method: "delete",
      url: rootURL(production)+API+'/event/'+eventID,
      withCredentials: true,
      credentials: 'include'
    })
    .then(() => {
      dispatch(deletingEventSuccess())
      dispatch(deleteUserInfoEvent(eventID))
    })
    .catch((error) => {
      console.log(error)
      dispatch(deletingEventFailure(error))
      console.log(error.response)
    });
  }
}