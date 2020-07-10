import axios from 'axios'
import { rootURL, production, API } from '../config'
import { withImageUploadSingle } from './imageUpload'
import { getUserInfo } from '../Actions/userInfoActions';

export const GET_GROUP = "GET_GROUP"
export const GET_GROUP_SUCCESS = "GET_GROUP_SUCCESS"
export const GET_GROUP_FAILURE = "GET_GROUP_FAILURE"

export const CREATE_GROUP = "CREATE_GROUP"
export const CREATE_GROUP_SUCCES = "CREATE_GROUP_SUCCES"
export const CREATE_GROUP_FAILURE = "CREATE_GROUP_FAILURE"

export const gettingGroup = () => ({
  type: GET_GROUP
})
export const gettingGroupSuccess = (data) => ({
  type: GET_GROUP_SUCCESS,
  payload: data
})
export const gettingGroupFailure = (err) => ({
  type: GET_GROUP_FAILURE,
  payload: err
})

export const creatingGroup = () => ({
  type: CREATE_GROUP
})
export const creatingGroupSuccess = (data) => ({
  type: CREATE_GROUP_SUCCES,
  payload: data
})
export const creatingGroupFailure = (err) => ({
  type: CREATE_GROUP_FAILURE,
  payload: err
})

export const getGroups = () => {
  return async dispatch => {
    dispatch(gettingGroup())

    axios({
      method: 'get',
      url: rootURL(production) + API + '/group'
    })
    .then((res) => {
      console.log(res.data)
      dispatch(gettingGroupSuccess(res.data))
    })
    .catch((err) => {
      dispatch(gettingGroupFailure(err))
    })
  }
}

export const createGroup = (data) => {
  return async dispatch => {
    dispatch(creatingGroup())

    if (data.image) {
      createGroupWithImage(dispatch, data)
    } else {
      createGroupCall(dispatch, data)
    }
  }
}

const createGroupWithImage = (dispatch, data) => {
  withImageUploadSingle(dispatch, data, createGroupCall, creatingGroupFailure, "groupImages")
}

const createGroupCall = (dispatch, data) => {
  axios({
    url: rootURL(production) + API + '/group/create',
    method: 'post',
    data: {
      ...data,
      groupImage: data.image
    },
    withCredentials: true,
    credentials: 'include'
  })
  .then((res) => {
    dispatch(creatingGroupSuccess(res.data))
    dispatch(getUserInfo())
  })
  .catch((err) => {
    dispatch(creatingGroupFailure())
  })
}