import * as actions from '../Actions/getOrgInfoActions';

const initialState = {
  loading: false,
  hasErros: false,
  fetched: false,
  orgInfo: [],
  selectedOrg: null,
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
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        hasErros: true,
        fetched: false
      }
    // case selectActions.SELECT_RATION_EVENT:
    //   return {
    //     ...state,
    //     selectedRation: action.payload,
    //   }
    // case filterSearchActions.FILTER_RATION_EVENT:
    //   return {
    //     ...state,
    //     filter: action.payload
    //   }
    // case filterSearchActions.SEARCH_RATION_EVENT:
    //   return {
    //     ...state,
    //     search: action.payload.toLowerCase()       
    //   }
    default:
      return state;
  }
}