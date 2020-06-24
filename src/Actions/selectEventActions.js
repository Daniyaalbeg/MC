export const SELECT_EVENT = "SELECT_EVENT";
export const TOGGLE_SHOW_LIST = "TOGGLE_SHOW_LIST";
export const JUST_SELECTED_EVENT = "JUST_SELECTED_EVENT"

export const selectingEvent = (selectedEvent) => ({
  type: SELECT_EVENT,
  payload: selectedEvent
});

export const toggleShowList = () => ({
  type: TOGGLE_SHOW_LIST
})

export const justSelectedEvent = () => ({
  type: JUST_SELECTED_EVENT
})
