const filterAndSearch = (rationEvents, filterType, filter, search) => {
  search = search.toLowerCase();
  const approved = rationEvents.filter((rationEvent) => {
    return rationEvent.approved
  })
  const filteredRationEventsType = approved.filter((rationEvent) => {
    if (filterType === "all") {
      return true
    } else {
      if (filterType === rationEvent.typeOfRation) {
        return true
      } else {
        return false
      }
    }
  })
  const filteredRationEvents = filteredRationEventsType.filter((rationEvent) => {
    if (filter === "all") {
      return true
    } else {
      if (filter === rationEvent.supplier.type) {
        return true
      } else {
        return false;
      }
    }
  });
  const searchedAndFilteredEvents = filteredRationEvents.filter((rationEvent) => {
    try {
      return (rationEvent.name.toLowerCase().includes(search) || rationEvent.supplier.supplierName.toLowerCase().includes(search) || rationEvent.supplier.description.toLowerCase().includes(search) || rationEvent.itemsDescription.toLowerCase().includes(search) || rationEvent.typeOfRation.toLowerCase().includes(search))
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