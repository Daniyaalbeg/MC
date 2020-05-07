import axios from 'axios';
import { API, rootURL, production } from '../config'
import { deleteUserInfoRation } from './userInfoActions'

export const DELETE_RATION = "DELETE_RATION"
export const DELETE_RATION_SUCCES = "DELETE_RATION_SUCCES"
export const DELETE_RATION_FAILURE = "DELETE_RATION_FAILURE"
export const RESET_DELETE = "RESET_DELETE"

export const deletingRation = () => ({
  type: DELETE_RATION
})

export const deletingRationSuccess = () => ({
  type: DELETE_RATION_SUCCES
})

export const deletingRationFailure = (error) => ({
  type: DELETE_RATION_FAILURE,
  payload: error
})

export const resetDelete = () => ({
  type: RESET_DELETE
})

export function deleteRation(rationID) {
  return async dispatch => {
    dispatch(deletingRation())

    axios({
      method: "delete",
      url: rootURL(production)+API+'/rationEvent/'+rationID,
      withCredentials: true,
      credentials: 'include'
    })
    .then(() => {
      dispatch(deletingRationSuccess())
      dispatch(deleteUserInfoRation(rationID))
    })
    .catch((error) => {
      console.log("error")
      console.log(error)
      console.log(error.response)
      dispatch(deletingRationFailure(error))
    });
  }
}