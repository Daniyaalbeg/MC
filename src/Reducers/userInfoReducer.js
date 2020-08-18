import * as actions from '../Actions/userInfoActions';
import { LOGOUT } from '../Actions/authActions'

export const initialState = {
  fetched: false,
  loading: false,
  user: "",
  hasErrors: false,
  error: null
}

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_USER_INFO:
      return {
        ...state,
        loading: true
      }
    case actions.GET_USER_INFO_SUCCESS:
      return {
        fetched: true,
        loading: false,
        user: action.payload,
        hasErrors: false
      }
    case actions.GET_USER_INFO_FAILURE:
      return {
        ...state,
        fetched: false,
        hasErrors: true,
        loading: false,
        error: action.payload
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
    case actions.ADD_NEW_SUPPLY_ITEM:
      const { supplyItem, orgID, projectID } = action.payload
      let orgsNew = [...state.user.createdOrganisations]
      for (let i = 0; i<state.user.createdOrganisations.length; i++) {
        if (state.user.createdOrganisations[i]._id.toString() === orgID) {
          for (let j = 0; j<orgsNew[i].projects.length; j++) {
            if (orgsNew[i].projects[j]._id === projectID) {
              orgsNew[i].projects[j].supplies.push(supplyItem)
              break;
            }
          }   
          break;
        }
      }
      return {
        ...state,
        user: {
          ...state.user,
          createdOrganisations: [...orgsNew]
        }
      }
    default:
      return state;
  }
}