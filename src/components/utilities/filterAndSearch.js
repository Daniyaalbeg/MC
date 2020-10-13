const filterAndSearch = (objects, mapMode, filterCategory, filter, search) => {
  return objects
  search = search.toLowerCase();
  const approved = objects.filter((object) => {
    return object.approved
  })
  const filteredEventsType = approved.filter((object) => {
    if (filterCategory === "all") {
      return true
    } else {
      if (filterCategory === object.typeOfRation) {
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

export const filterAndSearchOrg = (orgs, filterCategory, filterProject, search) => {
  search = search.toLowerCase();
  const filteredOrgType = orgs.filter((org) => {
    if (filterCategory === "all") {
      return true
    }
    if (filterCategory === org.type) {
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
    return (org.name.toLowerCase().includes(search) || org.description.toLowerCase().includes(search))
  });



  //filter by project type here

  return searchedAndFilteredEvents
}

export const filterAndSearchProject = (projects, filterCategories, search) => {
  search = search.toLowerCase();
  const filteredProjectType = projects.filter((project) => {
    if (filterCategories.length === 0) {
      return true
    }

    if (!project.secondaryCategories) return false

    if (filterCategories.includes(project.primaryCategory)) {
      return true
    } else {
      const arrayDiff = diff(filterCategories, project.secondaryCategories)
      if (arrayDiff.length !== 0) return true
    }
  
    return false
  });

  const searchedAndFilteredProjects = filteredProjectType.filter((project) => {
    return (project.name.toLowerCase().includes(search) || project.description.toLowerCase().includes(search))
  });

  return searchedAndFilteredProjects
}

const diff = (arr1, arr2) => {
  var ret = [];
  arr1.sort();
  arr2.sort();
  for(var i = 0; i < arr1.length; i += 1) {
      if(arr2.indexOf(arr1[i]) > -1){
          ret.push(arr1[i]);
      }
  }
  return ret;
};

export default filterAndSearch