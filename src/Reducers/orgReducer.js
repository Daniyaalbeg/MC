import * as actions from '../Actions/getOrgInfoActions';
import * as orgActions from '../Actions/orgActions';
import * as filterSearchActions from '../Actions/filterSearchOrgAction';
import { combineReducers } from 'redux'

const initialStateOrgDash = {
  selectedOrg: null
}

function orgInfoDashReducer(state = initialStateOrgDash, action) {
  switch(action.type) {
    case orgActions.SELECT_ORG_DASHBOARD:
      return {
        ...state,
        selectedOrg: action.payload 
      }
    default: 
      return state
  }
}

const initialState = {
  loading: false,
  hasErros: false,
  fetched: false,
  orgInfo: [],
  filterCategory: "all",
  filterProject: "all",
  search: ""
}

function orgInfoReducer(state = initialState, action) {
  switch(action.type) {
    case actions.GET_ORG_INFO:
      return {
        ...state,
        loading: true
      }
    case actions.GET_ORG_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        fetched: true,
        orgInfo: action.payload
      }
    case actions.GET_ORG_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        hasErros: true,
        fetched: false
      }
    case filterSearchActions.FILTER_ORG_TYPE:
      return {
        ...state,
        filterCategory: action.payload
      }
    case filterSearchActions.FILTER_ORG_PROJECT:
      return {
        ...state,
        filterProject: action.payload
      }
    case filterSearchActions.SEARCH_ORG:
      return {
        ...state,
        search: action.payload.toLowerCase()       
      }
    default:
      return state;
  }
}

export default combineReducers({
  orgMainInfo: orgInfoReducer, 
  orgDashInfo: orgInfoDashReducer
})