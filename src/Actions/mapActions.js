export const CHANGE_MAP_LAYER = "CHANGE_MAP_LAYER"

export const changingMapLayer = (layer) => ({
  type: CHANGE_MAP_LAYER,
  payload: layer
})