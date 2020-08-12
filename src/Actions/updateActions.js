import axios from 'axios'
import { API, rootURL, production } from '../config'
import { getUserInfo } from './userInfoActions'
import { withImageUploadSingle, withImageUploadMulti } from './imageUpload'

export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
export const UPDATE_USER_REDIRECT = "UPDATE_USER_REDIRECT"

export const UPDATE_EVENT = "UPDATE_EVENT";
export const UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS";
export const UPDATE_EVENT_FAILURE = "UPDATE_EVENT_FAILURE";
export const UPDATE_EVENT_REDIRECT = "UPDATE_EVENT_REDIRECT"

export const UPDATE_ORG = "UPDATE_ORG";
export const UPDATE_ORG_SUCCESS = "UPDATE_ORG_SUCCESS";
export const UPDATE_ORG_FAILURE = "UPDATE_ORG_FAILURE";
export const UPDATE_ORG_REDIRECT = "UPDATE_ORG_REDIRECT"

export const updatingUser = () => ({
  type: UPDATE_USER
});
export const updatingUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS
});
export const updatingUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error
});
export const updatingUserRedirect = () => ({
  type: UPDATE_USER_REDIRECT
})

export const updatingEvent = () => ({
  type: UPDATE_EVENT
});
export const updatingEventSuccess = () => ({
  type: UPDATE_EVENT_SUCCESS
});
export const updatingEventFailure = (error) => ({
  type: UPDATE_EVENT_FAILURE,
  payload: error
});
export const updatingEventRedirect = () => ({
  type: UPDATE_EVENT_REDIRECT
})

export const updatingOrg = () => ({
  type: UPDATE_ORG
});
export const updatingOrgSuccess = () => ({
  type: UPDATE_ORG_SUCCESS
});
export const updatingOrgFailure = (error) => ({
  type: UPDATE_ORG_FAILURE,
  payload: error
});
export const updatingOrgRedirect = () => ({
  type: UPDATE_ORG_REDIRECT
})



//User Update

export function updateUser(data) {
  return async dispatch => {
    dispatch(updatingUser())

    axios({
      method: 'post',
      url: rootURL(production) + API + '/user/edit',
      data: data,
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      dispatch(updatingUserSuccess(res.data))
      dispatch(getUserInfo())
    })
    .catch((error) => {
      dispatch(updatingUserFailure(error))
    })
  }
}

//Event update
export function updateEvent(data) {
  return async (dispatch) => {
    dispatch(updatingEvent());

    if (data.newImage) {
      withImageUploadMulti(dispatch, data, "eventImages", updateEventCall, updatingEventFailure)
    } else {
      updateEventCall(dispatch, data)
    }
  }
}

const updateEventCall = (dispatch, data) => {
  axios({
    method: 'post',
    url: rootURL(production)+API+'/event/update/' + data._id,
    headers: {'Content-Type': 'application/json'},
    data: {
      name: data.name,
      description: data.description,
      totalNumberOfItems: data.totalNumberOfItems,
      itemsDescription: data.itemsDescription,
      typeOfRation: data.typeOfRation,
      images: data.images,
      location: data.location,
      date: data.date,
      _id: data._id,
      createdBy: data.createdBy
    },
    withCredentials: true,
    credentials: 'include'
  })
  .then((res) => {
    dispatch(updatingEventSuccess())
    dispatch(getUserInfo())
  })
  .catch((error) => {
    // console.log(error.response)
    dispatch(updatingEventFailure(error))
    return
  })
}

//Org update
export function updateOrg(data) {
  return async (dispatch) => {
    dispatch(updatingOrg());

    if (data.newImage) {
      withImageUploadSingle(dispatch, data, updateOrgCall, updatingOrgFailure, "orgImages")
    } else {
      updateOrgCall(dispatch, data)
    }
  }
}

const updateOrgCall = (dispatch, data) => {
  axios({
    method: 'post',
    url: rootURL(production)+API+'/organisation/update/' + data._id,
    headers: {'Content-Type': 'application/json'},
    data: {
      name: data.name,
      //data.image is different from the model because a generic image upload function is used
      imageURL: data.image,
      bankingDetails: data.bankingDetails,
      type: data.type,
      areaOfWork: data.areaOfWork,
      description: data.description,
      address: data.address,
      contactName: data.contactName,
      contactNumber: data.contactNumber,
      contactInfo: data.contactInfo,
      website: data.website,
      facebookURL: data.facebookURL,
      twitterURL: data.twitterURL,
      instagramURL: data.instagramURL
    },
    withCredentials: true,
    credentials: 'include'
  })
  .then((res) => {
    dispatch(updatingOrgSuccess())
    dispatch(getUserInfo())
  })
  .catch((error) => {
    // console.log(error.response)
    dispatch(updatingOrgFailure(error))
    return
  })
}
