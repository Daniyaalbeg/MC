export const SELECT_ORG = "SELECT_ORG";

export const selectingOrg = (selectedOrg) => ({
  type: SELECT_ORG,
  payload: selectedOrg
});

const aFunc = () => {
  console.log('as')
}

export default aFunc