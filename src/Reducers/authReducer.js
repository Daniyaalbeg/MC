import * as actions from '../Actions/authActions';

export const initialState = {
  auth: false,
  // token: "",
  loading: false,
  hasErrors: false,
  checkedCookie: false
}

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case actions.LOGIN_ATTEMPT:
      return {
        ...state,
        loading: true
      }
    case actions.LOGIN_SUCCESS:
      return {
        auth: action.payload.auth,
        // token: action.payload.token,
        loading: false,
        hasErrors: false
      }
    case actions.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        hasErrors: true
      }
    case actions.CHECK_COOKIE_ATTEMPT:
      return {
        ...state,
        checkedCookie: true
      }
    case actions.CHECK_COOKIE_ATTEMPT_SUCCESS:
      return {
        ...state,
        auth: action.payload.auth
      }
    case actions.CHECK_COOKIE_ATTEMPT_FAILURE:
      return {
        ...state,
        auth: false
      }
    case actions.LOGOUT:
      return initialState
    default:
      return state
  }
}