import * as actions from '../Actions/deleteEventAction';
import * as groupActions from '../Actions/groupActions';
import { combineReducers } from 'redux';

const initialDeleteEventState = {
  deleting: false,
  hasErrors: false,
  deleted: false
}

function createDeleteEventReducer(state = initialDeleteEventState, action) {
  switch(action.type) {
    case actions.DELETE_EVENT:
      return {
        ...state,
        deleted: false,
        deleting: true
      }
    case actions.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true
      }
    case actions.DELETE_EVENT_FAILURE:
      return {
        deleting: false,
        hasErrors: true,
        deleted: false
      }
    case actions.RESET_DELETE:
      return initialDeleteEventState
    default:
      return state
  }
}

const initialDeleteGroupState = {
  deleting: false,
  hasErrors: false,
  deleted: false
}

function createDeleteGroupReducer(state = initialDeleteGroupState, action) {
  switch(action.type) {
    case groupActions.DELETE_GROUP:
      return {
        ...state,
        deleted: false,
        deleting: true,
        hasErrors: false
      }
    case groupActions.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        hasErrors: false
      }
    case groupActions.DELETE_GROUP_FAILURE:
      return {
        deleting: false,
        hasErrors: true,
        deleted: false
      }
    case groupActions.RESET_DELETE_GROUP:
      return initialDeleteGroupState
    default:
      return state
  }
}

const deleteReducer = combineReducers({
  deleteEvent: createDeleteEventReducer,
  deleteGroup: createDeleteGroupReducer
})

export default deleteReducer