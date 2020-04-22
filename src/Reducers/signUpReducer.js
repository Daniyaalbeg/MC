import * as actions from '../Actions/signUpActions';

export const initialState = {
  loading: false,
  hasErrors: false,
  error: null,
  success: false
}

export default function signUpReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SIGNUP:
      return {
        ...state,
        loading: true
      }
    case actions.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      }
    case actions.SIGNUP_FAILURE:
      if (typeof action.payload.data != 'undefined') {
        return {
          loading: false,
          success: false,
          error: action.payload.data.code,
          hasErrors: true,
        }
      } else {
        return {
          loading: false,
          success: false,
          error: action.payload,
          hasErrors: true,
        }
      }
    case actions.SIGNUP_RESET:
      return initialState;
    default:
      return state
  }
}