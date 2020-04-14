import * as actions from '../Actions/createRationActions';

export const initialState = {
  loading: false,
  hasErrors: false,
  success: false
}

export default function createRationReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CREATE_RATION:
      return {
        ...state,
        loading: true
      }
    case actions.CREATE_RATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      }
    case actions.CREATE_RATION_FAILURE:
      return {
        loading: false,
        success: false,
        hasErrors: true
      }
    default:
      return state
  }
}