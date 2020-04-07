import * as actions from '../Actions/userInfoActions';

export const initialState = {
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
        hasErrors: true,
        error: action.payload
      }
    default:
      return state;
  }
}