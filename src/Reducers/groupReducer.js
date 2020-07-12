import * as actions from '../Actions/groupActions';
import { combineReducers } from 'redux';

const createGroupInitialState = {
  loading: false,
  hasErrors: false,
  success: false
}

function createGroupReducer(state = createGroupInitialState, action) {
  switch(action.type) {
    case actions.CREATE_GROUP:
      return {
        ...state,
        loading: true,
        hasErrors: false,
        success: false
      }
    case actions.CREATE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        hasErrors: false,
        success: true
      }
    case actions.CREATE_GROUP_FAILURE:
      return {
        ...state,
        loading: false,
        hasErrors: true,
        success: false
      }
    case actions.RESET_CREATE_GROUP:
      return createGroupInitialState
    default:
      return state
  }
}

const groupDataIntialState = {
  loading: false,
  fetched: false,
  hasErrors: false,
  groups: []
}

function groupDataReducer( state = groupDataIntialState, action) {
  switch(action.type) {
    case actions.GET_GROUP:
      return {
        ...state,
        loading: true,
        fetched: false,
        hasErrors: false
      }
    case actions.GET_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        fetched: true,
        hasErrors: false,
        groups: action.payload
      }
    case actions.GET_GROUP_FAILURE:
      return {
        ...state,
        loading: false,
        fetched: false,
        hasErrors: true
      }
    default:
      return state
  }
}

const groupReducer = combineReducers({
  createGroup: createGroupReducer,
  groupData: groupDataReducer
})

export default groupReducer