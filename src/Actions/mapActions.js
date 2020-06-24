import axios from "axios"

import * as MapLayerType from '../components/map/mapLayerTypes';

export const LOAD_LAYER = "LOAD_LAYER"
export const LOAD_LAYER_UPDATE = "LOAD_LAYER_UPDATE"
export const LOAD_LAYER_CACHED = "LOAD_LAYER_CACHED"
export const LOAD_LAYER_SUCCESS = "LOAD_LAYER_SUCCESS"
export const LOAD_LAYER_FAILURE = "LOAD_LAYER_FAILURE"

export const LOAD_NATIONAL_LAYER = "LOAD_NATIONAL_LAYER"
export const LOAD_NATIONAL_LAYER_SUCCESS = "LOAD_NATIONAL_LAYER_SUCCESS"
export const LOAD_NATIONAL_LAYER_FAILURE = "LOAD_NATIONAL_LAYER_FAILURE"

export const LOAD_LAYER_RESET = "LOAD_LAYER_RESET"

export const loadLayer = () => ({
  type: LOAD_LAYER,
})
export const loadLayerUpdate = (progressEvent) => ({
  type: LOAD_LAYER_UPDATE,
  payload: progressEvent
})
export const loadLayerSuccess = (mapLayerType, layerData) => ({
  type: LOAD_LAYER_SUCCESS,
  payload: {mapLayerType, layerData}
})
export const loadLayerCached = (mapLayerType) => ({
  type: LOAD_LAYER_CACHED,
  payload: mapLayerType
})
export const loadLayerFailure = (error) => ({
  type: LOAD_LAYER_FAILURE,
  payload: error
})

export const loadNationalLayer = () => ({
  type: LOAD_NATIONAL_LAYER
})
export const loadNationalLayerSuccess = (data) => ({
  type: LOAD_NATIONAL_LAYER_SUCCESS,
  payload: data
})
export const loadNationalLayerFailure = (error) => ({
  type: LOAD_NATIONAL_LAYER_FAILURE,
  payload: error
})

export const loadLayerReset = () => ({
  type: LOAD_LAYER_RESET
})

export function loadingNationalLayer() {
  return async dispatch => {
    dispatch(loadNationalLayer())

    axios({
      method: 'get',
      url: mapDataUrl(MapLayerType.NATIONAL),
      headers: { 'Content-Type': 'application/json'}
    })
    .then((res) => {
      dispatch(loadNationalLayerSuccess(res.data))
    })
    .catch((error) => {
      dispatch(loadNationalLayerFailure(error))
    })
  }
}

export function loadingLayer(mapLayerType) {
  return async (dispatch, getState) => {
    if (mapLayerType === MapLayerType.NONE) {
      dispatch(loadLayerSuccess(mapLayerType))
      return
    }

    if (getState().mapInfo.mapData.mapStoredData[mapLayerType]) {
      dispatch(loadLayerCached(mapLayerType))
      return
    }

    dispatch(loadLayer())

    axios({
      method: 'get',
      url: mapDataUrl(mapLayerType),
      headers: {'Content-Type': 'application/json'},
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      dispatch(loadLayerSuccess(mapLayerType, res.data))
    })
    .catch((error) => {
      console.log(error)
      dispatch(loadLayerFailure(error))
    })
  }
}

const mapDataUrl = (mapLayerType) => {
  switch(mapLayerType) {
    case MapLayerType.UC:
      // return 'data/UC_Pak_Use_With_Average.min.json'
      // return 'data/UC_Pak_Simple_With_Average.min.json'
      return 'data/UC_Pak_Use_With_Average.min.json'
    case MapLayerType.TEHSIL:
      return 'data/Tehsil_Boundary_With_Average.min.json'
    case MapLayerType.DISTRICT:
      return 'data/District_Boundary_With_Average.min.json'
    case MapLayerType.PROVINCE:
      return 'data/Provincial_Constituency_With_Average.min.json'
    case MapLayerType.NATIONAL:
      return 'data/National_Boundary_With_Average.min.json'
    default:
      return ''
  }
}