import axios from 'axios'
import { API, rootURL, production } from '../config'
import { getUserInfo } from './userInfoActions'
import { loggingInSuccess } from '../Actions/authActions';
import { withImageUploadSingle } from './imageUpload';


export const CREATE_VOLUNTEER = "CREATE_VOLUNTEER"
export const CREATE_VOLUNTEER_SUCCESS = "CREATE_VOLUNTEER_SUCCESS"
export const CREATE_VOLUNTEER_FAILURE = "CREATE_VOLUNTEER_FAILURE"
export const CREATE_VOLUNTEER_RESET = "CREATE_VOLUNTEER_RESET"

export const createVolunteer = (data) => ({
  type: CREATE_VOLUNTEER,
})
export const createVolunteerSuccess = (data) => ({
  type: CREATE_VOLUNTEER_SUCCESS,
  payload: data
})
export const createVolunteerFailure = (error) => ({
  type: CREATE_VOLUNTEER_FAILURE,
  payload: error
})
export const createVolunteerReset = () => ({
  type: CREATE_VOLUNTEER_RESET
})

export const creatingVolunteer = (data) => {
  return async dispatch => {
    dispatch(createVolunteer())

    if (data.image) {
      withImageUploadSingle(dispatch, data, sendCreateVolunteerRequest, createVolunteerFailure, "volunteerImages")
    } else {
      sendCreateVolunteerRequest(dispatch, data)
    }

  }
}

const sendCreateVolunteerRequest = (dispatch, data) => {
  axios({
    method: 'post',
    url: rootURL(production) + API + '/volunteer/create/',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
    credentials: 'include',
    data: data,
    withCredentials: true,
    credentials: 'include'
  })
  .then((res) => {
    dispatch(createVolunteerSuccess())
    dispatch(getUserInfo())
  })
  .catch((err) => {
    dispatch(createVolunteerFailure(err))
  })
}

export const CREATE_USER_VOLUNTEER = "CREATE_USER_VOLUNTEER"
export const CREATE_USER_VOLUNTEER_SUCCESS = "CREATE_USER_VOLUNTEER_SUCCESS"
export const CREATE_USER_VOLUNTEER_FAILURE = "CREATE_USER_VOLUNTEER_FAILURE"
export const CREATE_USER_VOLUNTEER_RESET = "CREATE_USER_VOLUNTEER_RESET"

export const createUserVolunteer = (data) => ({
  type: CREATE_USER_VOLUNTEER,
})
export const createUserVolunteerSuccess = (data) => ({
  type: CREATE_USER_VOLUNTEER_SUCCESS,
  payload: data
})
export const createUserVolunteerFailure = (error) => ({
  type: CREATE_USER_VOLUNTEER_FAILURE,
  payload: error
})
export const createUserVolunteerReset = () => ({
  type: CREATE_USER_VOLUNTEER_RESET
})

export const creatingUserVolunteer = (data) => {
  return async dispatch => {
    dispatch(createUserVolunteer())

    if (data.imageURL) {
      withImageUploadSingle(dispatch, data, sendCreateUserVolunteerRequest, createUserVolunteerFailure, "volunteerImages")
    } else {
      sendCreateUserVolunteerRequest(dispatch, data)
    }

  }
}

const sendCreateUserVolunteerRequest = (dispatch, data) => {
  axios({
    method: 'post',
    url: rootURL(production) + API + '/user/create/volunteer',
    headers: {'Content-Type': 'application/json'},
    data: data,
    withCredentials: true,
    credentials: 'include'
  })
  .then((res) => {
    dispatch(createUserVolunteerSuccess())
    dispatch(loggingInSuccess(res.data))
  })
  .catch((err) => {
    dispatch(createUserVolunteerFailure(err.response))
  })
}