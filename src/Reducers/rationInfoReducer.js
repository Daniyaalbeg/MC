import * as actions from '../Actions/getRationinfoActions';
import * as selectActions from '../Actions/selectRationEventActions';
import * as filterActions from '../Actions/filterRatioEventAction';

const initialState = {
  loading: false,
  hasErros: false,
  fetched: false,
  rationEvents: [],
  selectedRation: null,
  filter: "all"
}

export default function rationInfoReducer(state = initialState, action) {
  switch(action.type) {
    case actions.GET_RATION_INFO:
      return {
        ...state,
        loading: true
      }
    case actions.GET_RATION_INFO_SUCCESS:
      action.payload.forEach((rationEvent) => {
        rationEvent.location.coordinates.reverse();
      })
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
        selectedRation: action.payload,
      }
    case filterActions.FILTER_RATION_EVENT:
      return {
        ...state,
        filter: action.payload
      }
    default:
      return state;
  }
}