export const SELECT_EVENT = "SELECT_EVENT";

export const selectingEvent = (selectedEvent) => ({
  type: SELECT_EVENT,
  payload: selectedEvent
});