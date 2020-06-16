import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { GoogleMap, useLoadScript, Marker, MarkerClusterer, Polygon, InfoWindow } from '@react-google-maps/api'

import filterAndSearch from '../utilities/filterAndSearch'
import { selectingEvent, toggleShowList } from '../../Actions/selectEventActions';
import * as MapLayerType from './mapLayerTypes';
import { GOOGLE_API_KEY } from '../../config';
import ucData from '../../assets/data/Union_Council_With_Average.json';
import ucSimpleData from '../../assets/data/Union_Council_Simple_With_Average.json';
import districtData from '../../assets/data/District_Boundary_With_Average.json';
import nationalData from '../../assets/data/National_Boundary_With_Average.json';
import provinceData from '../../assets/data/Provincial_Constituency_With_Average.json';
import tehsilData from '../../assets/data/Tehsil_Boundary_With_Average.json';

// import sack, { shirt, coin, mask, MCRing} from '../../assets/svg.js'
import coin from '../../assets/svg/coin.svg';
import sack from '../../assets/svg/sack.svg';
import shirt from '../../assets/svg/shirt.svg';
import mask from '../../assets/svg/mask.svg';
// import circle from '../../assets/circle.png';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const libraries = []
let eventKeys = []

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

const polyOptions = {
  fillColor: "#4c59623f",
  strokeColor: "#4C5962",
  strokeOpacity: 0.5,
  strokeWeight: 1,
  clickable: true,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1
}

const MapView = ({ dispatch, selectedEvent, showList, fetched, filteredEvents, mapLayer }) => {
  const [map, setMap] = useState(null)
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
  const zoom = 6;

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: true,
    rotateControl: true,
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
    // map.setCenter({ lat: eventKeys[eventId].location.coordinates[1], lng: eventKeys[eventId].location.coordinates[0] })
    // map.setZoom(18)
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
      onClick={() => setShowInfo(false)}
      onDrag={() => setShowInfo(false)}
      mapContainerStyle={containerStyle}
      center={selectedEvent === null ? center : { lat: selectedEvent.location.coordinates[1], lng: selectedEvent.location.coordinates[0] } }
      // center={center}
      zoom={selectedEvent === null ? zoom : 16}
      // zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={options}
    >
      <MapLayer mapLayer={mapLayer} events={filteredEvents} onMarkerClick={onMarkerClick} showInfo={showInfo} setShowInfo={setShowInfo} />
    </GoogleMap >
    // </LoadScript>
  );
}

