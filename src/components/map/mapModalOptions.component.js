import React from 'react';
import { connect } from 'react-redux';

import { FilterRationType, FilterOrgType } from '../utilities/filterOptions'
import { filterEvents, filterCategoryType } from '../../Actions/filterSearchMapAction';

import { FilterProjectCategory } from '../utilities/filterOptions';
import MapSettingLayerList from './MapSettingLayerList.component';

const MapModalOptions = ({ dispatch, showModal, mapMode, filter, filterCategory }) => {
  return (
    <>
      <MapSettingLayerList />
      <br />
      <MapModalOptionalSettings dispatch={dispatch} showModal={showModal} mapMode={mapMode} filter={filter} filterCategory={filterCategory} />
    </>
  )
}

const MapModalOptionalSettings = ({ dispatch, mapMode, filter, filterCategory, showModal }) => {
  switch(mapMode) {
    case "PROJECTS":
      return <MapModalProjectOptions dispatch={dispatch} filterCategory={filterCategory} showModal={showModal} />
    case "EVENTS":
      return <MapModalEventOptions dispatch={dispatch} filter={filter} filterCategory={filterCategory} />
    default:
      return null
  }
}

const MapModalProjectOptions = ({ dispatch, filterCategory, showModal }) => {
  return (
    <>
      <h6 className="filterProjectCategoryTitle"> Filter projects by category </h6>
      <FilterProjectCategory dispatch={dispatch} filterCategory={filterCategory} showModal={showModal} />
    </>
  )
}

const MapModalEventOptions = ({ dispatch, filter, filterCategory }) => {
  const onFilterChangeType = (event) => {
    dispatch(filterCategoryType(event.target.value))
  }
  
  // const onFilterChange = (event) => {
  //   dispatch(filterEvents(event.target.value))
  // }

  return (
    <div className="filters">
      <p className="mapModalLayerTitle"> Filter By Category </p>
      <div className="filterSelect">
        <FilterRationType onChange={onFilterChangeType} value={filterCategory} />
      </div>
      {/* <p className="mapModalLayerTitle"> Filter By Organisation Type </p>
      <div className="filterSelect">
        <FilterOrgType onChange={onFilterChange} value={filter} />
      </div> */}
    </div>
  )
}

const MapStateToProps = (state) => ({
  mapMode: state.mapInfo.mapActions.mapMode,
  filter: state.mapInfo.mapActions.filter,
  filterCategory: state.mapInfo.mapActions.filterCategory
})

export default connect(MapStateToProps)(MapModalOptions)