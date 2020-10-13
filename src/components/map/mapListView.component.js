import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

import { selectingObject, toggleShowList, toggleMapModal, selectedProjectMarker } from '../../Actions/mapSelectActions';
import filterAndSearch from '../utilities/filterAndSearch';
import { searchEvents, filterEvents } from '../../Actions/filterSearchMapAction';
import { GenericModalPortal, MapModal } from '../sharedComponents/genericModal.component';
import LoadingSpinner from '../utilities/loadingSpinner.component';

import MapModalOptions from './mapModalOptions.component';
import EventInfoView from './eventInfoView.component';
import EventListItem from './eventListItem.component';
import ProjectListItem from './projectListItem.component';
import MapListControl from './mapListControl.component';

const MapListView = ({dispatch, filteredObjects, mapMode, showModal, selectedObject, selectedProject, searchValue, showList, loading}) => {

  if (showList) {
    return (
      <div className="eventListContainer">
        {showModal &&
          <GenericModalPortal>
            <MapModal showModal={() => dispatch(toggleMapModal())}>
              <MapModalOptions showModal={() => dispatch(toggleMapModal())} />
            </MapModal>
          </GenericModalPortal>
        }
        <MapListControl dispatch={dispatch} />
        <hr className="searchBarSpace"/>
        <div className="eventItemList" id="objectList">
          <ListOfObjects dispatch={dispatch} loading={loading} mapMode={mapMode} selectedProject={selectedProject} objects={filteredObjects} />
        </div>
      </div>
    )
  } else {
    return (
      <EventInfoView event={selectedObject} onClick={() => {
        dispatch(selectingObject(null))
        dispatch(toggleShowList())
      }} />
    )
  }
}

const resetSearchAndFilter = (dispatch) => {
  dispatch(searchEvents(""))
  dispatch(filterEvents("all"))
}

const ListOfObjects = ({ dispatch, mapMode, objects, selectedProject, loading }) => {
  const history = useHistory();
  const refs = objects.reduce((acc, value) => {
    acc[value._id] = React.createRef();
    return acc;
  }, {})

  useEffect(() => {
    if (selectedProject) {
      refs[selectedProject].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [selectedProject])

  if (loading) return <LoadingSpinner style={{ height: "200px" }} />

  switch(mapMode) {
    case "PROJECTS":
      {return objects.map((object) => {
        return (
          <div ref={refs[object._id]} className={"eventItem" + (selectedProject === object._id ? " active" : "")} key={object._id} onClick={() => {
            dispatch(selectedProjectMarker(object._id))
          }}>
            <ProjectListItem project={object} />
          </div>
        )
      })}
    case "EVENTS":
      {return objects.map((object) => {
        return (
          <div className="eventItem" key={object._id} onClick={() => {
            dispatch(selectingObject(object))
            dispatch(toggleShowList())
            resetSearchAndFilter(dispatch)
          }}>
            <EventListItem event={object} />
          </div>
        )
      })}
    default:
      return null
  }
}

const MapStateToProps = (state) => ({
  filteredObjects: filterAndSearch(state.mapInfo.mapActions.objects, state.mapInfo.mapActions.mapMode, state.mapInfo.mapActions.filterCategory, state.mapInfo.mapActions.filter, state.mapInfo.mapActions.search),
  loading: state.mapInfo.mapActions.loading,
  mapMode: state.mapInfo.mapActions.mapMode,
  showList: state.mapInfo.mapActions.showList,
  selectedObject: state.mapInfo.mapActions.selectedObject,
  selectedProject: state.mapInfo.mapActions.selectedProject,
  searchValue: state.mapInfo.mapActions.search,
  showModal: state.mapInfo.mapActions.showModal
});

export default connect(MapStateToProps)(MapListView);