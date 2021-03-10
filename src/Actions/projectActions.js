import axios from 'axios';
import { API, rootURL, production } from '../config'
import { getUserInfo, getUserInfoBackground } from './userInfoActions'
import { withImageUploadMulti } from './imageUpload';


export const PUBLISH_PROJECT = "PUBLISH_PROJECT"
export const PUBLISH_PROJECT_SUCCESS = "PUBLISH_PROJECT_SUCCESS"
export const PUBLISH_PROJECT_FAILURE = "PUBLISH_PROJECT_FAILURE"

export const publishProject = () => ({
  type: PUBLISH_PROJECT
})
export const publishProjectSuccess = (data) => ({
  type: PUBLISH_PROJECT_SUCCESS,
  payload: data
})
export const publishProjectFailure = (error) => ({
  type: PUBLISH_PROJECT_FAILURE,
  payload: error
})

export function publishingProject(id) {
  return async dispatch => {
    dispatch(publishProject())

    axios({
      method: 'post',
      url: rootURL(production) + API + '/project/publish/' + id,
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
      include: 'credentials'
    })
    .then((res) => {
      dispatch(publishProjectSuccess(res.data))
    })
    .catch((error) => {
      dispatch(publishProjectFailure(error))
    })
  }
}


export const GET_PROJECT_RESET = "GET_PROJECT_RESET"

export const resetProjectGet = () => ({
  type: GET_PROJECT_RESET
})

export const GET_PROJECT = "GET_PROJECT"
export const GET_PROJECT_SUCCESS = "GET_PROJECT_SUCCESS"
export const GET_PROJECT_FAILURE = "GET_PROJECT_FAILURE"

export const gettingProject = () => ({
  type: GET_PROJECT
})
export const gettingProjectSuccess = (data) => ({
  type: GET_PROJECT_SUCCESS,
  payload: data
})
export const gettingProjectFailure = (error) => ({
  type: GET_PROJECT_FAILURE,
  payload: error
})


