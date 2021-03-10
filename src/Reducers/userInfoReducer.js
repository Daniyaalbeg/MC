import * as actions from '../Actions/userInfoActions';
import { LOGOUT } from '../Actions/authActions'
import { normalizeUserState } from '../components/utilities/normalise'

export const initialState = {
  fetched: false,
  loading: false,
  entities: "",
  entityIds: {
    // createdOrganisations: [],
    // projects: [],
    // createdGroups: [],
    // sponsorRequests: [],
    // volunteerInfo: [],
    // volunteerRequests: [],
    // updates: [],
    // supplies: [],
  },
  sponsorRequests: null,
  createdOrganisations: null,
  projects: null,
  groups: null,
  volunteeringInfo: null,
  volunteerRequests: null,
  updates: null,
  supplies: null,
  user: null,
  userID: null,
  hasErrors: false,
  error: null
}

const newFundingState = (funding) => {
  if (funding) {
    return ({
      fundingNeeded: funding.fundingNeeded,
      fundingReceived: funding.fundingReceived,
      backers: funding.backers,
      fundingUsedFor: funding.fundingUsedFor
    })
  }
  return null
}

const newSupplyState = (supplies) => {
  if (supplies) {
    return supplies.map((supply) => {
      return ({
        ...supply,
        suppliedBy: supply.suppliedBy
      })
    })
  }
  return null
}

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_USER_INFO:
      return {
        ...state,
        loading: true
      }
    case actions.GET_USER_INFO_SUCCESS:
      const normalizedState = normalizeUserState(action.payload)
      return {
        ...normalizedState.entities,
        entityIds: normalizedState.entityIds,
        fetched: true,
        loading: false,
        hasErrors: false
      }
    case actions.GET_USER_INFO_FAILURE:
      console.log(action.payload)
      return {
        ...state,
        fetched: false,
        hasErrors: true,
        loading: false,
        error: action.payload
      }
    case actions.GET_USER_INFO_BACKGROUND:
      return {
        ...state,
        // loading: true
      }
    case actions.GET_USER_INFO_BACKGROUND_SUCCESS:
      const normalizedState2 = normalizeUserState(action.payload)
      return {
        ...normalizedState2.entities,
        entityIds: normalizedState2.entityIds,
        fetched: true,
        loading: false,
        hasErrors: false
      }
    case actions.GET_USER_INFO_BACKGROUND_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        hasErrors: true,
        fetched: false
      }
    case actions.RESET_USER_INFO_GET:
      return {
        ...state,
        fetched: false,
        loading: false,
        hasErrors: false
      }
    case LOGOUT:
      return initialState
    case actions.DELETE_USER_INFO_EVENT:
      let orgs = [...state.user.createdOrganisations]
      for (let i = 0; i < orgs.length; i++) {
        for (let j = 0; j < orgs[i].events.length; j++) {
          if (orgs[i].events[j]._id === action.payload) {
            orgs[i].events.splice(j, 1)
            break
          }
        }
      }
      return {
        ...state,
        user: {
          ...state.user,
          createdOrganisations: [...orgs]
        }
      }
    case actions.DELETE_USER_INFO_GROUP:
      let newCreatedGroups = [...state.user.createdGroups]
      for (let i = 0; i<state.user.createdGroups.length; i++) {
        if (state.user.createdGroups[i]._id === action.payload) {
          newCreatedGroups.splice(i, 1)
          break;
        }
      }
      return {
        ...state,
        user: {
          ...state.user,
          createdGroups: [...newCreatedGroups]
        }
      }
    default:
      return state;
  }
}