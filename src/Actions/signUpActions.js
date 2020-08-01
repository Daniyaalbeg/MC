import axios from 'axios';
import { loggingInSuccess } from '../Actions/authActions';
import { getUserInfo } from '../Actions/userInfoActions';
import { API, rootURL, production } from '../config';

export const SIGNUP = "SIGNUP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const SIGNUP_RESET = "SINGUP_RESET"


export const signingUp = () => ({
  type: SIGNUP
});

export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error
});

export const signupReset = () => ({
  type: SIGNUP_RESET
})

export function signUpUser(data) {
  return async dispatch => {
    dispatch(signingUp())

    const address = ({
      line1: data.addressLine1,
      city: data.city,
      region: data.region,
      postCode: data.postCode,
      country: data.country,
    })

    axios({
      method: 'post',
      url: rootURL(production) + API + '/user/create',
      headers: { 'Content-Type': 'application/json'},
      data: {
        email: data.email,
        username: data.username,
        password: data.password,
        mobile: data.mobile,
        cnic: data.cnic.replace('-',''),
        address: address
      },
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      dispatch(signupSuccess())
      dispatch(loggingInSuccess(res.data))
    })
    .catch((err) => {
      dispatch(signupFailure(err.response))
    })
  }
}


export function signUpOrg(data) {
  return async dispatch => {
    dispatch(signingUp());
    if (data.imageFile) {
      signUpOrgWithImage(data, dispatch)
    } else {
      signUpOrgWithoutImage(data, dispatch)
    }
  }
}

const signUpOrgWithoutImage = (data, dispatch) => {
  axios({
    method: 'post',
    url: rootURL(production)+API+'/organisation/create',
    headers: {'Content-Type': 'application/json'},
    data: data,
    withCredentials: true,
    credentials: 'include'
  })
  .then((res) => {
    dispatch(signupSuccess())
    dispatch(getUserInfo())
  })
  .catch((error) => {
    dispatch(signupFailure(error.response))
  })  
}

const signUpOrgWithImage = (data, dispatch) => {
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

      data.imageURL = url

      axios({
        method: 'post',
        url: rootURL(production)+API+'/organisation/create',
        headers: {'Content-Type': 'application/json'},
        data: data,
        withCredentials: true,
        credentials: 'include'
      })
      .then((res) => {
        dispatch(signupSuccess())
        dispatch(getUserInfo())
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