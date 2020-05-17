export const FILTER_ORG_PROJECT = "FILTER_ORG_PROJECT";
export const FILTER_ORG_TYPE = "FILTER_ORG_TYPE";
export const SEARCH_ORG = "SEARCH_ORG";

export const filterTypeOrg = (filter) => ({
  type: FILTER_ORG_TYPE,
  payload: filter
});

export const filterProjectOrg = (filter) => ({
  type: FILTER_ORG_PROJECT,
  payload: filter
});

export const searchOrg = (search) => ({
  type: SEARCH_ORG,
  payload: search
});
