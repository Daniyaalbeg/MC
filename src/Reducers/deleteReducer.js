import * as actions from '../Actions/deleteRationAction'

export const initialState = {
  deletingRation: false,
  hasErrors: false,
  deletedRation: false
}

export default function createDeleteRationReducer(state = initialState, action) {
  switch(action.type) {
    case actions.DELETE_RATION:
      return {
        ...state,
        deletedRation: false,
        deletingRation: true
      }
    case actions.DELETE_RATION_SUCCES:
      return {
        ...state,
        deletingRation: false,
        deletedRation: true
      }
    case actions.DELETE_RATION_FAILURE:
      return {
        deletingRation: false,
        hasErrors: true,
        deletedRation: false
      }
    case actions.RESET_DELETE:
      return initialState
    default:
      return state
  }
}