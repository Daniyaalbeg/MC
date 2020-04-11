export const SELECT_RATION_EVENT = "SELECT_RATION_EVENT";

export const selectingRationEvent = (selectedRationEvent) => ({
  type: SELECT_RATION_EVENT,
  payload: selectedRationEvent
});