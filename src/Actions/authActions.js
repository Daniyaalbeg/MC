import axios from 'axios';
import { API, rootURL, production } from '../config'

export const LOGIN_ATTEMPT = "LOGIN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"

export const LOGOUT = "LOGOUT"

export const CHECK_COOKIE_ATTEMPT = "CHECK_COOKIE_ATTEMPT"
export const CHECK_COOKIE_ATTEMPT_SUCCESS = "CHECK_COOKIE_ATTEMPT_SUCCESS"
export const CHECK_COOKIE_ATTEMPT_FAILURE = "CHECK_COOKIE_ATTEMPT_FAILURE"

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

export const loggingOut = () => ({
  type: LOGOUT
})

export const checkingCookie = () => ({
  type: CHECK_COOKIE_ATTEMPT
})

export const checkingCookieSuccess = (auth) => ({
  type: CHECK_COOKIE_ATTEMPT_SUCCESS,
  payload: auth
})

export const checkingCookieFailure = (error) => ({
  type: CHECK_COOKIE_ATTEMPT_FAILURE,
  payload: error
})

export function login(auth) {  
  return async dispatch => {
    dispatch(loggingIn());

    axios({
      method: 'post',
      url: rootURL(production)+API+'/auth/login',
      data: {
        email: auth.email,
        password: auth.password
      },
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      console.log("success response")
      dispatch(loggingInSuccess(res.data));
    })
    .catch((error) => {
      console.log("failed response")
      dispatch(loggingInFailure(error));
    });
  }
}

export function checkCookie() {
  return async dispatch => {
    dispatch(checkingCookie());

    axios({
      method: 'post',
      url: rootURL(production)+API+'/auth/checkCookie',
      headers: {'Content-Type': 'application/json'},
      withCredentials: true, 
      credentials: 'include'
    })
    .then((res) => {
      dispatch(checkingCookieSuccess(res.data))
    })
    .catch((error) => {
      console.log(error)
      dispatch(checkingCookieFailure())
    })
  }
}