import axios from 'axios'
import { API, rootURL, production } from '../config'
import { getUserInfo } from './userInfoActions'
import { withImageUploadSingle } from './imageUpload'

export const UPDATE_EVENT = "UPDATE_EVENT";
export const UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS";
export const UPDATE_EVENT_FAILURE = "UPDATE_EVENT_FAILURE";
export const UPDATE_EVENT_REDIRECT = "UPDATE_EVENT_REDIRECT"

export const UPDATE_ORG = "UPDATE_ORG";
export const UPDATE_ORG_SUCCESS = "UPDATE_ORG_SUCCESS";
export const UPDATE_ORG_FAILURE = "UPDATE_ORG_FAILURE";
export const UPDATE_ORG_REDIRECT = "UPDATE_ORG_REDIRECT"

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

const urlImage = rootURL(production)+API+'/imageUpload'

//Event update
export function updateEvent(data) {
  return async (dispatch) => {
    dispatch(updatingEvent());

    if (data.newImage) {
      withImageUploadMulti(dispatch, data, "eventImages")
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
      date: data.date
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
    url: rootURL(production)+API+'/supplier/update/' + data._id,
    headers: {'Content-Type': 'application/json'},
    data: {
      supplierName: data.supplierName,
      //data.image is different from the model because a generic image upload function is used
      supplierImageURL: data.image,
      bankingDetails: data.bankingDetails,
      type: data.type,
      areaOfWork: data.areaOfWork,
      description: data.description,
      address: data.address,
      contactName: data.contactName,
      contactNumber: data.contactNumber,
      contactInfo: data.contactInfo,
      supplierWebsite: data.supplierWebsite,
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


//Shared
const withImageUploadMulti = (dispatch, data, typeOfUpload) => {
  const promises = []

    let files = data.images;
    let filesDict = {}
    try {
      let count = 0
      files.forEach((file) => {
        // const name = file.name.split('.')
        filesDict[count] = file
        count++
      })
    } catch {
      if (typeOfUpload === "eventImages") {
        dispatch(updatingEventFailure("File name must have an extension"))
      } else {
        dispatch(updatingOrgFailure("File name must have an extension"))
      }
      console.log("File has no extension");
      return
    }

    Object.keys(filesDict).forEach((key) => {
      const fullFileName = filesDict[key].name.split('.');
      let fileName = key;
      let fileType = fullFileName[1];

      const imageCategory = typeOfUpload

      promises.push(axios.post(urlImage,{
        fileName: fileName,
        fileType: fileType,
        fileSize: filesDict[key].size,
        imageCategory: imageCategory
      }));
    });

    let putPromises = []
    let images = []
    Promise.all(promises)
    .then((responses) => {
      responses.forEach((response) => {
        const returnData = response.data.data.returnData;
        const newFileType = response.data.data.returnData.fileType
        const signedRequest = returnData.signedRequest;
        const oldName = returnData.oldName;
        const url = returnData.url;
        images.push(url)

        const options = {
          headers: {
            'Content-Type': newFileType
          }
        }
        putPromises.push(axios.put(signedRequest, filesDict[oldName], options))
        
      });
      
      Promise.all(putPromises)
      .then((responses) => {
        data.images = images
        if (typeOfUpload === "eventImages") {
          updateEventCall(dispatch, data)
        } else {
          updateOrgCall(dispatch, data)
        }
      })
      .catch((err) => {
        if (typeOfUpload === "eventImages") {
          dispatch(updatingEventFailure(err))
        } else {
          dispatch(updatingOrgFailure(err))
        }
        return
      });

    })
    .catch((err) => {
      if (typeOfUpload === "eventImages") {
        dispatch(updatingEventFailure(err))
      } else {
        dispatch(updatingOrgFailure(err))
      }
      return
    });
}
