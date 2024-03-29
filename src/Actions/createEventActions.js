import axios from 'axios';
import { API, rootURL, production } from '../config'
import { getUserInfo } from './userInfoActions'

export const CREATE_EVENT = "CREATE_EVENT";
export const CREATE_EVENT_SUCCESS = "CREATE_EVENT_SUCCESS";
export const CREATE_EVENT_FAILURE = "CREATE_EVENT_FAILURE";
export const CREATE_EVENT_REDIRECT = "CREATE_EVENT_REDIRECT"
export const CREATE_EVENT_RESET = "CREATE_EVENT_RESET";

export const creatingEvent = () => ({
  type: CREATE_EVENT
});

export const creatingEventSuccess = () => ({
  type: CREATE_EVENT_SUCCESS
});

export const creatingEventFailure = (error) => ({
  type: CREATE_EVENT_FAILURE,
  payload: error
});

export const creatingEventRedirect = () => ({
  type: CREATE_EVENT_REDIRECT
})

export const creatingEventReset = () => ({
  type: CREATE_EVENT_RESET
})

const imageUrl = rootURL(production)+API+'/imageUpload'

export function creatingNewEvent(data, orgID) {
  return async (dispatch, getState) => {
    dispatch(creatingEvent());

    const promises = []

    let files = data.images;
    let filesDict = {}
    try {
      let count = 0
      files.forEach((file) => {
        filesDict[count] = file
        count++
      })
    } catch {
      dispatch(creatingEventFailure("File name must have an extension"))
      console.log("File has no extension");
      return
    }

    // console.log(filesDict)

    Object.keys(filesDict).forEach((key) => {
      const fullFileName = filesDict[key].name.split('.');
      let fileName = key;
      let fileType = fullFileName[fullFileName.length - 1];

      const imageCategory = "eventImages"

      promises.push(axios.post(imageUrl,{
        fileName: fileName,
        fileType: fileType,
        fileSize: filesDict[key].size,
        imageCategory: imageCategory
      }));
    });

    let putPromises = []
    let imageUrlLocations = []
    Promise.all(promises)
    .then((responses) => {
      responses.forEach((response) => {
        const returnData = response.data.data.returnData;
        const newFileType = response.data.data.returnData.fileType
        const signedRequest = returnData.signedRequest;
        const oldName = returnData.oldName;
        const url = returnData.url;
        imageUrlLocations.push(url)
        // console.log(oldName + " image uploaded at " + url)

        const options = {
          headers: {
            'Content-Type': newFileType,
            'Cache-Control': 'max-age=31556926'
          }
        }
        putPromises.push(axios.put(signedRequest, filesDict[oldName], options))
        
      });
      
      Promise.all(putPromises)
      .then((responses) => {
        axios({
          method: 'post',
          url: rootURL(production)+API+'/event/create/' + orgID,
          headers: {'Content-Type': 'application/json'},
          data: {
            name: data.name,
            description: data.description,
            totalNumberOfItems: data.totalNumberOfItems,
            itemsDescription: data.itemsDescription,
            typeOfRation: data.typeOfRation,
            images: imageUrlLocations,
            location: data.location,
            date: data.date
          },
          withCredentials: true,
          credentials: 'include'
        })
        .then((res) => {
          dispatch(creatingEventSuccess())
          dispatch(getUserInfo())
        })
        .catch((error) => {
          console.log(error.response)
          dispatch(creatingEventFailure(error))
          return
        })
      })
      .catch((err) => {
        console.log(JSON.stringify(err))
        dispatch(creatingEventFailure(err))
        return
      });

    })
    .catch((err) => {
      console.log(err);
      dispatch(creatingEventFailure(err));
      return
    });
  }
}