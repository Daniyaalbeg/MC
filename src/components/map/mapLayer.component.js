import React, { createRef } from 'react';
import { Polygon, InfoWindow } from '@react-google-maps/api'

import * as MapLayerType from './mapLayerTypes';
import randomMCColour from '../utilities/randomMCColour.component'

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

const MapLayer = ({ mapBounds, zoomLevel, mapLayerToDisplay, mapLayerData, showInfo, setShowInfo }) => {
  switch(mapLayerToDisplay) {
    case MapLayerType.NONE:
      return (null)
    case MapLayerType.UC:
      return (
        <>
          {mapLayerData[MapLayerType.UC].features.map((feature) => {
            if (feature.geometry === undefined || feature.geometry.coordinates === undefined) {
              return null
            }
            if (feature.geometry.area < 200000000 && zoomLevel < 10) {
              return null
            }
            if (!mapBounds || !mapBounds.contains({ lat: feature.geometry.averageLatLng.lat, lng: feature.geometry.averageLatLng.lng })) {
              return null
            }

            return createPolygon(feature, setShowInfo, mapBounds)
          })}
          {showInfo &&
            <InfoWindow
              position={showInfo.latLng}
              onCloseClick={() => setShowInfo(false)}
            >
            <div className="mapInfoBox">
              <p className="mapInfoBoxHeading"> UC </p>
              <h6>{showInfo.feature.properties.UC_NAME_EN}</h6>
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
          {mapLayerData[MapLayerType.DISTRICT].features.map((feature) => {
            return createPolygon(feature, setShowInfo, mapBounds)
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
          {mapLayerData[MapLayerType.TEHSIL].features.map((feature) => {
            return createPolygon(feature, setShowInfo, mapBounds)
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
          {mapLayerData[MapLayerType.PROVINCE].features.map((feature) => {
           return createPolygon(feature, setShowInfo, mapBounds)
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
              <p className="mapInfoBoxHeading"> PA </p>
              <p>{showInfo.feature.properties.PA}</p>
            </div>
          </InfoWindow>

          }
        </>
      )
    // case MapLayerType.NATIONAL:
    //   return (
    //     <>
    //       {/* {nationalData.features.map((feature) => {
    //         return <Polygon onMouseOver={() => showInfoBox()} onClick={(e) => {
    //           setShowInfo({ "feature": feature, latLng: e.latLng })
    //         }} key={feature.properties.OBJECTID} paths={feature.geometry.coordinates} options={polyOptions}/>
    //       })} */}
    //     </>
    //   )
    default:
      return null
  }
}

const createPolygon = (feature, setShowInfo, mapBounds) => {

  if (feature.geometry === undefined || feature.geometry.coordinates === undefined) {
    return null
  }
  if (!mapBounds || !mapBounds.contains({ lat: feature.geometry.averageLatLng.lat, lng: feature.geometry.averageLatLng.lng })) {
    return null
  }

  const polyRef = createRef()

  return <Polygon
    ref={polyRef}
    onMouseOut={() => {
      polyRef.current.state.polygon.setOptions({fillColor: "#4c59623f"});
    }}
    onMouseMove={() => {
      polyRef.current.state.polygon.setOptions({fillColor: "#444444"});
    }}
    onMouseOver={() => showInfoBox()} onClick={(e) => {
      setShowInfo({ "feature": feature, latLng: e.latLng })
    }}
    key={feature.id}
    paths={feature.geometry.coordinates}
    options={polyOptions}
  />
}

const showInfoBox = () => {
  
}

export default MapLayer