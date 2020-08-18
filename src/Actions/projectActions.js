import axios from 'axios';
import { API, rootURL, production } from '../config'
import { getUserInfo, addNewSupplyItem } from './userInfoActions'
import { withImageUploadMulti } from './imageUpload';

export const GET_PROJECT = "GET_PROJECT"
export const GET_PROJECT_SUCCESS = "GET_PROJECT_SUCCESS"
export const GET_PROJECT_FAILURE = "GET_PROJECT_FAILURE"

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




export const CREATE_PROJECT = "CREATE_PROJECT"
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS"
export const CREATE_PROJECT_FAILURE = "CREATE_PROJECT_FAILURE"
export const CREATE_PROJECT_RESET = "CREATE_PROJECT_FAILURE"

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




export const CREATE_SUPPLY = "CREATE_SUPPLY"
export const CREATE_SUPPLY_SUCCESS = "CREATE_SUPPLY_SUCCESS"
export const CREATE_SUPPLY_FAILURE = "CREATE_SUPPLY_FAILURE"
export const CREATE_SUPPLY_RESET = "CREATE_SUPPLY_RESET"

export const creatingSupply = () => ({
  type: CREATE_SUPPLY
})
export const creatingSupplySuccess = (data) => ({
  type: CREATE_SUPPLY_SUCCESS,
  payload: data
})
export const creatingSupplyFailure = (error) => ({
  type: CREATE_SUPPLY_FAILURE,
  payload: error
})
export const creatingSupplyReset = (error) => ({
  type: CREATE_SUPPLY_RESET,
  payload: error
})

export const createSupply = (data, project) => {
  return async dispatch => {
    dispatch(creatingSupply())

    axios({
      method: 'post',
      url: rootURL(production) + API + '/project/supply/' + project._id ,
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
      credentials: 'include',
      data: data
    })
    .then((res) => {
      dispatch(creatingSupplySuccess(res.data))
      dispatch(addNewSupplyItem(res.data, project.createdByOrganisation, project._id))
    })
    .catch((error) => {
      dispatch(creatingSupplyFailure(error))
    })
  }
}