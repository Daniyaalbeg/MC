import axios from 'axios';
import { loggingInSuccess } from '../Actions/authActions';
import { API, rootURL, production } from '../config'

export const SIGNUP = "SIGNUP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const SIGNUP_RESET = "SINGUP_RESET"

export const signingUp = () => ({
  type: SIGNUP
});

export const singupSuccess = () => ({
  type: SIGNUP_SUCCESS
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error
});

export const signupReset = () => ({
  type: SIGNUP_RESET
})

export function signUp(data) {
  return async (dispatch, getState) => {
    dispatch(signingUp());

    //Perform image file link request
    let file = data.imageFile
    let fileParts = file.name.split('.');
    let fileName
    let fileType
    try {
      fileName = fileParts[0];
      fileType = fileParts[1];
    } catch {
      dispatch(signupFailure("File name must end in an extension"))
    }
    let imageCategory = "orgImages"
    
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

        axios({
          method: 'post',
          url: rootURL(production)+API+'/auth/createUser',
          headers: {'Content-Type': 'application/json'},
          data: {
            email: data.email,
            username: data.username,
            password: data.password,
            supplierName: data.supplierName,
            supplierImageURL: url,
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
          }
        })
        .then((res) => {
          dispatch(singupSuccess())
          dispatch(loggingInSuccess(res.data))
        })
        .catch((error) => {
          dispatch(signupFailure(error.response))
        })

      })
      .catch((err) => {
        console.log(err.response)
        console.log(JSON.stringify(err))
        dispatch(signupFailure(err))
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch(signupFailure(err))
    })
  }
}