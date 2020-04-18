const filterAndSearch = (rationEvents, filter, search) => {
  const approved = rationEvents.filter((rationEvent) => {
    return rationEvent.approved
  })
  const filteredRationEvents = approved.filter((rationEvent) => {
    if (filter == "all") {
      return true
    } else {
      if (filter == rationEvent.supplier.type) {
        return true
      } else {
        return false;
      }
    }
  });
  const searchedAndFilteredEvents = filteredRationEvents.filter((rationEvent) => {
    return (rationEvent.name.toLowerCase().includes(search) || rationEvent.supplier.supplierName.toLowerCase().includes(search) || rationEvent.supplier.description.toLowerCase().includes(search))
  });
  return searchedAndFilteredEvents
}

export default filterAndSearch