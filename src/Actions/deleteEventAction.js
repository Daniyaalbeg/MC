import axios from 'axios';
import { API, rootURL, production } from '../config'
import { deleteUserInfoEvent } from './userInfoActions'

export const DELETE_EVENT = "DELETE_EVENT"
export const DELETE_EVENT_SUCCES = "DELETE_EVENT_SUCCES"
export const DELETE_EVENT_FAILURE = "DELETE_EVENT_FAILURE"
export const RESET_DELETE = "RESET_DELETE"

export const deletingEvent = () => ({
  type: DELETE_EVENT
})

export const deletingEventSuccess = () => ({
  type: DELETE_EVENT_SUCCES
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
      console.log("error")
      console.log(error)
      console.log(error.response)
      dispatch(deletingEventFailure(error))
    });
  }
}