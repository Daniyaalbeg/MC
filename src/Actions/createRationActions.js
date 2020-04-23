import axios from 'axios';

export const CREATE_RATION = "CREATE_RATION";
export const CREATE_RATION_SUCCESS = "CREATE_RATION_SUCCESS";
export const CREATE_RATION_FAILURE = "CREATE_RATION_FAILURE";

export const creatingRation = () => ({
  type: CREATE_RATION
});

export const creatingRationSuccess = () => ({
  type: CREATE_RATION_SUCCESS
});

export const creatingRationFailure = (error) => ({
  type: CREATE_RATION_FAILURE,
  payload: error
});

const urlImage = 'http://localhost:8000/imageUpload'

export function creatingNewRation(data) {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch(creatingRation());

    const promises = []

    let files = data.images;
    let filesDict = {}
    try {
      files.forEach((file) => {
        const name = file.name.split('.')
        filesDict[name[0]] = file
      })
    } catch {
      dispatch(creatingRationFailure("File name must have an extension"))
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

        const options = {
          headers: {
            'Content-Type': newFileType
          }
        }
        putPromises.push(axios.put(signedRequest, filesDict[oldName], options))
        
      });
      
      Promise.all(putPromises)
      .then((responses) => {
        axios({
          method: 'post',
          url: 'http://localhost:8000/rationEvent/create',
          headers: {'Content-Type': 'application/json', 'x-access-token': token},
          data: {
            name: data.name,
            description: data.description,
            totalNumberOfItems: data.totalNumberOfItems,
            itemsDescription: data.itemsDescription,
            images: imageUrlLocations,
            location: data.location,
            date: data.date
          }
        })
        .then((res) => {
          dispatch(creatingRationSuccess())
        })
        .catch((error) => {
          console.log(error.response)
          dispatch(creatingRationFailure(error))
          return
        })
      })
      .catch((err) => {
        console.log(JSON.stringify(err))
        dispatch(creatingRationFailure(err))
        return
      });

    })
    .catch((err) => {
      console.log(err);
      dispatch(creatingRationFailure(err));
      return
    });
  }
}