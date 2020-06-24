import React, { memo } from 'react';
import { InfoWindow } from '@react-google-maps/api';

import { connect } from 'react-redux';

import * as MapLayerType from './mapLayerTypes';
import createPolygon from './createPolygon';
// import randomMCColour from '../utilities/randomMCColour.component'

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
    default:
      return null
  }
}


const MapStateToProps = (state, ownProps) => ({
  mapLayerToDisplay: state.mapInfo.mapData.mapLayerToDisplay,
  mapLayerData: state.mapInfo.mapData.mapStoredData,
  zoomLevel: ownProps.zoomLevel,
  mapBounds: ownProps.mapBounds,
  showInfo: ownProps.showInfo,
  setShowInfo: ownProps.setShowInfo
});

export default memo(connect(MapStateToProps)(MapLayer))