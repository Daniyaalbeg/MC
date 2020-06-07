import * as actions from '../Actions/createEventActions';

export const initialState = {
  loading: false,
  hasErrors: false,
  success: false
}

export default function createRationReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CREATE_EVENT:
      return {
        ...state,
        loading: true
      }
    case actions.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      }
    case actions.CREATE_EVENT_FAILURE:
      return {
        loading: false,
        success: false,
        hasErrors: true
      }
    case actions.CREATE_EVENT_REDIRECT:
      return {
        ...state,
        success: false
      }
    case actions.CREATE_EVENT_RESET:
      return {
        initialState
      }
    default:
      return state
  }
}