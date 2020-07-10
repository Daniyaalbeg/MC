import axios from 'axios';
import { rootURL, API, production } from '../config';

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

export {
  withImageUploadSingle
}