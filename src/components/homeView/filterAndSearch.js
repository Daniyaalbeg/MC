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
      if (filter === event.supplier.type) {
        return true
      } else {
        return false;
      }
    }
  });
  const searchedAndFilteredEvents = filteredEvents.filter((event) => {
    try {
      return (event.name.toLowerCase().includes(search) || event.supplier.supplierName.toLowerCase().includes(search) || event.supplier.description.toLowerCase().includes(search) || event.itemsDescription.toLowerCase().includes(search) || event.typeOfRation.toLowerCase().includes(search))
    } catch {
      return false
    }
  });
  return searchedAndFilteredEvents
}

export const filterAndSearchOrg = (orgs, filter, search) => {
  search = search.toLowerCase();
  const filteredOrgEvents = orgs.filter((org) => {
    if (filter === "all") {
      return true
    }
    if (filter === org.type) {
      return true
    } else {
      return false;
    }
  });
  const searchedAndFilteredEvents = filteredOrgEvents.filter((org) => {
    return (org.supplierName.toLowerCase().includes(search) || org.description.toLowerCase().includes(search))
  });
  return searchedAndFilteredEvents
}

export default filterAndSearch