export function getProject(id) {
  return async dispatch => {
    dispatch(gettingProject())

    axios({
      method: 'get',
      url: rootURL(production) + API + '/project/' + id,
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => {
      dispatch(gettingProjectSuccess(res.data))
    })
    .catch((error) => {
      dispatch(gettingProjectFailure(error))
    })
  }
}





export const GET_PROJECTS = "GET_PROJECTS"
export const GET_PROJECTS_SUCCESS = "GET_PROJECTS_SUCCESS"
export const GET_PROJECTS_FAILURE = "GET_PROJECTS_FAILURE"

export const gettingProjects = () => ({
  type: GET_PROJECTS
})
export const gettingProjectsSuccess = (data) => ({
  type: GET_PROJECTS_SUCCESS,
  payload: data
})
export const gettingProjectsFailure = (error) => ({
  type: GET_PROJECTS_FAILURE,
  payload: error
})


export function getProjects() {
  return async dispatch => {
    dispatch(gettingProjects())

    axios({
      method: 'get',
      url: rootURL(production) + API + '/project',
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => {
      dispatch(gettingProjectsSuccess(res.data))
    })
    .catch((error) => {
      dispatch(gettingProjectsFailure(error))
    })
  }
}




export const GET_PROJECT_BACKGROUND = "GET_PROJECT_BACKGROUND"
export const GET_PROJECT_BACKGROUND_SUCCESS = "GET_PROJECT_BACKGROUND_SUCCESS"
export const GET_PROJECT_BACKGROUND_FAILURE = "GET_PROJECT_BACKGROUND_FAILURE"

export const gettingProjectBackground = () => ({
  type: GET_PROJECT_BACKGROUND
})
export const gettingProjectBackgroundSuccess = (data) => ({
  type: GET_PROJECT_BACKGROUND_SUCCESS,
  payload: data
})
export const gettingProjectBackgroundFailure = (error) => ({
  type: GET_PROJECT_BACKGROUND_FAILURE,
  payload: error
})


export function getProjectBackground(projectID) {
  return async dispatch => {
    dispatch(gettingProjectBackground())

    axios({
      method: 'get',
      url: rootURL(production) + API + '/project/' + projectID,
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => {
      dispatch(gettingProjectBackgroundSuccess(res.data))
    })
    .catch((error) => {
      dispatch(gettingProjectBackgroundFailure(error))
    })
  }
}




export const CREATE_PROJECT = "CREATE_PROJECT"
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS"
export const CREATE_PROJECT_FAILURE = "CREATE_PROJECT_FAILURE"
export const CREATE_PROJECT_RESET = "CREATE_PROJECT_FAILURE"

export const creatingProject = () => ({
  type: CREATE_PROJECT
})
export const creatingProjectSuccess = (data) => ({
  type: CREATE_PROJECT_SUCCESS,
  payload: data
})
export const creatingProjectFailure = (error) => ({
  type: CREATE_PROJECT_FAILURE,
  payload: error
})
export const creatingProjectReset = (error) => ({
  type: CREATE_PROJECT_RESET,
  payload: error
})

export function createProject(data) {
  return async dispatch => {
    dispatch(creatingProject())

    if (data.images.length === 0) {
      sendCreateProjectRequest(dispatch, data)
    } else {
      withImageUploadMulti(dispatch, data, "projectImages", sendCreateProjectRequest, creatingProjectFailure)
    }
  }
}

const sendCreateProjectRequest = (dispatch, data) => {
  axios({
    method: 'post',
    url: rootURL(production) + API + '/project/' + data.orgID,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
    credentials: 'include',
    data: data
  })
  .then((res) => {
    dispatch(creatingProjectSuccess())
    dispatch(getUserInfo())
  })
  .catch((error) => {
    dispatch(creatingProjectFailure(error))
  })
}


export const SELECT_PROJECT_DASHBOARD = "SELECT_PROJECT_DASHBOARD"
export const SELECT_PROJECT_DASHBOARD_SUPPLY = "SELECT_PROJECT_DASHBOARD_SUPPLY"

export const selectProjectDash = (project) => ({
  type: SELECT_PROJECT_DASHBOARD,
  payload: project
})
export const selectProjectDashSupply = (supply) => ({
  type: SELECT_PROJECT_DASHBOARD_SUPPLY,
  payload: supply
})



export const CHANGE_PROJECT_ITEM = "CHANGE_PROJECT_ITEM"
export const CHANGE_PROJECT_ITEM_SUCCESS = "CHANGE_PROJECT_ITEM_SUCCESS"
export const CHANGE_PROJECT_ITEM_FAILURE = "CHANGE_PROJECT_ITEM_FAILURE"
export const CHANGE_PROJECT_ITEM_RESET = "CHANGE_PROJECT_ITEM_RESET"

export const changeProjectItem = () => ({
  type: CHANGE_PROJECT_ITEM
})
export const changeProjectItemSuccess = (data) => ({
  type: CHANGE_PROJECT_ITEM_SUCCESS,
  payload: data
})
export const changeProjectItemFailure = (error) => ({
  type: CHANGE_PROJECT_ITEM_FAILURE,
  payload: error
})
export const changeProjectItemReset = (error) => ({
  type: CHANGE_PROJECT_ITEM_RESET,
  payload: error
})


export const createFunding = (data) => {
  return async dispatch => {
    dispatch(changeProjectItem())

    axios({
      method: 'post',
      url: rootURL(production) + API + '/project/funding/' + data.project._id ,
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
      credentials: 'include',
      data: data
    })
    .then((res) => {
      dispatch(changeProjectItemSuccess(res.data))
      dispatch(getUserInfoBackground())
    })
    .catch((error) => {
      dispatch(changeProjectItemFailure(error))
    })
  }
}


export const createSupply = (data) => {
  return async dispatch => {
    dispatch(changeProjectItem())

    axios({
      method: 'post',
      url: rootURL(production) + API + '/project/supply/' + data.project._id ,
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
      credentials: 'include',
      data: data
    })
    .then((res) => {
      dispatch(changeProjectItemSuccess(res.data))
      // dispatch(addSupplyItem(res.data, data.project.createdByOrganisation, data.project._id))
      dispatch(getUserInfoBackground())
    })
    .catch((error) => {
      dispatch(changeProjectItemFailure(error))
    })
  }
}

export const createVolunteerRequest = (data) => {
  return async dispatch => {
    dispatch(changeProjectItem())

    axios({
      method: 'post',
      url: rootURL(production) + API + '/project/volunteer/' + data.project._id ,
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
      credentials: 'include',
      data: data
    })
    .then((res) => {
      dispatch(changeProjectItemSuccess(res.data))
      dispatch(getUserInfoBackground())
    })
    .catch((error) => {
      dispatch(changeProjectItemFailure(error))
    })
  }
}

export const acceptSupplyRequest = (projectID, supplyID, supplyRequestID) => {
  return async dispatch => {
    dispatch(changeProjectItem())

    axios({
      method: 'post',
      url: rootURL(production) + API + '/project/acceptSupplyRequest/' + projectID +'/'+ supplyID +'/'+ supplyRequestID ,
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      dispatch(changeProjectItemSuccess(res.data))
      dispatch(getUserInfoBackground())
    })
    .catch((error) => {
      dispatch(changeProjectItemFailure(error))
    })
  }
}

export const createFaq = (data) => {
  return async dispatch => {
    dispatch(changeProjectItem())

    axios({
      method: 'post',
      url: rootURL(production) + API + '/project/faq/' + data.project._id ,
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
      credentials: 'include',
      data: data
    })
    .then((res) => {
      dispatch(changeProjectItemSuccess(res.data))
      dispatch(getUserInfoBackground())
    })
    .catch((error) => {
      dispatch(changeProjectItemFailure(error))
    })
  }
}

export const deleteFaq = (project, faqID) => {
  return async dispatch => {
    dispatch(changeProjectItem())

    axios({
      method: 'delete',
      url: `${rootURL(production) + API}/project/faq/${project._id}/${faqID}`,
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      dispatch(changeProjectItemSuccess())
      dispatch(getUserInfoBackground())
    })
    .catch((error) => {
      dispatch(changeProjectItemFailure(error))
    })
  }
}

export const createUpdate = (data) => {
  return async dispatch => {
    dispatch(changeProjectItem())

    if (data.images && data.images.length > 0) {
      withImageUploadMulti(dispatch, data, 'updateImages', sendCreateUpdateRequest, changeProjectItemFailure)
    } else {
      sendCreateUpdateRequest(dispatch, data)
    }
  }
}

const sendCreateUpdateRequest = (dispatch, data) => {
  axios({
    method: 'post',
    url: `${rootURL(production) + API}/project/update/${data.project._id}`,
    data: data,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
    credentials: 'include'
  })
  .then((res) => {
    dispatch(changeProjectItemSuccess())
    dispatch(getUserInfoBackground())
  })
  .catch((error) => {
    dispatch(changeProjectItemFailure(error))
  })
}

export const declineVolunteerRequest = (requestID) => {
  return async dispatch => {
    dispatch(changeProjectItem())

    axios({
      method: 'delete',
      url: `${rootURL(production) + API}/project/volunteerRequest/${requestID}`,
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      dispatch(changeProjectItemSuccess())
      dispatch(getUserInfoBackground())
    })
    .catch((error) => {
      dispatch(changeProjectItemFailure(error))
    })
  }
}

export const acceptVolunteerRequest = (requestID) => {
  return async dispatch => {
    dispatch(changeProjectItem())

    axios({
      method: 'put',
      url: `${rootURL(production) + API}/project/volunteerRequest/${requestID}`,
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      dispatch(changeProjectItemSuccess())
      dispatch(getUserInfoBackground())
    })
    .catch((error) => {
      dispatch(changeProjectItemFailure(error))
    })
  }
}










export const CREATE_PUBLIC_PROJECT_ITEM = "CREATE_PUBLIC_PROJECT_ITEM"
export const CREATE_PUBLIC_PROJECT_ITEM_SUCCESS = "CREATE_PUBLIC_PROJECT_ITEM_SUCCESS"
export const CREATE_PUBLIC_PROJECT_ITEM_FAILURE = "CREATE_PUBLIC_PROJECT_ITEM_FAILURE"
export const CREATE_PUBLIC_PROJECT_ITEM_RESET = "CREATE_PUBLIC_PROJECT_ITEM_RESET"

export const createPublicProjectItem = () => ({
  type: CREATE_PUBLIC_PROJECT_ITEM
})
export const createPublicProjectItemSuccess = (data) => ({
  type: CREATE_PUBLIC_PROJECT_ITEM_SUCCESS,
  payload: data
})
export const createPublicProjectItemFailure = (error) => ({
  type: CREATE_PUBLIC_PROJECT_ITEM_FAILURE,
  payload: error
})
export const createPublicProjectItemReset = () => ({
  type: CREATE_PUBLIC_PROJECT_ITEM_RESET
})

export const creatingPublicProjectSupply = (data, projectID, supplyID) => {
  return async dispatch => {
    dispatch(createPublicProjectItem())

    axios({
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      data: data,
      url: `${rootURL(production) + API}/project/supplyRequest/${projectID}/${supplyID}`,
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      dispatch(createPublicProjectItemSuccess(res.data))
    })
    .catch((error) => {
      dispatch(createPublicProjectItemFailure())
    })
  }
}

export const creatingPublicProjectVolunteerRequest = (data, projectID) => {
  return async dispatch => {
    dispatch(createPublicProjectItem())

    axios({
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      data: data,
      url: `${rootURL(production) + API}/project/volunteerRequest/${projectID}`,
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      dispatch(createPublicProjectItemSuccess(res.data))
    })
    .catch((error) => {
      dispatch(createPublicProjectItemFailure())
    })
  }
}



export const CREATE_COMMENT = "CREATE_COMMENT"
export const CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS"
export const CREATE_COMMENT_FAILURE = "CREATE_COMMENT_FAILURE"

export const createComment = () => ({
  type: CREATE_COMMENT
})
export const createCommentSuccess = (data) => ({
  type: CREATE_COMMENT_SUCCESS,
  payload: data
})
export const createCommentFailure = (error) => ({
  type: CREATE_COMMENT_FAILURE,
  payload: error
})

export const creatingComment = (comment, projectID) => {
  return async dispatch => {
    dispatch(createComment())

    axios({
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      data: comment,
      url: `${rootURL(production) + API}/project/${projectID}/comment`,
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      dispatch(createCommentSuccess(res.data))
      dispatch(getProjectBackground(projectID))
      dispatch(createPublicProjectItemReset())
    })
    .catch((error) => {
      dispatch(createCommentFailure())
    })
  }
}