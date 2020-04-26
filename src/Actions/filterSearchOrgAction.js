export const FILTER_ORG = "FILTER_ORG";
export const SEARCH_ORG = "SEARCH_ORG";

export const filterOrgEvents = (filter) => ({
  type: FILTER_ORG,
  payload: filter
});

export const searchOrgEvents = (search) => ({
  type: SEARCH_ORG,
  payload: search
});
