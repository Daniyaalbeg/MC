import axios from 'axios'
import { rootURL, production, API } from '../config'
import { withImageUploadSingle } from './imageUpload'
import { getUserInfo } from '../Actions/userInfoActions';
import { deleteUserInfoGroup } from './userInfoActions'
import { RESET_DELETE } from './deleteEventAction';

export const GET_GROUP = "GET_GROUP"
export const GET_GROUP_SUCCESS = "GET_GROUP_SUCCESS"
export const GET_GROUP_FAILURE = "GET_GROUP_FAILURE"

export const CREATE_GROUP = "CREATE_GROUP"
export const CREATE_GROUP_SUCCESS = "CREATE_GROUP_SUCCESS"
export const CREATE_GROUP_FAILURE = "CREATE_GROUP_FAILURE"

export const DELETE_GROUP = "DELETE_GROUP"
export const DELETE_GROUP_SUCCESS = "DELETE_GROUP_SUCCESS"
export const DELETE_GROUP_FAILURE = "DELETE_GROUP_FAILURE"

export const RESET_CREATE_GROUP = "RESET_CREATE_GROUP"
export const RESET_DELETE_GROUP = "RESET_DELETE_GROUP"


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
  type: CREATE_GROUP_SUCCESS,
  payload: data
})
export const creatingGroupFailure = (err) => ({
  type: CREATE_GROUP_FAILURE,
  payload: err
})

export const deletingGroup = () => ({
  type: DELETE_GROUP
})
export const deletingGroupSuccess = (data) => ({
  type: DELETE_GROUP_SUCCESS,
  payload: data
})
export const deletingGroupFailure = (err) => ({
  type: DELETE_GROUP_FAILURE,
  payload: err
})
export const resettingDeleteGroup = () => ({
  type: RESET_DELETE_GROUP
})

export const resettingCreateGroup = () => ({
  type: RESET_CREATE_GROUP,
})

export const deleteGroup = (id) => {
  return async dispatch => {
    dispatch(deletingGroup())

    axios({
      url: rootURL(production) + API + '/group/delete/' + id,
      method: 'delete',
      withCredentials: true,
      crednetials: 'include'
    })
    .then((res) => {
      dispatch(deletingGroupSuccess())
      dispatch(deleteUserInfoGroup(id))
    })
    .catch((err) => {
      console.log(err)
      dispatch(deletingGroupFailure(err.data))
    })
  }
}

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