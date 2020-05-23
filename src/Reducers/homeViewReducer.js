import * as actions from '../Actions/homeViewActions'

const initialState = {
  statLoading: false,
  statFetched: false,
  statHasErrors: false,
  featuredLoading: false,
  featuredFetched: false,
  featuredHasErrors: false,
  numberOfUsers: 0,
  numberOfEvents: 0,
  numberOfIndividuals: 0,
  numberOfOrganisations: 0,
  featuredOrgs: [],
}

export default function homeViewReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_STAT_INFO:
      return {
        ...state,
        statLoading: true,
      }
    case actions.GET_STAT_INFO_SUCCESS:
      return {
        ...state,
        statLoading: false,
        statHasErrors: false,
        statFetched: true,
        numberOfEvents: action.payload.numberOfEvents,
        numberOfUsers: action.payload.numberOfUsers,
        numberOfIndividuals: action.payload.numberOfIndividuals,
        numberOfOrganisations: action.payload.numberOfOrganisations
      }
    case actions.GET_STAT_INFO_FAILURE:
      return {
        ...state, 
        statLoading: false,
        statHasErrors: true,
        statFetched: false
      }
    case actions.GET_FEATURED_INFO:
      return {
        ...state,
        featuredLoading: true
      }
    case actions.GET_FEATURED_INFO_SUCCESS:
      return {
        ...state,
        featuredLoading: false,
        featuredFetched: true,
        featuredHasErrors: false,
        featuredOrgs: action.payload
      }
    case actions.GET_FEATURED_INFO_FAILURE:
      return {
        ...state,
        featuredLoading: false,
        featuredFetched: false,
        featuredHasErrors: true
      }
    default:
      return state;
  }
}