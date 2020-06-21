import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

import MapMarkers from './mapMarkers.component';
import MapLayer from './mapLayer.component';

import filterAndSearch from '../utilities/filterAndSearch'
import { selectingEvent, toggleShowList } from '../../Actions/selectEventActions';
import { GOOGLE_API_KEY } from '../../config';

// import circle from '../../assets/circle.png';

const libraries = []
let eventKeys = []

const MapView = ({ dispatch, mapLayerData, mapLayerToDisplay, loadingMapLayer, selectedEvent, showList, fetched, filteredEvents, mapLayer }) => {
  const [map, setMap] = useState(null)
  const [mapBounds, setMapBounds] =useState(null)
  const [zoomLevel, setZoomLevel] = useState(null)
  const [computeDict, setComputeDict] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    if (fetched && !computeDict) {
      setComputeDict(true)
      filteredEvents.forEach((event) => {
        eventKeys[event._id] = {...event}
      });
    }
  })
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries
  })

  const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
  const center = {
    lat: 30.3753,
    lng:  69.3451,
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: true,
    rotateControl: true,
  }

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map)
    setZoomLevel(6)
    map.setZoom(6)
    map.setCenter(center)
    setMapBounds(map.getBounds())
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
    setMapBounds(null)
    setZoomLevel(null)
  }, [])

  const onMarkerClick = (eventId) => {
    map.setCenter({ lat: eventKeys[eventId].location.coordinates[1], lng: eventKeys[eventId].location.coordinates[0] })
    map.setZoom(16)
    dispatch(selectingEvent(eventKeys[eventId]))
    if (showList) {
      dispatch(toggleShowList())
    }
  }

  const onZoomChanged = () => {
    if (map) {
      setZoomLevel(map.zoom)
      setMapBounds(map.getBounds())
    }
  }

  const onDrag = () => {
    if (selectedEvent) {
      dispatch(selectingEvent(null))
      dispatch(toggleShowList())
    }
    setShowInfo(false)
  }

  const onDragEnd = () => {
    setMapBounds(map.getBounds())
  }

  const onClick = () => {
    setShowInfo(false)
  }

  if (loadError) return <div> error </div>
  if (!isLoaded) return <div>  </div>

  if (selectedEvent) {
    // if (map.getCenter().lat !== selectedEvent.location.coordinates[1] && map.getCenter().lng !== selectedEvent.location.coordinates[0] && map.zoom !== 16) {
    map.setCenter({ lat: selectedEvent.location.coordinates[1], lng: selectedEvent.location.coordinates[0] })
    map.setZoom(16)
    // }
  }
  
  
  return (
    <GoogleMap
    onClick={() => onClick()}
    onDragEnd={() => onDragEnd()}
    onZoomChanged={() => onZoomChanged()}
    onDrag={() => onDrag()}
    mapContainerStyle={containerStyle}
    onLoad={onLoad}
    onUnmount={onUnmount}
    options={options}
    >
      <MapMarkers events={filteredEvents} onMarkerClick={onMarkerClick} />
      <MapLayer mapBounds={mapBounds} zoomLevel={zoomLevel} mapLayerToDisplay={mapLayerToDisplay} mapLayerData={mapLayerData} showInfo={showInfo} setShowInfo={setShowInfo} />
    </GoogleMap >
  );
}

const MapStateToProps = (state) => ({
  selectedEvent: state.mapInfo.mapActions.selectedEvent,
  showList: state.mapInfo.mapActions.showList,
  fetched: state.mapInfo.mapActions.fetched,
  mapLayer: state.mapInfo.mapData.mapLayer,
  mapLayerData: state.mapInfo.mapData.mapStoredData,
  mapLayerToDisplay: state.mapInfo.mapData.mapLayerToDisplay,
  loadingMapLayer: state.mapInfo.mapData.loadingMapLayer,
  filteredEvents: filterAndSearch(state.mapInfo.mapActions.events, state.mapInfo.mapActions.filterType, state.mapInfo.mapActions.filter, state.mapInfo.mapActions.search)
});

export default memo(connect(MapStateToProps)(MapView))