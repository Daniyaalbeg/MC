import * as actions from '../Actions/getEventInfoActions';
import * as mapActions from '../Actions/mapActions';
import * as selectActions from '../Actions/selectEventActions';
import * as filterSearchActions from '../Actions/filterSearchEventAction';

import * as MapLayerType from '../components/map/mapLayerTypes';

import { combineReducers } from 'redux';

const mapActionInitialState = {
  loading: false,
  hasErros: false,
  fetched: false,
  events: [],
  selectedEvent: null,
  mapLayer: "NONE",
  showList: true,
  filterType: "all",
  filter: "all",
  search: "",
}

const mapDataInitialState = {
  mapStoredData: {
    "UC": null,
    "TEHSIL": null,
    "DISTRICT": null,
    "PROVINCE": null
  },
  mapLayerToDisplay: MapLayerType.NONE,
  loadingMapLayer: false,
  mapLayerLoadedpercent: null,
  // mapLayerButtonNumber: null,
  hasErrorLoadingMapLayer: false,
  fetchedMapLayer: false
}

function mapDataReducer(state = mapDataInitialState, action) {
  switch(action.type) {
    case mapActions.LOAD_LAYER:
      return {
        ...state,
        loadingMapLayer: true,
        hasErrorLoadingMapLayer: false,
        fetchedMapLayer: false
      }
    case mapActions.LOAD_LAYER_UPDATE:
      return {
        ...state,
        mapLayerLoadedpercent: (action) => {
          if (action.payload.lengthComputable) {
            console.log((action.payload.loaded - action.payload.total) * 100)
            return (action.payload.loaded - action.payload.total) * 100  
          } else {
            return null
          }
        }
      }
    case mapActions.LOAD_LAYER_CACHED:
      return {
        ...state,
        mapLayerToDisplay: action.payload
      }
    case mapActions.LOAD_LAYER_SUCCESS:
      switch(action.payload.mapLayerType) {
        case MapLayerType.NONE: 
          return {
            ...state,
            mapLayerToDisplay: MapLayerType.NONE
          }
        case MapLayerType.UC:
          return {
            ...state,
            mapStoredData: {
              ...state.mapStoredData,
              "UC": action.payload.layerData,
            },
            mapLayerToDisplay: action.payload.mapLayerType,
            loadingMapLayer: false,
            fetchedMapLayer: true
          }
        case MapLayerType.TEHSIL:
          return {
            ...state,
            mapStoredData: {
              ...state.mapStoredData,
              "TEHSIL": action.payload.layerData,
            },
            mapLayerToDisplay: action.payload.mapLayerType,
            loadingMapLayer: false,
            fetchedMapLayer: true
          }
        case MapLayerType.DISTRICT:
          return {
            ...state,
            mapStoredData: {
              ...state.mapStoredData,
              "DISTRICT": action.payload.layerData,
            },
            mapLayerToDisplay: action.payload.mapLayerType,
            loadingMapLayer: false,
            fetchedMapLayer: true
          }
        case MapLayerType.PROVINCE:
          return {
            ...state,
            mapStoredData: {
              ...state.mapStoredData,
              "PROVINCE": action.payload.layerData,
            },
            mapLayerToDisplay: action.payload.mapLayerType,
            loadingMapLayer: false,
            fetchedMapLayer: true
          }
        default:
          return state
      }
    case mapActions.LOAD_LAYER_FAILURE:
      return {
        ...state,
        hasErrorLoadingMapLayer: true
      }
    default:
      return state
  }
}

function mapActionReducer(state = mapActionInitialState, action) {
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
    default:
      return state;
  }
}

const mapInfoReducer = combineReducers({
  mapActions: mapActionReducer,
  mapData: mapDataReducer
})

export default mapInfoReducer