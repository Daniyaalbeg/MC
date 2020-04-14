const filterAndSearch = (rationEvents, filter, search) => {
  const filteredRationEvents = rationEvents.filter((rationEvent) => {
    if (filter == "all") {
      return true
    } else {
      //add filter to check ration info
    }
  });
  const searchedAndFilteredEvents = filteredRationEvents.filter((rationEvent) => {
    return (rationEvent.name.toLowerCase().includes(search) || rationEvent.supplier.supplierName.toLowerCase().includes(search) || rationEvent.supplier.description.toLowerCase().includes(search))
  });
  return searchedAndFilteredEvents
}

export default filterAndSearch