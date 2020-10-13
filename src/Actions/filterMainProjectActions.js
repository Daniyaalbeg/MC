export const FILTER_MAIN_PROJECT = "FILTER_MAIN_PROJECT";
export const SEARCH_MAIN_PROJECT = "SEARCH_MAIN_PROJECT";

export const changeFilterProject = (filter) => ({
  type: FILTER_MAIN_PROJECT,
  payload: filter
});

export const changeSearchProject = (search) => ({
  type: SEARCH_MAIN_PROJECT,
  payload: search
});
