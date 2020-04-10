import axios from 'axios';

export const SIGNUP = "SIGNUP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

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

export function signUp(data) {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch(signingUp());

    axios({
      method: 'post',
      url: 'http://localhost:8000/auth/createUser',
      headers: {'Content-Type': 'application/json', 'x-access-token': token},
      data: {
        email: data.email,
        username: data.username,
        password: data.password,
        supplierName: data.supplierName,
        bankingDetails: data.bankingDetails,
        typeInfo: data.typeInfo,
        areaOfWork: data.areaOfWork,
        description: data.description,
        address: data.address,
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
    })
    .catch((error) => {
      dispatch(signupFailure(error))
    })
  }
}