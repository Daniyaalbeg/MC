import * as actions from '../Actions/getOrgInfoActions';
import * as filterSearchActions from '../Actions/filterSearchOrgAction';

const initialState = {
  loading: false,
  hasErros: false,
  fetched: false,
  orgInfo: [],
  filter: "all",
  search: ""
}

export default function orgInfoReducer(state = initialState, action) {
  switch(action.type) {
    case actions.GET_ORG_INFO:
      return {
        ...state,
        loading: true
      }
    case actions.GET_ORG_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        fetched: true,
        orgInfo: action.payload
      }
    case actions.GET_ORG_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        hasErros: true,
        fetched: false
      }
    case filterSearchActions.FILTER_ORG:
      return {
        ...state,
        filter: action.payload
      }
    case filterSearchActions.SEARCH_ORG:
      return {
        ...state,
        search: action.payload.toLowerCase()       
      }
    default:
      return state;
  }
}