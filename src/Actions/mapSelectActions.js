export const SELECT_OBJECT = "SELECT_OBJECT";
export const TOGGLE_SHOW_LIST = "TOGGLE_SHOW_LIST";
export const JUST_SELECTED_OBJECT = "JUST_SELECTED_OBJECT"
export const CHANGE_MAP_MODE = "CHANGE_MAP_MODE"
export const TOGGLE_MAP_MODAL = "TOGGLE_MAP_MODAL"
export const SELECTED_PROJECT_MARKER= "SELECTED_PROJECT_MARKER"

export const selectingObject = (selectedObject) => ({
  type: SELECT_OBJECT,
  payload: selectedObject
});

export const toggleShowList = () => ({
  type: TOGGLE_SHOW_LIST
})

export const justSelectedObject = () => ({
  type: JUST_SELECTED_OBJECT
})

export const selectedProjectMarker = (id) => ({
  type: SELECTED_PROJECT_MARKER,
  payload: id
})

export const changeMapMode = (newMapMode) => ({
  type: CHANGE_MAP_MODE,
  payload: newMapMode
})

export const toggleMapModal = () => ({
  type: TOGGLE_MAP_MODAL,
})