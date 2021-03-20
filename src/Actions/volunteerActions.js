import axios from "axios";
import { API, rootURL, production } from "../config";
import { getUserInfo } from "./userInfoActions";
import { loggingInSuccess } from "../Actions/authActions";
import { withImageUploadSingle } from "./imageUpload";

export const GET_VOLUNTEER_RESET = "GET_VOLUNTEER_RESET";

export const resetVolunteerGet = () => ({
  type: GET_VOLUNTEER_RESET,
});

export const GET_VOLUNTEER = "GET_VOLUNTEER";
export const GET_VOLUNTEER_SUCCESS = "GET_VOLUNTEER_SUCCESS";
export const GET_VOLUNTEER_FAILURE = "GET_VOLUNTEER_FAILURE";

export const gettingVolunteer = () => ({
  type: GET_VOLUNTEER,
});
export const gettingVolunteerSuccess = (data) => ({
  type: GET_VOLUNTEER_SUCCESS,
  payload: data,
});
export const gettingVolunteerFailure = (error) => ({
  type: GET_VOLUNTEER_FAILURE,
  payload: error,
});

export function getVolunteer(id) {
  return async (dispatch) => {
    dispatch(gettingVolunteer());

    axios({
      method: "get",
      url: rootURL(production) + API + "/volunteer/" + id,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        dispatch(gettingVolunteerSuccess(res.data));
      })
      .catch((error) => {
        dispatch(gettingVolunteerFailure(error));
      });
  };
}

export const GET_VOLUNTEERS = "GET_VOLUNTEERS";
export const GET_VOLUNTEERS_SUCCESS = "GET_VOLUNTEERS_SUCCESS";
export const GET_VOLUNTEERS_FAILURE = "GET_VOLUNTEERS_FAILURE";

export const gettingVolunteers = () => ({
  type: GET_VOLUNTEERS,
});
export const gettingVolunteersSuccess = (data) => ({
  type: GET_VOLUNTEERS_SUCCESS,
  payload: data,
});
export const gettingVolunteersFailure = (error) => ({
  type: GET_VOLUNTEERS_FAILURE,
  payload: error,
});

export function getVolunteers() {
  return async (dispatch) => {
    dispatch(gettingVolunteers());

    axios({
      method: "get",
      url: rootURL(production) + API + "/volunteer",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        dispatch(gettingVolunteersSuccess(res.data));
      })
      .catch((error) => {
        dispatch(gettingVolunteersFailure(error));
      });
  };
}

export const CREATE_VOLUNTEER = "CREATE_VOLUNTEER";
export const CREATE_VOLUNTEER_SUCCESS = "CREATE_VOLUNTEER_SUCCESS";
export const CREATE_VOLUNTEER_FAILURE = "CREATE_VOLUNTEER_FAILURE";
export const CREATE_VOLUNTEER_RESET = "CREATE_VOLUNTEER_RESET";

export const createVolunteer = (data) => ({
  type: CREATE_VOLUNTEER,
});
export const createVolunteerSuccess = (data) => ({
  type: CREATE_VOLUNTEER_SUCCESS,
  payload: data,
});
export const createVolunteerFailure = (error) => ({
  type: CREATE_VOLUNTEER_FAILURE,
  payload: error,
});
export const createVolunteerReset = () => ({
  type: CREATE_VOLUNTEER_RESET,
});

export const creatingVolunteer = (data) => {
  return async (dispatch) => {
    dispatch(createVolunteer());

    if (data.image) {
      withImageUploadSingle(
        dispatch,
        data,
        sendCreateVolunteerRequest,
        createVolunteerFailure,
        "volunteerImages"
      );
    } else {
      sendCreateVolunteerRequest(dispatch, data);
    }
  };
};

const sendCreateVolunteerRequest = (dispatch, data) => {
  axios({
    method: "post",
    url: rootURL(production) + API + "/volunteer/create/",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    credentials: "include",
    data: data,
  })
    .then((res) => {
      dispatch(createVolunteerSuccess());
      dispatch(getUserInfo());
    })
    .catch((err) => {
      dispatch(createVolunteerFailure(err));
    });
};

