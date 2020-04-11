import * as actions from '../Actions/getRationinfoActions';
import * as selectActions from '../Actions/selectRationEventActions';

const initialState = {
  loading: false,
  hasErros: false,
  fetched: false,
  rationEvents: [],
  selectedRation: null
}

export default function rationInfoReducer(state = initialState, action) {
  switch(action.type) {
    case actions.GET_RATION_INFO:
      return {
        ...state,
        loading: true
      }
    case actions.GET_RATION_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        fetched: true,
        rationEvents: action.payload
      }
    case actions.GET_RATION_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        hasErros: true,
        fetched: false
      }
    case selectActions.SELECT_RATION_EVENT:
      return {
        ...state,
        selectedRation: action.payload
      }
    default:
      return state;
  }
}