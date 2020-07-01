import React, { useState, useEffect, memo, useCallback } from 'react';
import { connect } from 'react-redux';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

import * as MapLayerType from './mapLayerTypes';
import MapMarkers from './mapMarkers.component';
import MapLayer from './mapLayer.component';
import MapLayerNational from './mapLayerNational.component';
import MapLegend from './mapLegend.component';

import filterAndSearch from '../utilities/filterAndSearch';
import { selectingEvent, toggleShowList, justSelectedEvent } from '../../Actions/selectEventActions';
import { loadingLayer } from '../../Actions/mapActions';
import { GOOGLE_API_KEY } from '../../config';

/* global google */

// import { fal } from '@fortawesome/pro-light-svg-icons';

// import circle from '../../assets/circle.png';

const libraries = []
let eventKeys = []

const MapView = ({ justSelected, dispatch, mapLayerData, mapLayerToDisplay, selectedEvent, showList, fetched, filteredEvents, mapLayer }) => {
  const [map, setMap] = useState(null)
  const [mapBounds, setMapBounds] =useState(null)
  const [zoomLevel, setZoomLevel] = useState(null)
  const [computeDict, setComputeDict] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [layerSelectedOnce, setLayerSelectedOnce] = useState(false)

  useEffect(() => {
    if (fetched && !computeDict) {
      setComputeDict(true)
      filteredEvents.forEach((event) => {
        eventKeys[event._id] = {...event}
      });
    }

    dispatch(loadingLayer(MapLayerType.NONE))
  }, [fetched, computeDict])
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries
  })

  const containerStyle = {
    width: '100%',
    height: '100%'
  }
  
  const center = {
    lat: 31.04318239643529,
    lng:  74.04074184374998
  }

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: true,
    rotateControl: true,
  }

  const onLoad = useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map)
    setZoomLevel(6)
    map.setZoom(6)
    map.setCenter(center)
    let bounds = map.getBounds()
    setMapBounds(bounds)
    map.setOptions({
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT
      }
    })
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
    setMapBounds(null)
    setZoomLevel(null)
  }, [])

  const onMarkerClick = (eventId) => {
    map.setCenter({ lat: eventKeys[eventId].location.coordinates[1], lng: eventKeys[eventId].location.coordinates[0] })
    map.setZoom(15)
    dispatch(selectingEvent(eventKeys[eventId]))
    if (showList) {
      dispatch(toggleShowList())
    }
  }

  const onZoomChanged = () => {
    if (map) {
      setZoomLevel(map.zoom)
      setMapBounds(createExtendedBounds(map))
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
    setMapBounds(createExtendedBounds(map))
  }

  const onClick = () => {
    setShowInfo(false)
  }

  if (loadError) return <div> error </div>
  if (!isLoaded) return <div>  </div>

  if (selectedEvent && justSelected) {
    dispatch(justSelectedEvent())
    //Hard code the moving map to centralise it. These values are pretty yolo only working for zoom level 15
    map.setCenter({ lat: selectedEvent.location.coordinates[1] + 0.0002628164259, lng: selectedEvent.location.coordinates[0] + 0.009922714459})
    // map.zoom = 15
    setTimeout(() => {
      map.setZoom(15)
    }, 100);
  }

  if (mapLayerToDisplay !== MapLayerType.NONE && !layerSelectedOnce) {
    setLayerSelectedOnce(true)
    if (map) {
      setMapBounds(createExtendedBounds(map))
    }
  }
  
  return (
    <>
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
      <MapLegend mapLayerToDisplay={mapLayerToDisplay} />
      <MapMarkers events={filteredEvents} onMarkerClick={onMarkerClick} />
      {mapLayerToDisplay !== MapLayerType.NONE &&
        <MapLayer mapBounds={mapBounds} zoomLevel={zoomLevel} showInfo={showInfo} setShowInfo={setShowInfo} />
      }
      {mapLayerToDisplay === MapLayerType.UC &&
        <MapLayerNational />
      }
    </GoogleMap >
    </>
  );
}


const createExtendedBounds = (map) => {
  //0.5 degress in lng roughly translates to 55,555m VERY ROUGH
  //111,111 * cos(lat) is 11 degree of lat
  //https://gis.stackexchange.com/questions/2951/algorithm-for-offsetting-a-latitude-longitude-by-some-amount-of-meters
    let bounds = map.getBounds()
    let NE = bounds.getNorthEast()
    let SW = bounds.getSouthWest()
    let newNE = { lat: NE.lat() + 0.2, lng: NE.lng() + 0.2}
    let newSW = { lat: SW.lat() - 0.2, lng: SW.lng() - 0.2}
    bounds.extend(newNE)
    bounds.extend(newSW)
    return bounds
  }


const MapStateToProps = (state) => ({
  selectedEvent: state.mapInfo.mapActions.selectedEvent,
  justSelected: state.mapInfo.mapActions.justSelected,
  showList: state.mapInfo.mapActions.showList,
  fetched: state.mapInfo.mapActions.fetched,
  mapLayer: state.mapInfo.mapData.mapLayer,
  mapLayerToDisplay: state.mapInfo.mapData.mapLayerToDisplay,
  mapLayerData: state.mapInfo.mapData.mapStoredData,
  filteredEvents: filterAndSearch(state.mapInfo.mapActions.events, state.mapInfo.mapActions.filterType, state.mapInfo.mapActions.filter, state.mapInfo.mapActions.search)
});

export default memo(connect(MapStateToProps)(MapView))