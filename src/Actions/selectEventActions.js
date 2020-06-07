export const SELECT_EVENT = "SELECT_EVENT";
export const TOGGLE_SHOW_LIST = "TOGGLE_SHOW_LIST";

export const selectingEvent = (selectedEvent) => ({
  type: SELECT_EVENT,
  payload: selectedEvent
});

export const toggleShowList = () => ({
  type: TOGGLE_SHOW_LIST
})