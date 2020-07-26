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
        loading: true,
        success: false,
        hasErrors: false
      }
    case actions.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        hasErrors: false
      }
    case actions.SIGNUP_FAILURE:
      if (action.payload && action.payload.data && action.payload.data.errorCode) {
        return {
          loading: false,
          success: false,
          error: action.payload.data.errorCode,
          hasErrors: true,
        }
      } else {
        return {
          loading: false,
          success: false,
          error: 100,
          hasErrors: true
        }
      }
    case actions.SIGNUP_RESET:
      return initialState;
    default:
      return state
  }
}