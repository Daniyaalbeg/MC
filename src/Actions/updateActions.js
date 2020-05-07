import axios from 'axios';
import { API, rootURL, production } from '../config'
import { getUserInfo } from './userInfoActions'

export const UPDATE_RATION = "UPDATE_RATION";
export const UPDATE_RATION_SUCCESS = "UPDATE_RATION_SUCCESS";
export const UPDATE_RATION_FAILURE = "UPDATE_RATION_FAILURE";
export const UPDATE_RATION_REDIRECT = "UPDATE_RATION_REDIRECT"

export const updatingRation = () => ({
  type: UPDATE_RATION
});

export const updatingRationSuccess = () => ({
  type: UPDATE_RATION_SUCCESS
});

export const updatingRationFailure = (error) => ({
  type: UPDATE_RATION_FAILURE,
  payload: error
});

export const updatingRationRedirect = () => ({
  type: UPDATE_RATION_REDIRECT
})

const urlImage = rootURL(production)+API+'/imageUpload'

const updateRationCall = (dispatch, data) => {
  console.log(JSON.stringify(data))
  axios({
    method: 'post',
    url: rootURL(production)+API+'/rationEvent/update/' + data._id,
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
    dispatch(updatingRationSuccess())
    dispatch(getUserInfo())
  })
  .catch((error) => {
    // console.log(error.response)
    dispatch(updatingRationFailure(error))
    return
  })
}

const withoutImageUpload = (dispatch, data) => {
  updateRationCall(dispatch, data)
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
      dispatch(updatingRationFailure("File name must have an extension"))
      console.log("File has no extension");
      return
    }

    Object.keys(filesDict).forEach((key) => {
      const fullFileName = filesDict[key].name.split('.');
      let fileName = key;
      let fileType = fullFileName[1];

      const imageCategory = "rationImages"

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
        updateRationCall(dispatch, data)
      })
      .catch((err) => {
        dispatch(updatingRationFailure(err))
        return
      });

    })
    .catch((err) => {
      dispatch(updatingRationFailure(err));
      return
    });
}

export function updateRation(data) {
  return async (dispatch, getState) => {
    dispatch(updatingRation());

    if (data.newImage) {
      withImageUpload(dispatch, data)
    } else {
      withoutImageUpload(dispatch, data)
    }
  }
}