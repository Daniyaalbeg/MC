const findChosenElement = (id, array) => {
  if (array == null) { return null }
  for (let i = 0; i < array.length; i++) {
    if (id === array[i]._id) {
      return array[i]
    }
  }
}

export const findEventInOrgs = (user, orgID, eventID) => {
  if (!user) {
    return null
  }

  const createdOrgs = user.createdOrganisations
  for (let i = 0; i < createdOrgs.length; i++) {
    if (createdOrgs[i]._id.toString() !== orgID) continue
    for (let j = 0; j < createdOrgs[i].events.length; j++) {
      if (createdOrgs[i].events[j]._id.toString() === eventID) {
        return createdOrgs[i].events[j]
      }
    }
  }

  return false
}

export default findChosenElement