const MapLayer = ({ mapLayer, events, onMarkerClick, showInfo, setShowInfo }) => {
  switch(mapLayer) {
    case MapLayerType.NONE:
      return (
        <MarkerClusterer
        options={clusterOptions}
        averageCenter
      >
        {(clusterer) =>
          events.map((event) => {
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
      )
    case MapLayerType.UC:
      return (
        <>
          {ucSimpleData.features.map((feature) => {
            if (feature.geometry === undefined) {
              console.log('empty')
              return null
            }
            return <Polygon onMouseOver={() => showInfoBox()} onClick={(e) => {
              setShowInfo({ "feature": feature, latLng: e.latLng })
            }} key={feature.properties.Shape_Leng+feature.properties.Shape_Area} paths={feature.geometry.coordinates} options={polyOptions}/>
          })}
          {showInfo &&
            <InfoWindow
              position={showInfo.latLng}
              onCloseClick={() => setShowInfo(false)}
            >
            <div className="mapInfoBox">
              <p className="mapInfoBoxHeading"> UC </p>
              <h6>{showInfo.feature.properties.UC}</h6>
              <p className="mapInfoBoxHeading"> Province </p>
              <p>{showInfo.feature.properties.PROVINCE}</p>
              <p className="mapInfoBoxHeading"> District </p>
              <p>{showInfo.feature.properties.DISTRICT}</p>
              <p className="mapInfoBoxHeading"> Tehsil </p>
              <p>{showInfo.feature.properties.TEHSIL}</p>
            </div>
          </InfoWindow>

          }
        </>
      )
    case MapLayerType.DISTRICT:
      return (
        <>
          {districtData.features.map((feature) => {
            return <Polygon onMouseOver={() => showInfoBox()} onClick={(e) => {
              setShowInfo({ "feature": feature, latLng: e.latLng })
            }} key={feature.geometry.averageLatLng.lat} paths={feature.geometry.coordinates} options={polyOptions}/>
          })}
          {showInfo &&
            <InfoWindow
              position={showInfo.latLng}
              onCloseClick={() => setShowInfo(false)}
            >
            <div className="mapInfoBox">
              <p className="mapInfoBoxHeading"> District </p>
              <h6>{showInfo.feature.properties.DISTRICT}</h6>
              <p className="mapInfoBoxHeading"> Province </p>
              <p>{showInfo.feature.properties.PROVINCE}</p>
            </div>
          </InfoWindow>

          }
        </>
      )
    case MapLayerType.TEHSIL:
      return (
        <>
          {tehsilData.features.map((feature) => {
            return <Polygon onMouseOver={() => showInfoBox()} onClick={(e) => {
              setShowInfo({ "feature": feature, latLng: e.latLng })
            }} key={feature.properties.Shape_Leng+feature.properties.Shape_Area} paths={feature.geometry.coordinates} options={polyOptions}/>
          })}
          {showInfo &&
            <InfoWindow
              position={showInfo.latLng}
              onCloseClick={() => setShowInfo(false)}
            >
            <div className="mapInfoBox">
              <p className="mapInfoBoxHeading"> Tehsil </p>
              <h6>{showInfo.feature.properties.TEHSIL}</h6>
              <p className="mapInfoBoxHeading"> Province </p>
              <p>{showInfo.feature.properties.PROVINCE}</p>
              <p className="mapInfoBoxHeading"> District </p>
              <p>{showInfo.feature.properties.DISTRICT}</p>
            </div>
          </InfoWindow>

          }
        </>
      )
    case MapLayerType.PROVINCE:
      return (
        <>
          {provinceData.features.map((feature) => {
            return <Polygon onMouseOver={() => showInfoBox()} onClick={(e) => {
              setShowInfo({ "feature": feature, latLng: e.latLng })
            }} key={feature.properties.Shape_Leng+feature.properties.Shape_Area} paths={feature.geometry.coordinates} options={polyOptions}/>
          })}
          {showInfo &&
            <InfoWindow
              position={showInfo.latLng}
              onCloseClick={() => setShowInfo(false)}
            >
            <div className="mapInfoBox">
              <p className="mapInfoBoxHeading"> District </p>
              <h6>{showInfo.feature.properties.DISTRICT}</h6>
              <p className="mapInfoBoxHeading"> Province </p>
              <p>{showInfo.feature.properties.PROVINCE}</p>
            </div>
          </InfoWindow>

          }
        </>
      )
    case MapLayerType.NATIONAL:
      return (
        <>
          {nationalData.features.map((feature) => {
            return <Polygon onMouseOver={() => showInfoBox()} onClick={(e) => {
              setShowInfo({ "feature": feature, latLng: e.latLng })
            }} key={feature.properties.Shape_Leng+feature.properties.Shape_Area} paths={feature.geometry.coordinates} options={polyOptions}/>
          })}
        </>
      )
    default:
      return null
  }
}

const showInfoBox = () => {
  
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
  selectedEvent: state.mapInfo.selectedEvent,
  showList: state.mapInfo.showList,
  fetched: state.mapInfo.fetched,
  mapLayer: state.mapInfo.mapLayer,
  filteredEvents: filterAndSearch(state.mapInfo.events, state.mapInfo.filterType, state.mapInfo.filter, state.mapInfo.search)
});

export default memo(connect(MapStateToProps)(MapView))