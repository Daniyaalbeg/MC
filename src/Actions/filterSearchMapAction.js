export const FILTER_CATEGORY_TYPE = "FILTER_CATEGORY_TYPE";
export const FILTER_EVENT = "FILTER_EVENT";
export const SEARCH_EVENT = "SEARCH_EVENT";

export const filterEvents = (filter) => ({
  type: FILTER_EVENT,
  payload: filter
});

export const filterCategoryType = (filterCategory) => ({
  type: FILTER_CATEGORY_TYPE,
  payload: filterCategory
})

export const searchEvents = (search) => ({
  type: SEARCH_EVENT,
  payload: search
});
