import * as actions from '../Actions/getEventInfoActions';
import * as mapActions from '../Actions/mapActions';
import * as selectActions from '../Actions/selectEventActions';
import * as filterSearchActions from '../Actions/filterSearchEventAction';

const initialState = {
  loading: false,
  hasErros: false,
  fetched: false,
  events: [],
  selectedEvent: null,
  mapLayer: "NONE",
  showList: true,
  filterType: "all",
  filter: "all",
  search: ""
}

export default function mapInfoReducer(state = initialState, action) {
  switch(action.type) {
    case actions.GET_EVENT_INFO:
      return {
        ...state,
        loading: true
      }
    case actions.GET_EVENT_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        fetched: true,
        events: action.payload
      }
    case actions.GET_EVENT_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        hasErros: true,
        fetched: false
      }
    case actions.GET_EVENT_RESET_FETCH:
      return {
        ...state,
        fetched: false,
        hasErros: false,
        loading: false
      }
    case selectActions.SELECT_EVENT:
      return {
        ...state,
        selectedEvent: action.payload,
      }
    case selectActions.TOGGLE_SHOW_LIST: {
      return {
        ...state,
        showList: !state.showList
      }
    }
    case filterSearchActions.FILTER_EVENT:
      return {
        ...state,
        filter: action.payload
      }
    case filterSearchActions.FILTER_EVENT_TYPE:
      return {
        ...state,
        filterType: action.payload
      }
    case filterSearchActions.SEARCH_EVENT:
      return {
        ...state,
        search: action.payload.toLowerCase()       
      }
    case mapActions.CHANGE_MAP_LAYER:
      return {
        ...state,
        mapLayer: action.payload
      }
    default:
      return state;
  }
}