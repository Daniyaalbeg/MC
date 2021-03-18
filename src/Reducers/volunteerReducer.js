import { combineReducers } from "redux";
import * as actions from "../Actions/volunteerActions";

const initalMainVolunteerState = {
  loading: false,
  hasErrors: false,
  success: false,
  volunteers: [],
};

function createMainVolunteerReducer(state = initalMainVolunteerState, action) {
  switch (action.type) {
    case actions.GET_VOLUNTEERS:
      return {
        ...state,
        loading: true,
        hasErrors: false,
        fetched: false,
      };
    case actions.GET_VOLUNTEERS_SUCCESS:
      return {
        ...state,
        loading: false,
        hasErrors: false,
        fetched: true,
        volunteers: action.payload,
      };
    case actions.GET_VOLUNTEERS_FAILURE:
      return {
        ...state,
        loading: false,
        hasErrors: true,
        fetched: false,
      };
    case actions.GET_VOLUNTEER:
      return {
        ...state,
        loading: true,
        hasErrors: false,
        fetched: false,
      };
    case actions.GET_VOLUNTEER_SUCCESS:
      return {
        ...state,
        loading: false,
        hasErrors: false,
        fetched: true,
        selectedVolunteer: action.payload,
      };
    case actions.GET_VOLUNTEER_FAILURE:
      return {
        ...state,
        loading: false,
        hasErrors: true,
        fetched: false,
      };
    case actions.GET_VOLUNTEER_RESET: {
      return {
        loading: false,
        fetched: false,
        hasErrors: false,
      };
    }
    // case fsActions.FILTER_MAIN_VOLUNTEER:
    //   return {
    //     ...state,
    //     filterTerms: action.payload,
    //   };
    // case fsActions.SEARCH_MAIN_VOLUNTEER:
    //   return {
    //     ...state,
    //     searchTerm: action.payload,
    //   };
    // case actions.GET_VOLUNTEER_BACKGROUND:
    //   return {
    //     ...state,
    //     // loading: true,
    //     // hasErrors: false,
    //     // fetched: false
    //   };
    // case actions.GET_VOLUNTEER_BACKGROUND_SUCCESS:
    //   return {
    //     ...state,
    //     // loading: false,
    //     // hasErrors: false,
    //     // fetched: true,
    //     selectedProject: action.payload,
    //   };
    // case actions.GET_VOLUNTEER_BACKGROUND_FAILURE:
    //   return {
    //     ...state,
    //     // loading: false,
    //     // hasErrors: true,
    //     // fetched: false
    //   };
    default:
      return state;
  }
}

export default combineReducers({
  mainVolunteers: createMainVolunteerReducer,
});
