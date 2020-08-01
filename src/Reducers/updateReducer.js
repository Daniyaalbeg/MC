import * as actions from '../Actions/updateActions';

export const initialState = {
  loading: false,
  hasErrors: false,
  success: false
}

export default function updateReducer(state = initialState, action) {
  switch (action.type) {
    case actions.UPDATE_USER:
      return {
        ...state,
        loading: true,
        success: false,
        hasErrors: false
      }
    case actions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        hasErrors: false
      }
    case actions.UPDATE_USER_FAILURE:
      return {
        loading: false,
        success: false,
        hasErrors: true
      }
    case actions.UPDATE_USER_REDIRECT:
      return {
        ...state,
        success: false,
        hasErrors: false
      }
    case actions.UPDATE_EVENT:
      return {
        ...state,
        loading: true
      }
    case actions.UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      }
    case actions.UPDATE_EVENT_FAILURE:
      return {
        loading: false,
        success: false,
        hasErrors: true
      }
    case actions.UPDATE_EVENT_REDIRECT:
      return {
        ...state,
        success: false,
        hasErrors: false
      }
    case actions.UPDATE_ORG:
      return {
        ...state,
        loading: true,
        success: false,
        hasErrors: false
      }
    case actions.UPDATE_ORG_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        hasErrors: false
      }
    case actions.UPDATE_ORG_FAILURE:
      return {
        ...state,
        hasErrors: false,
        success: false,
        loading: false
      }
    case actions.UPDATE_ORG_REDIRECT:
      return {
        ...state,
        success: false,
        hasErrors: false
      }
    default:
      return state
  }
}