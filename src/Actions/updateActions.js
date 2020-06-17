import axios from 'axios';
import { API, rootURL, production } from '../config'
import { getUserInfo } from './userInfoActions'

export const UPDATE_EVENT = "UPDATE_EVENT";
export const UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS";
export const UPDATE_EVENT_FAILURE = "UPDATE_EVENT_FAILURE";
export const UPDATE_EVENT_REDIRECT = "UPDATE_EVENT_REDIRECT"

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

const urlImage = rootURL(production)+API+'/imageUpload'

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

const withoutImageUpload = (dispatch, data) => {
  updateEventCall(dispatch, data)
}

const withImageUpload = (dispatch, data) => {
  const promises = []

    let files = data.images;
    let filesDict = {}
    try {
      files.forEach((file) => {
        const name = file.name.split('.')
        filesDict[name[0]] = file
      })
    } catch {
      dispatch(updatingEventFailure("File name must have an extension"))
      console.log("File has no extension");
      return
    }

    Object.keys(filesDict).forEach((key) => {
      const fullFileName = filesDict[key].name.split('.');
      let fileName = key;
      let fileType = fullFileName[1];

      const imageCategory = "eventImages"

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
        updateEventCall(dispatch, data)
      })
      .catch((err) => {
        dispatch(updatingEventFailure(err))
        return
      });

    })
    .catch((err) => {
      dispatch(updatingEventFailure(err));
      return
    });
}

export function updateEvent(data) {
  return async (dispatch, getState) => {
    dispatch(updatingEvent());

    if (data.newImage) {
      withImageUpload(dispatch, data)
    } else {
      withoutImageUpload(dispatch, data)
    }
  }
}