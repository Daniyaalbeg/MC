import * as actions from '../Actions/homeViewActions'

const initialState = {
  loading: false,
  fetched: false,
  hasErrors: false,
  numberOfUsers: 0,
  numberOfRations: 0,
  numberOfIndividuals: 0,
  numberOfOrganisations: 0,
  featuredOrgs: [],
}

export default function homeViewReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_MAIN_INFO:
      return {
        ...state,
        loading: true,
      }
    case actions.GET_MAIN_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        hasErrors: false,
        fetched: true,
        numberOfRations: action.payload.numberOfRations,
        numberOfUsers: action.payload.numberOfUsers,
        numberOfIndividuals: action.payload.numberOfIndividuals,
        numberOfOrganisations: action.payload.numberOfOrganisations,
        featuredOrgs: action.payload.featuredOrgs
      }
    case actions.GET_MAIN_INFO_FAILURE:
      return {
        ...state, 
        loading: false,
        hasErrors: true,
        fetched: false
      }
    default:
      return state;
  }
}