export const calculateSupplyPercent = (project, suppliesDict) => {
  const supplies = project.supplies.map((supplyID) => suppliesDict[supplyID])
  if (!project.supplies || project.supplies.length === 0 ) return 0
  let totalAmountNeeded = 0
  let totalAmountReceived = 0
  supplies.forEach(supply => {
    totalAmountNeeded = totalAmountNeeded + supply.amountNeeded
    totalAmountReceived = totalAmountReceived + supply.amountReceived
  });

  return parseInt(totalAmountReceived/totalAmountNeeded * 100)
}

export const calculateVolunteersPercent = (project, volunteerDict) => {
  const projectVolunteer = volunteerDict[project.volunteeringInfo]

  if (!projectVolunteer || !projectVolunteer.volunteersNeeded) {
    return 0
  }
  return parseInt((projectVolunteer.volunteersObtained / projectVolunteer.volunteersNeeded) * 100)
}

export const calculateFundingPercent = (project) => {
  if (!project.funding) return 0 
  const fundingPercent = parseInt(project.funding.fundingReceived)/parseInt(project.funding.fundingNeeded)
  return fundingPercent
}