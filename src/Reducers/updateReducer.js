import * as actions from '../Actions/updateActions';

export const initialState = {
  loading: false,
  hasErrors: false,
  success: false
}

export default function updateReducer(state = initialState, action) {
  switch (action.type) {
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
        success: false
      }
    default:
      return state
  }
}