import axios from 'axios';
import { rootURL, API, production } from '../config';

const urlImage = rootURL(production)+API+'/imageUpload'

const withImageUploadSingle = (dispatch, data, uploadingSuccess, uploadingFailure, typeOfImage) => {
  //Perform image file link request
  let file = data.image
  let fileParts = file.name.split('.');
  let fileName
  let fileType
  try {
    fileName = fileParts[0];
    fileType = fileParts[1];
  } catch {
    dispatch(uploadingFailure("File name must end in an extension"))
    return
  }

  let imageCategory = typeOfImage
  
  axios.post(rootURL(production)+API+'/imageUpload',{
    fileName: fileName,
    fileType: fileType,
    fileSize: file.size,
    imageCategory: imageCategory
  })
  .then((res) => {
    const returnData = res.data.data.returnData;
    const signedRequest = returnData.signedRequest;
    const url = returnData.url
    // console.log("Recieved a signed request " + signedRequest);
    // console.log(url)

    //create axios put request
    const options = {
      headers: {
        'Content-Type' : fileType,
        'Cache-Control': 'max-age=31556926'
      }
    };

    axios.put(signedRequest, file, options)
    .then((res) => {
      data.image = url
      uploadingSuccess(dispatch, data)
    })
    .catch((err) => {
      dispatch(uploadingFailure(err))
    })
  })
  .catch((err) => {
    console.log(err);
    dispatch(uploadingFailure(err))
  })
}


const withImageUploadMulti = (dispatch, data, typeOfUpload, callSuccess, callFail) => {
  const promises = []

    let files = data.images;
    let filesDict = []
    try {
      let count = 0
      files.forEach((file) => {
        // const name = file.name.split('.')
        filesDict[count] = file
        count++
      })
    } catch {
      dispatch(callFail("File name must have an extension"))
      console.log("File has no extension");
      return
    }

    Object.keys(filesDict).forEach((key) => {
      console.log(filesDict);
      const fullFileName = filesDict[key].name.split('.');
      let fileName = key;
      let fileType = fullFileName[fullFileName.length-1];

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
        callSuccess(dispatch, data)
      })
      .catch((err) => {
        dispatch(callFail(err))
        return
      });

    })
    .catch((err) => {
      dispatch(callFail(err))
      return
    });
}

export {
  withImageUploadSingle,
  withImageUploadMulti
}


