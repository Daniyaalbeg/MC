import * as actions from '../Actions/deleteEventAction'

export const initialState = {
  deletingEvent: false,
  hasErrors: false,
  deletedEvent: false
}

export default function createDeleteEventReducer(state = initialState, action) {
  switch(action.type) {
    case actions.DELETE_EVENT:
      return {
        ...state,
        deletedEvent: false,
        deletingEvent: true
      }
    case actions.DELETE_EVENT_SUCCES:
      return {
        ...state,
        deletingEvent: false,
        deletedEvent: true
      }
    case actions.DELETE_EVENT_FAILURE:
      return {
        deletingEvent: false,
        hasErrors: true,
        deletedEvent: false
      }
    case actions.RESET_DELETE:
      return initialState
    default:
      return state
  }
}