export const UPDATE_VOLUNTEER = "UPDATE_VOLUNTEER";
export const UPDATE_VOLUNTEER_SUCCESS = "UPDATE_VOLUNTEER_SUCCESS";
export const UPDATE_VOLUNTEER_FAILURE = "UPDATE_VOLUNTEER_FAILURE";
export const UPDATE_VOLUNTEER_RESET = "UPDATE_VOLUNTEER_RESET";

export const updateVolunteer = (data) => ({
  type: UPDATE_VOLUNTEER,
});
export const updateVolunteerSuccess = (data) => ({
  type: UPDATE_VOLUNTEER_SUCCESS,
  payload: data,
});
export const updateVolunteerFailure = (error) => ({
  type: UPDATE_VOLUNTEER_FAILURE,
  payload: error,
});
export const updateVolunteerReset = () => ({
  type: UPDATE_VOLUNTEER_RESET,
});

export const updatingVolunteer = (data, didUpdloadNewImage) => {
  return async (dispatch) => {
    dispatch(updateVolunteer());

    if (data.image && didUpdloadNewImage) {
      console.log("object");
      console.log(data.image);
      withImageUploadSingle(
        dispatch,
        data,
        sendUpdateVolunteerRequest,
        updateVolunteerFailure,
        "volunteerImages"
      );
    } else {
      sendUpdateVolunteerRequest(dispatch, data);
    }
  };
};

const sendUpdateVolunteerRequest = (dispatch, data) => {
  axios({
    method: "post",
    url: rootURL(production) + API + "/volunteer/update/",
    headers: { "Content-Type": "application/json" },
    data: data,
    withCredentials: true,
    credentials: "include",
  })
    .then((res) => {
      dispatch(updateVolunteerSuccess());
      dispatch(getUserInfo());
    })
    .catch((err) => {
      dispatch(updateVolunteerFailure(err));
    });
};

export const CREATE_USER_VOLUNTEER = "CREATE_USER_VOLUNTEER";
export const CREATE_USER_VOLUNTEER_SUCCESS = "CREATE_USER_VOLUNTEER_SUCCESS";
export const CREATE_USER_VOLUNTEER_FAILURE = "CREATE_USER_VOLUNTEER_FAILURE";
export const CREATE_USER_VOLUNTEER_RESET = "CREATE_USER_VOLUNTEER_RESET";

export const createUserVolunteer = (data) => ({
  type: CREATE_USER_VOLUNTEER,
});
export const createUserVolunteerSuccess = (data) => ({
  type: CREATE_USER_VOLUNTEER_SUCCESS,
  payload: data,
});
export const createUserVolunteerFailure = (error) => ({
  type: CREATE_USER_VOLUNTEER_FAILURE,
  payload: error,
});
export const createUserVolunteerReset = () => ({
  type: CREATE_USER_VOLUNTEER_RESET,
});

export const creatingUserVolunteer = (data) => {
  return async (dispatch) => {
    dispatch(createUserVolunteer());

    if (data.image) {
      withImageUploadSingle(
        dispatch,
        data,
        sendCreateUserVolunteerRequest,
        createUserVolunteerFailure,
        "volunteerImages"
      );
    } else {
      sendCreateUserVolunteerRequest(dispatch, data);
    }
  };
};

const sendCreateUserVolunteerRequest = (dispatch, data) => {
  axios({
    method: "post",
    url: rootURL(production) + API + "/user/create/volunteer",
    headers: { "Content-Type": "application/json" },
    data: data,
    withCredentials: true,
    credentials: "include",
  })
    .then((res) => {
      dispatch(createUserVolunteerSuccess());
      dispatch(loggingInSuccess(res.data));
    })
    .catch((err) => {
      dispatch(createUserVolunteerFailure(err.response));
    });
};
