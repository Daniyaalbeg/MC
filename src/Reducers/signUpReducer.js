import * as actions from "../Actions/signUpActions";
import * as volunteerActions from "../Actions/volunteerActions";

export const initialState = {
  loading: false,
  hasErrors: false,
  error: null,
  success: false,
};

export default function signUpReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SIGNUP:
      return {
        ...state,
        loading: true,
        success: false,
        hasErrors: false,
      };
    case actions.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        hasErrors: false,
      };
    case actions.SIGNUP_FAILURE:
      if (
        action.payload &&
        action.payload.data &&
        action.payload.data.errorCode
      ) {
        return {
          loading: false,
          success: false,
          error: action.payload.data.errorCode,
          hasErrors: true,
        };
      } else {
        return {
          loading: false,
          success: false,
          error: 100,
          hasErrors: true,
        };
      }
    case actions.SIGNUP_RESET:
      return initialState;
    case volunteerActions.CREATE_VOLUNTEER:
      return {
        ...state,
        loading: true,
        success: false,
        hasErrors: false,
      };
    case volunteerActions.CREATE_VOLUNTEER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        hasErrors: false,
      };
    case volunteerActions.CREATE_VOLUNTEER_FAILURE:
      return {
        loading: false,
        success: false,
        error: 100,
        hasErrors: true,
      };
    case volunteerActions.CREATE_USER_VOLUNTEER_RESET:
      return initialState;
    case volunteerActions.CREATE_USER_VOLUNTEER:
      return {
        ...state,
        loading: true,
        success: false,
        hasErrors: false,
      };
    case volunteerActions.CREATE_USER_VOLUNTEER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        hasErrors: false,
      };
    case volunteerActions.CREATE_USER_VOLUNTEER_FAILURE:
      if (
        action.payload &&
        action.payload.data &&
        action.payload.data.errorCode
      ) {
        return {
          loading: false,
          success: false,
          error: action.payload.data.errorCode,
          hasErrors: true,
        };
      } else {
        return {
          loading: false,
          success: false,
          error: 100,
          hasErrors: true,
        };
      }
    case volunteerActions.CREATE_USER_VOLUNTEER_RESET:
      return initialState;
    case volunteerActions.UPDATE_VOLUNTEER:
      return {
        ...state,
        loading: true,
        success: false,
        hasErrors: false,
      };
    case volunteerActions.UPDATE_VOLUNTEER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        hasErrors: false,
      };
    case volunteerActions.UPDATE_VOLUNTEER_FAILURE:
      return {
        loading: false,
        success: false,
        error: 100,
        hasErrors: true,
      };
    case volunteerActions.UPDATE_VOLUNTEER_RESET:
      return initialState;
    default:
      return state;
  }
}
