const filterAndSearch = (events, filterType, filter, search) => {
  search = search.toLowerCase();
  const approved = events.filter((event) => {
    return event.approved
  })
  const filteredEventsType = approved.filter((event) => {
    if (filterType === "all") {
      return true
    } else {
      if (filterType === event.typeOfRation) {
        return true
      } else {
        return false
      }
    }
  })
  const filteredEvents = filteredEventsType.filter((event) => {
    if (filter === "all") {
      return true
    } else {
      if (filter === event.createdBy.type) {
        return true
      } else {
        return false;
      }
    }
  });
  const searchedAndFilteredEvents = filteredEvents.filter((event) => {
    try {
      return (event.name.toLowerCase().includes(search) || event.createdBy.supplierName.toLowerCase().includes(search) || event.createdBy.description.toLowerCase().includes(search) || event.itemsDescription.toLowerCase().includes(search) || event.typeOfRation.toLowerCase().includes(search))
    } catch {
      return false
    }
  });
  return searchedAndFilteredEvents
}

export const filterAndSearchOrg = (orgs, filterType, filterProject, search) => {
  search = search.toLowerCase();
  const filteredOrgType = orgs.filter((org) => {
    if (filterType === "all") {
      return true
    }
    if (filterType === org.type) {
      return true
    } else {
      return false;
    }
  });

  const filteredOrgProject = filteredOrgType.filter((org) => {
    if (filterProject === "all") {
      return true
    }
    for (const work of org.areaOfWork) {
      if (work === filterProject) {
        return true
      }
    }
    return false
  })

  const searchedAndFilteredEvents = filteredOrgProject.filter((org) => {
    return (org.supplierName.toLowerCase().includes(search) || org.description.toLowerCase().includes(search))
  });



  //filter by project type here

  return searchedAndFilteredEvents
}

export default filterAndSearch