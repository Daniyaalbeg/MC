export const FILTER_EVENT_TYPE = "FILTER_EVENT_TYPE";
export const FILTER_EVENT = "FILTER_EVENT";
export const SEARCH_EVENT = "SEARCH_EVENT";

export const filterEvents = (filter) => ({
  type: FILTER_EVENT,
  payload: filter
});

export const filterEventsType = (filterType) => ({
  type: FILTER_EVENT_TYPE,
  payload: filterType
})

export const searchEvents = (search) => ({
  type: SEARCH_EVENT,
  payload: search
});
