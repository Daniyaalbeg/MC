import * as actions from '../Actions/userInfoActions';
import { LOGOUT } from '../Actions/authActions'

export const initialState = {
  fetched: false,
  loading: false,
  username: "",
  email: "",
  supplier: null,
  approved: false,
  createdAt: "",
  hasErrors: false,
  error: null
}

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_USER_INFO:
      return {
        ...state,
        loading: true
      }
    case actions.GET_USER_INFO_SUCCESS:
      return {
        fetched: true,
        loading: false,
        username: action.payload.username,
        email: action.payload.email,
        supplier: action.payload.supplier,
        approved: action.payload.approved,
        createdAt: action.payload.createdAt,
        hasErrors: false
      }
    case actions.GET_USER_INFO_FAILURE:
      return {
        ...state,
        fetched: false,
        hasErrors: true,
        loading: false,
        error: action.payload
      }
      case LOGOUT:
        return initialState
    default:
      return state;
  }
}