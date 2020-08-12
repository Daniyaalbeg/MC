import axios from 'axios';
import { API, rootURL, production } from '../config'
import { getUserInfo } from './userInfoActions'
import { withImageUploadMulti } from './imageUpload';

export const GET_PROJECT = "GET_PROJECT"
export const GET_PROJECT_SUCCESS = "GET_PROJECT_SUCCESS"
export const GET_PROJECT_FAILURE = "GET_PROJECT_FAILURE"

export const CREATE_PROJECT = "CREATE_PROJECT"
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS"
export const CREATE_PROJECT_FAILURE = "CREATE_PROJECT_FAILURE"
export const CREATE_PROJECT_RESET = "CREATE_PROJECT_FAILURE"

export const gettingProject = () => ({
  type: GET_PROJECT
})
export const gettingProjectSuccess = (data) => ({
  type: GET_PROJECT_SUCCESS,
  payload: data
})
export const gettingProjectFailure = (error) => ({
  type: GET_PROJECT_FAILURE,
  payload: error
})

export const creatingProject = () => ({
  type: CREATE_PROJECT
})
export const creatingProjectSuccess = (data) => ({
  type: CREATE_PROJECT_SUCCESS,
  payload: data
})
export const creatingProjectFailure = (error) => ({
  type: CREATE_PROJECT_FAILURE,
  payload: error
})
export const creatingProjectReset = (error) => ({
  type: CREATE_PROJECT_RESET,
  payload: error
})

export function getProject() {
  return async dispatch => {
    dispatch(gettingProject())

    axios({
      method: 'get',
      url: rootURL(production) + API + '/project',
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => {
      dispatch(gettingProjectSuccess(res.data))
    })
    .catch((error) => {
      dispatch(gettingProjectFailure(error))
    })
  }
}

export function createProject(data) {
  return async dispatch => {
    dispatch(creatingProject())

    if (data.images.length === 0) {
      sendCreateProjectRequest(dispatch, data)
    } else {
      withImageUploadMulti(dispatch, data, "projectImages", sendCreateProjectRequest, creatingProjectFailure)
    }
  }
}

const sendCreateProjectRequest = (dispatch, data) => {
  axios({
    method: 'post',
    url: rootURL(production) + API + '/project/' + data.orgID,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
    credentials: 'include',
    data: data
  })
  .then((res) => {
    dispatch(creatingProjectSuccess())
    dispatch(getUserInfo())
  })
  .catch((error) => {
    dispatch(creatingProjectFailure(error))
  })
}

