import * as actions from '../Actions/authActions';

export const initialState = {
  auth: true,
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOGI0MTVkNTQ5NWQ0N2ZiZDJiYzliNSIsImlhdCI6MTU4NzA2OTQ1NSwiZXhwIjoxNTg3MTU1ODU1fQ.ro11kgXk9pET4QxR2GGsf-gTv8ekmfZb0RbW6ToPFNY",
  loading: false,
  hasErrors: false
}

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case actions.LOGIN_ATTEMPT:
      return {...state, loading: true}
    case actions.LOGIN_SUCCESS:
      return {
        auth: action.payload.auth,
        token: action.payload.token,
        loading: false,
        hasErrors: false
      }
    case actions.LOGIN_FAILURE:
      return {...state, loading: false, hasErrors: true}
    case actions.LOGOUT:
      return initialState
    default:
      return state
  }
}