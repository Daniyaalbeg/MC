import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { GoogleMap, useLoadScript, Marker, MarkerClusterer } from '@react-google-maps/api'

import filterAndSearch from '../utilities/filterAndSearch'
import { selectingEvent, toggleShowList } from '../../Actions/selectEventActions';
import { GOOGLE_API_KEY } from '../../config';
// import sack, { shirt, coin, mask, MCRing} from '../../assets/svg.js'
import coin from '../../assets/svg/coin.svg';
import sack from '../../assets/svg/sack.svg';
import shirt from '../../assets/svg/shirt.svg';
import mask from '../../assets/svg/mask.svg';
import circle from '../../assets/circle.png';

const libraries = []
let eventKeys = []

const MapView = ({ dispatch, selectedEvent, showList, fetched, filteredEvents }) => {
  const [map, setMap] = useState(null)
  const [computeDict, setComputeDict] = useState(false)


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
  const zoom = 6;

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: true,
    rotateControl: true,
  }

  const clusterOptions = {
    imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
    // imagePath: circle
    // styles: [{
    //   textColor: 'black',
    //   height: 53,
    //   url: circle,
    //   width: 53
    // },
    // {
    //   textColor: 'black',
    //   height: 56,
    //   url: circle,
    //   width: 56
    // },
    // {
    //   textColor: 'black',
    //   height: 66,
    //   url:circle,
    //   width: 66
    // },
    // {
    //   textColor: 'black',
    //   height: 78,
    //   url: circle,
    //   width: 78
    // },
    // {
    //   textColor: 'black',
    //   height: 90,
    //   url: circle,
    //   width: 90
    // }]
  }

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    // map.zoom = 6
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onMarkerClick = (eventId) => {
    map.zoom = 18
    dispatch(selectingEvent(eventKeys[eventId]))
    if (showList) {
      dispatch(toggleShowList())
    }
  }

  if (loadError) return <div> error </div>
  if (!isLoaded) return <div>  </div>
  
  return (
    // <LoadScript
    // googleMapsApiKey={GOOGLE_API_KEY}
    // >
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={selectedEvent === null ? center : { lat: selectedEvent.location.coordinates[1], lng: selectedEvent.location.coordinates[0] } }
      zoom={selectedEvent === null ? zoom : 18}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={options}
    >
      <MarkerClusterer
        options={clusterOptions}
        averageCenter
      >
        {(clusterer) =>
          filteredEvents.map((event) => {
            return <Marker 
              key={event._id}
              position={{
                lat: event.location.coordinates[1],
                lng: event.location.coordinates[0]
              }}
              icon={{
                url: whichIcon(event.typeOfRation),
                scaledSize: new window.google.maps.Size(35, 35),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(12, 12),
              }}
              onClick={() => onMarkerClick(event._id)}
              clusterer={clusterer}
            />
          })
        }
      </MarkerClusterer>
    {/* {
      filteredEvents.map((event) => {
        return <Marker 
          key={event._id}
          position={{
            lat: event.location.coordinates[1],
            lng: event.location.coordinates[0]
          }}
          icon={{
            url: coin,
            scaledSize: new window.google.maps.Size(35, 35),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(12, 12),
          }}
        />
      })
    } */}
    </GoogleMap >
    // </LoadScript>
  );
}

const whichIcon = (type) => {
  switch(type) {
    case "food":
      return sack
    case "clothes":
      return shirt
    case "ppe":
      return mask
    default:
      return sack
  }
}

const MapStateToProps = (state) => ({
  selectedEvent: state.eventInfo.selectedEvent,
  showList: state.eventInfo.showList,
  fetched: state.eventInfo.fetched,
  filteredEvents: filterAndSearch(state.eventInfo.events, state.eventInfo.filterType, state.eventInfo.filter, state.eventInfo.search)
});

export default memo(connect(MapStateToProps)(MapView))