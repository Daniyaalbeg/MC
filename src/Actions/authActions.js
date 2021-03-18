import axios from "axios";
import { API, rootURL, production } from "../config";
import { getUserInfo } from "./userInfoActions";

export const LOGIN_ATTEMPT = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT = "LOGOUT";

export const CHECK_COOKIE_ATTEMPT = "CHECK_COOKIE_ATTEMPT";
export const CHECK_COOKIE_ATTEMPT_SUCCESS = "CHECK_COOKIE_ATTEMPT_SUCCESS";
export const CHECK_COOKIE_ATTEMPT_FAILURE = "CHECK_COOKIE_ATTEMPT_FAILURE";

export const loggingIn = () => ({
  type: LOGIN_ATTEMPT,
});

export const loggingInSuccess = (auth) => ({
  type: LOGIN_SUCCESS,
  payload: auth,
});

export const loggingInFailure = () => ({
  type: LOGIN_FAILURE,
});

export const loggingOut = (auth) => ({
  type: LOGOUT,
  payload: auth,
});

export const checkingCookie = () => ({
  type: CHECK_COOKIE_ATTEMPT,
});

export const checkingCookieSuccess = (auth) => ({
  type: CHECK_COOKIE_ATTEMPT_SUCCESS,
  payload: auth,
});

export const checkingCookieFailure = (error) => ({
  type: CHECK_COOKIE_ATTEMPT_FAILURE,
  payload: error,
});

export function logout() {
  return async (dispatch) => {
    axios({
      method: "post",
      url: rootURL(production) + API + "/auth/logout",
      withCredentials: true,
      credentials: "include",
    })
      .then((res) => {
        dispatch(loggingOut(res.data));
        dispatch(getUserInfo());
      })
      .catch((error) => {
        // console.log(error)
      });
  };
}

export function login(auth) {
  return async (dispatch) => {
    dispatch(loggingIn());

    axios({
      method: "post",
      url: rootURL(production) + API + "/auth/login",
      data: {
        email: auth.email,
        password: auth.password,
      },
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
    })
      .then((res) => {
        dispatch(loggingInSuccess(res.data));
      })
      .catch((error) => {
        dispatch(loggingInFailure(error));
      });
  };
}

export function checkCookie() {
  return async (dispatch) => {
    dispatch(checkingCookie());

    axios({
      method: "post",
      url: rootURL(production) + API + "/auth/checkCookie",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
    })
      .then((res) => {
        dispatch(checkingCookieSuccess(res.data));
        dispatch(getUserInfo());
      })
      .catch((error) => {
        // console.log(error)
        dispatch(checkingCookieFailure());
      });
  };
}
