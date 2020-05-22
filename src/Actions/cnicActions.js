import axios from 'axios';
import { rootURL, API, production } from '../config.js'

export const GETTING_CNIC = "GETTING_CNIC";
export const GETTING_CNIC_SUCCESS = "GETTING_CNIC_SUCCESS";
export const GETTING_CNIC_FAILURE = "GETTING_CNIC_FAILURE";

export const SELECT_CNIC_EVENT = "SELECT_CNIC_EVENT"

export const CNIC_FILE_UPLOAD = "CNIC_FILE_UPLOAD"
export const CNIC_FILE_UPLOAD_SUCCESS = "CNIC_FILE_UPLOAD_SUCCESS"
export const CNIC_FILE_UPLOAD_FAILURE = "CNIC_FILE_UPLOAD_FAILURE"

export const CNIC_FILE_UPLOAD_RESET = "CNIC_FILE_UPLOAD_RESET"

export const gettingCnic = () => ({
  type: GETTING_CNIC
})
export const gettingCnicSuccess = (data) => ({
  type: GETTING_CNIC_SUCCESS,
  payload: data
})
export const gettingCnicFailure = (error) => ({
  type: GETTING_CNIC_FAILURE,
  payload: error
})

export const selectCnicEvent = (event) => ({
  type: SELECT_CNIC_EVENT,
  payload: event
})

export const uploadingCnicFile = () => ({
  type: CNIC_FILE_UPLOAD
})
export const uploadingCnicFileSuccess = (data) => ({
  type: CNIC_FILE_UPLOAD_SUCCESS,
  payload: data
})
export const uploadingCnicFileFailure = () => ({
  type: CNIC_FILE_UPLOAD_FAILURE
})
export const uploadCnicReset = () => ({
  type: CNIC_FILE_UPLOAD_RESET
})

export function uploadFileCnic(eventID, cnicFile) {
  return async dispatch => {
    dispatch(uploadingCnicFile())

    const fileNameSplit = cnicFile.name.split('.')
    const fileType = fileNameSplit[fileNameSplit.length - 1]

    axios({
      method: 'post',
      url: rootURL(production) +API+ '/getCnicUpload',
      withCredentials: true,
      credentials: 'include',
      data: {
        fileName: cnicFile.name,
        fileType: fileType
      }
    })
    .then((res) => {
      if (res.data.success) {
        const returnData = res.data.data.returnData;
        const signedRequest = returnData.signedRequest;
        const url = returnData.url

        const options = {
          headers: {
            'Content-Type' : fileType,
            'Cache-Control': 'max-age=31556926'
          }
        };

        axios.put(signedRequest, cnicFile, options)
        .then((res) => {

          axios({
            method: 'post',
            url: rootURL(production) +API+ '/cnic/uploadFile',
            withCredentials: true,
            credentials: 'include',
            data: {
              eventID,
              fileURL: url
            }
          })
          .then((res) => {
            dispatch(uploadingCnicFileSuccess(null))
          })
          .catch((err) => {
            console.log(err)
            dispatch(uploadingCnicFileFailure(err))
          }) 

        })
        .catch((err) => {
          console.log(err)
          dispatch(uploadingCnicFileFailure("An error uploading occurred"))
        })
      } else {
        console.log("error here1")
        dispatch(uploadingCnicFileFailure("An error occurred"))
      }
    })
    .catch((err) => {
      console.log(err)
      dispatch(uploadingCnicFileFailure(err))
    })
  }
}

export function uploadCnic(eventID, cnicData, userID) {
  return async dispatch => {
    dispatch(uploadingCnicFile())

    axios({
      method: 'post',
      url: rootURL(production)+API+'/cnic/upload',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        eventID: eventID,
        cnicInfo: cnicData,
        createdByID: userID
      },
      withCredentials: true,
      credentials: 'include'
    }).then((res) => {
      console.log(res)
      dispatch(uploadingCnicFileSuccess(res.data))
    })
    .catch((error) => {
      console.log(error)
      dispatch(uploadingCnicFileFailure(error))
    })
  }
}

export function getCnic(cnicNumber) {
  return async dispatch => {
    dispatch(gettingCnic())

    axios({
      method: 'get',
      url: rootURL(production)+API+ '/cnic/' + cnicNumber,
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      dispatch(gettingCnicSuccess(res.data))
    })
    .catch((error) => {
      dispatch(gettingCnicFailure(handleError(error)))
    });
  }
}

const handleError = (error) => {
  switch(error.response.status) {
    case 401:
      return "Please log in to search CNIC info"
    case 500:
      if (error.response.data.code === 100) {
        return error.response.data.message
      }
      return "An error occurred please contact support"
    default:
      return "An Error occured"

  }
}