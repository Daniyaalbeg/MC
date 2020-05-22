import * as actions from '../Actions/cnicActions';

export const initialState = {
  getLoading: false,
  getFetched: false,
  getHasError: false,
  getHasErrorMessage: "",
  uploadLoading: false,
  uploadSuccess: false,
  uploadHasErrors: false,
  uploadErrorIDs: [],
  cnicInfo: null,
  selectedCnicEvent: null
}

export default function cnicReducer(state = initialState, action) {
  switch(action.type) {
    case actions.GETTING_CNIC:
    return {
      ...state, 
      getLoading: true,
      getHasError: false,
      getFetched: false
    }
    case actions.GETTING_CNIC_SUCCESS:
      return {
        ...state, 
        getLoading: false,
        getFetched: true,
        cnicInfo: action.payload
      }
    case actions.GETTING_CNIC_FAILURE:
      return {
        ...state, 
        getLoading: false,
        getHasError: true,
        getFetched: false,
        getHasErrorMessage: action.payload
      }
    case actions.SELECT_CNIC_EVENT:
      return {
        ...state,
        selectedCnicEvent: action.payload
      }
    case actions.CNIC_FILE_UPLOAD:
      return {
        ...state,
        uploadLoading: true
      }
    case actions.CNIC_FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        uploadLoading: false,
        uploadSuccess: true,
        uploadErrorIDs: (action.payload ? action.payload.failedIDs : [])
      }
    case actions.CNIC_FILE_UPLOAD_FAILURE:
      return {
        ...state,
        uploadHasErrors: true,
        uploadLoading: false,
      }
    case actions.CNIC_FILE_UPLOAD_RESET:
      return {
        ...state,
        uploadHasErrors: false,
        uploadLoading: false,
        uploadSuccess: false
      }
    default:
      return state;
  }
}