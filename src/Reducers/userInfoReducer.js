import * as actions from '../Actions/userInfoActions';
import { LOGOUT } from '../Actions/authActions'

export const initialState = {
  fetched: false,
  loading: false,
  user: "",
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
    case actions.GET_USER_INFO_BACKGROUND:
      return {
        ...state,
        // loading: true
      }
    case actions.GET_USER_INFO_BACKGROUND_SUCCESS:
      const a = {
        ...state,
        // fetched: true,
        // loading: false,
        user: //action.payload
        {
          ...action.payload,
          createdOrganisations: 
            action.payload.createdOrganisations.map((org) => {
              if (org.projects) {
                return {
                  ...org,
                  sponsorRequests: org.sponsorRequests.map((request) => {
                    return request
                  }),
                  projects: org.projects.map((project) => {
                    return {
                      ...project,
                      funding: newFundingState(project.funding),
                      supplies:  newSupplyState(project.supplies),
                    }
                  })
                }
              } else {
                return {...org}
              }
            })
        },
        // hasErrors: false
      }
      // console.log(a);
      return a
    case actions.GET_USER_INFO_BACKGROUND_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        // loading: false,
        // hasErrors: true,
        // fetched: false
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
    case actions.ADD_SUPPLY_ITEM:
      const { supplyItem, orgID, projectID } = action.payload
      let orgsNew = [...state.user.createdOrganisations]
      for (let i = 0; i<state.user.createdOrganisations.length; i++) {
        if (state.user.createdOrganisations[i]._id.toString() === orgID) {
          for (let j = 0; j<orgsNew[i].projects.length; j++) {
            if (orgsNew[i].projects[j]._id === projectID) {
              orgsNew[i].projects[j].supplies.unshift(supplyItem)
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
    case actions.ADD_FAQ_ITEM:
      const { faqItem, faqOrgID, faqProjectID } = action.payload
      let orgsNewFaq = [...state.user.createdOrganisations]
      for (let i = 0; i<state.user.createdOrganisations.length; i++) {
        if (state.user.createdOrganisations[i]._id.toString() === faqOrgID) {
          for (let j = 0; j<orgsNewFaq[i].projects.length; j++) {
            if (orgsNewFaq[i].projects[j]._id === faqProjectID) {
              orgsNewFaq[i].projects[j].faqs.unshift(faqItem)
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
          createdOrganisations: [...orgsNewFaq]
        }
      }
    case actions.DELETE_FAQ_ITEM:
      const { deletedFaqItem, deleteFaqOrgID, deleteFaqProjectID } = action.payload
      let orgsNewFaqDelete = [...state.user.createdOrganisations]
      for (let i = 0; i<state.user.createdOrganisations.length; i++) {
        if (state.user.createdOrganisations[i]._id.toString() === deleteFaqOrgID) {
          for (let j = 0; j<orgsNewFaqDelete[i].projects.length; j++) {
            if (orgsNewFaqDelete[i].projects[j]._id === deleteFaqProjectID) {
              for (let k = 0; k < orgsNewFaqDelete[i].projects[j].faqs.length; k++) {
                if (orgsNewFaqDelete[i].projects[j].faqs[k]._id.toString() === deletedFaqItem._id.toString()) {
                  orgsNewFaqDelete[i].projects[j].faqs.splice(k, 1);
                  break;
                }
              }
            }
          }   
          break;
        }
      }
      return {
        ...state,
        user: {
          ...state.user,
          createdOrganisations: [...orgsNewFaqDelete]
        }
      }
    case actions.ADD_UPDATE_ITEM:
      const { updateItem, updateOrgID, updateProjectID } = action.payload
      let orgsNewUpdate = [...state.user.createdOrganisations]
      for (let i = 0; i<state.user.createdOrganisations.length; i++) {
        if (state.user.createdOrganisations[i]._id.toString() === updateOrgID) {
          for (let j = 0; j<orgsNewUpdate[i].projects.length; j++) {
            if (orgsNewUpdate[i].projects[j]._id === updateProjectID) {
              orgsNewUpdate[i].projects[j].updates.unshift(updateItem)
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
          createdOrganisations: [...orgsNewUpdate]
        }
      }
    default:
      return state;
  }
}