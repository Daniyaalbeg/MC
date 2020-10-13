export const calculateSupplyPercent = (project) => {
  if (!project.supplies || project.supplies.length === 0 ) return 0
  let totalAmountNeeded = 0
  let totalAmountReceived = 0
  project.supplies.forEach(supply => {
    totalAmountNeeded = totalAmountNeeded + supply.amountNeeded
    totalAmountReceived = totalAmountReceived + supply.amountReceived
  });

  return parseInt(totalAmountReceived/totalAmountNeeded * 100)
}

export const calculateVolunteersPercent = (project) => {
  return 83
}

export const calculateFundingPercent = (project) => {
  if (!project.funding) return 0 
  const fundingPercent = parseInt(project.funding.fundingReceived)/parseInt(project.funding.fundingNeeded)
  return fundingPercent
}