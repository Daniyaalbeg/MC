import * as actions from '../Actions/userInfoActions';
import { LOGOUT } from '../Actions/authActions'

export const initialState = {
  fetched: false,
  loading: false,
  userId: "",
  username: "",
  email: "",
  supplier: null,
  approved: false,
  verified: false,
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
        userId: action.payload._id,
        username: action.payload.username,
        email: action.payload.email,
        supplier: action.payload.supplier,
        approved: action.payload.approved,
        createdAt: action.payload.createdAt,
        verified: action.payload.verified,
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
    case actions.DELETE_USER_INFO_EVENT:
      let newSupplier = {...state.supplier}
      for (let i = 0; i<state.supplier.events.length; i++) {
        if (state.supplier.events[i]._id === action.payload) {
          newSupplier.events.splice(i, 1)
          break;
        }
      }
      return {
        ...state,
        supplier: newSupplier
      }
    default:
      return state;
  }
}