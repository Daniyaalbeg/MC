import * as actions from '../Actions/projectActions';
import { combineReducers } from 'redux'

const initialStateCreateProject = {
  loading: false,
  hasErrors: false,
  success: false,
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
    case actions.CREATE_PROJECT_RESET:
      return initialStateCreateProject
    default:
      return state
  }
}

export default combineReducers({
  createProject: createProjectReducer
})