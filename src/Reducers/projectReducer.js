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

const initialSupplyState = {
  loading: false,
  hasErrors: false,
  success: false,
}

function createSupplyReducer(state = initialSupplyState, action) {
  switch(action.type) {
    case actions.CREATE_SUPPLY:
      return {
        ...state,
        loading: true
      }
    case actions.CREATE_SUPPLY_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        hasErrors: false
      }
    case actions.CREATE_SUPPLY_FAILURE:
      return {
        ...state,
        success: false,
        loading: false,
        hasErrors: true
      }
    case actions.CREATE_SUPPLY_RESET:
      return initialSupplyState
    default:
      return state
  }
}

export default combineReducers({
  createProject: createProjectReducer,
  createSupply: createSupplyReducer
})