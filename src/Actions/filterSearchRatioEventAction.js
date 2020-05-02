export const FILTER_RATION_EVENT_TYPE = "FILTER_RATION_EVENT_TYPE";
export const FILTER_RATION_EVENT = "FILTER_RATION_EVENT";
export const SEARCH_RATION_EVENT = "SEARCH_RATION_EVENT";

export const filterRationEvents = (filter) => ({
  type: FILTER_RATION_EVENT,
  payload: filter
});

export const filterRationEventsType = (filterType) => ({
  type: FILTER_RATION_EVENT_TYPE,
  payload: filterType
})

export const searchRationEvents = (search) => ({
  type: SEARCH_RATION_EVENT,
  payload: search
});
