import axios from 'axios';

export const LOGIN_ATTEMPT = "LOGIN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"

export const loggingIn = () => ({
  type: LOGIN_ATTEMPT,
})

export const loggingInSuccess = (auth) => ({
  type: LOGIN_SUCCESS,
  payload: auth
})

export const loggingInFailure = () => ({
  type: LOGIN_FAILURE
})

export function login(auth) {  
  return async dispatch => {
    dispatch(loggingIn());

    axios({
      method: 'post',
      url: 'http://localhost:8000/auth/login',
      data: {
        email: auth.email,
        password: auth.password
      },
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => {
      dispatch(loggingInSuccess(res.data));
    })
    .catch((error) => {
      dispatch(loggingInFailure());
    });
  }
}