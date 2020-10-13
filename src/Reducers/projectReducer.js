import * as actions from '../Actions/projectActions';
import * as fsActions from '../Actions/filterMainProjectActions';
import { combineReducers } from 'redux'

const intialProjectMainCreate = {
  loading: false,
  hasErrors: false,
  success: false,
}

function createProjectMainCreateReducer(state=intialProjectMainCreate, action) {
  switch(action.type) {
    case actions.CREATE_COMMENT:
      return {
        ...state,
        loading: true,
        hasErrors: false,
        success: false
      }
    case actions.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        hasErrors: false,
        success: true
      }
    case actions.CREATE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        hasErrors: true,
        success: false
      }
    case actions.CREATE_PUBLIC_PROJECT_ITEM:
      return {
        ...state,
        loading: true,
        hasErrors: false,
        success: false
      }
    case actions.CREATE_PUBLIC_PROJECT_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        hasErrors: false,
        success: true
      }
    case actions.CREATE_PUBLIC_PROJECT_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        hasErrors: true,
        success: false
      }
    case actions.CREATE_PUBLIC_PROJECT_ITEM_RESET:
      return intialProjectMainCreate
    default:
      return state
  }
}

const initialProjectMainInfo = {
  loading: false,
  hasErrors: false,
  fetched: false,
  selectedProject: null,
  projects: [],
  searchTerm: "",
  filterTerms: []
}

function createProjectMainInfoReducer(state = initialProjectMainInfo, action) {
  switch(action.type) {
    case actions.GET_PROJECTS:
      return {
        ...state,
        loading: true,
        hasErrors: false,
        fetched: false
      }
    case actions.GET_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        hasErrors: false,
        fetched: true,
        projects: action.payload
      }
    case actions.GET_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        hasErrors: true,
        fetched: false
      }
    case actions.GET_PROJECT:
      return {
        ...state,
        loading: true,
        hasErrors: false,
        fetched: false
      }
    case actions.GET_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        hasErrors: false,
        fetched: true,
        selectedProject: action.payload
      }
    case actions.GET_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        hasErrors: true,
        fetched: false
      }
    case actions.GET_PROJECT_RESET: {
      return {
        loading: false,
        fetched: false,
        hasErrors: false
      }
    }
    case fsActions.FILTER_MAIN_PROJECT:
      return {
        ...state,
        filterTerms: action.payload
      }
    case fsActions.SEARCH_MAIN_PROJECT:
      return {
        ...state,
        searchTerm: action.payload
      }
    case actions.GET_PROJECT_BACKGROUND:
      return {
        ...state,
        // loading: true,
        // hasErrors: false,
        // fetched: false
      }
    case actions.GET_PROJECT_BACKGROUND_SUCCESS:
      return {
        ...state,
        // loading: false,
        // hasErrors: false,
        // fetched: true,
        selectedProject: action.payload
      }
    case actions.GET_PROJECT_BACKGROUND_FAILURE:
      return {
        ...state,
        // loading: false,
        // hasErrors: true,
        // fetched: false
      }
    default:
      return state
  }
}



const initialStateCreateProject = {
  loading: false,
  hasErrors: false,
  success: false,
  selectedProjectDashBoard: null,
  selectedProjectDashBoardSupply: null
}

function createProjectReducer(state = initialStateCreateProject, action) {
  switch(action.type) {
    case actions.CREATE_PROJECT:
      return {
        ...state,
        loading: true,
        hasErrors: false,
        success: false
      }
    case actions.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        hasErrors: false,
        success: true
      }
    case actions.CREATE_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        hasErrors: true,
        success: false
      }
    case actions.PUBLISH_PROJECT:
      return {
        ...state,
        loading: true,
        hasErrors: false,
        success: false
      }
    case actions.PUBLISH_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        hasErrors: false,
        success: true
      }
    case actions.PUBLISH_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        hasErrors: true,
        success: false
      }
    case actions.CREATE_PROJECT_RESET:
      return initialStateCreateProject
    case actions.SELECT_PROJECT_DASHBOARD:
      return {
        ...state,
        selectedProjectDashBoard: action.payload
      }
    case actions.SELECT_PROJECT_DASHBOARD_SUPPLY:
      return {
        ...state,
        selectedProjectDashBoardSupply: action.payload
      }
    default:
      return state
  }
}

const initialCreateProjectItemState = {
  loading: false,
  hasErrors: false,
  success: false,
}

function createProjectItemReducer(state = initialCreateProjectItemState, action) {
  switch(action.type) {
    case actions.CHANGE_PROJECT_ITEM:
      return {
        ...state,
        loading: true
      }
    case actions.CHANGE_PROJECT_ITEM_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        hasErrors: false
      }
    case actions.CHANGE_PROJECT_ITEM_FAILURE:
      return {
        ...state,
        success: false,
        loading: false,
        hasErrors: true
      }
    case actions.CHANGE_PROJECT_ITEM_RESET:
      return initialCreateProjectItemState
    default:
      return state
  }
}

export default combineReducers({
  mainProject: createProjectMainInfoReducer,
  mainProjectCreate: createProjectMainCreateReducer,
  createProject: createProjectReducer,
  createProjectItem: createProjectItemReducer
})