export const FILTER_RATION_EVENT = "FILTER_RATION_EVENT";

export const filterRationEvents = (filter) => ({
  type: FILTER_RATION_EVENT,
  payload: filter
});