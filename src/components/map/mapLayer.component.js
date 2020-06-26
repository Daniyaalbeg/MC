import React, { memo } from 'react';
import { InfoWindow, Marker, MarkerClusterer } from '@react-google-maps/api';

import { connect } from 'react-redux';

import * as MapLayerType from './mapLayerTypes';
import createPolygon from './createPolygon';
// import randomMCColour from '../utilities/randomMCColour.component'
import markerDuotone from '../../assets/svg/pin.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/pro-solid-svg-icons';

const clusterOptions = {
  styles: [{
    height: 40,
    url: "m/m1.png",
    width: 40,
    textColor: "#f5f5f5"
    },
    {
    height: 45,
    url: "m/m2.png",
    width: 45,
    textColor: "#f5f5f5",
    },
    {
    height: 55,
    url: "m/m3.png",
    width: 55,
    textColor: "#f5f5f5"
    },
    {
    height: 75,
    url: "m/m4.png",
    width: 75,
    textColor: "#f5f5f5"
    },
    {
    height: 90,
    url: "m/m5.png",
    width: 90,
    textColor: "#f5f5f5"
    }]
}

const MapLayer = ({ mapBounds, zoomLevel, lsoLocations, mapLayerToDisplay, mapLayerData, showInfo, setShowInfo }) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 

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
              <p className="mapInfoBoxHeading"> District </p>
              <h6>{showInfo.feature.properties.DISTRICT}</h6>
              <p className="mapInfoBoxHeading"> Tehsil </p>
              <h6>{showInfo.feature.properties.TEHSIL}</h6>
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
              <h6>{showInfo.feature.properties.PROVINCE}</h6>
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
              <h6>{showInfo.feature.properties.PROVINCE}</h6>
              <p className="mapInfoBoxHeading"> District </p>
              <h6>{showInfo.feature.properties.DISTRICT}</h6>
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
              <h6>{showInfo.feature.properties.PROVINCE}</h6>
              <p className="mapInfoBoxHeading"> PA </p>
              <h6>{showInfo.feature.properties.PA}</h6>
            </div>
          </InfoWindow>

          }
        </>
      )
      case MapLayerType.LSO:
        return (
          <>
          <MarkerClusterer
              options={clusterOptions}
              averageCenter
            >
            {(clusterer) =>
              lsoLocations.LSOs.map((feature) => {
                return <Marker 
                  key={feature.properties.id+feature.geometry.averageLatLng.lat+feature.geometry.averageLatLng.lng}
                  position={{
                    lat: feature.geometry.averageLatLng.lat,
                    lng: feature.geometry.averageLatLng.lng
                  }}
                  icon={{
                    url: markerDuotone,
                    scaledSize: new window.google.maps.Size(35, 35),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(12, 12),
                  }}
                  clusterer={clusterer}
                  onClick={(e) => {
                    setShowInfo({ "feature": feature, latLng: e.latLng })
                  }}
                />
              })
            }
          </MarkerClusterer>
            {showInfo &&
              <InfoWindow
                position={showInfo.latLng}
                onCloseClick={() => setShowInfo(false)}
              >
                <div className="mapInfoBox">
                  <p className="mapInfoBoxHeading"> LSO Name </p>
                  <h6>{showInfo.feature.properties.LSO}</h6>
                  <p className="mapInfoBoxHeading"> District </p>
                  <h6>{showInfo.feature.properties.DISTRICT}</h6>
                  <p className="mapInfoBoxHeading"> Households </p>
                  <div className="lsoHouseContainer">
                    <div className="lsoHouse">
                      <FontAwesomeIcon icon={faHouse} size="3x" className="lsoHouseInfoBottom" />
                      <FontAwesomeIcon icon={faHouse} size="3x" className="lsoHouseInfoTop" style={{ clipPath: "inset("+Math.abs((showInfo.feature.properties.OHH/showInfo.feature.properties.HH)*100-100)+"% 0px 0px 0px)"}} />
                    </div>
                    <div className="lsoHouseInfo">
                      <p className="mapInfoBoxHeading"> HH </p>
                      <p>{showInfo.feature.properties.HH}</p>
                      <p className="mapInfoBoxHeading"> OHH </p>
                      <p>{showInfo.feature.properties.OHH}</p>
                    </div>
                  </div>
                  <p className="mapInfoBoxHeading"> VDO </p>
                  <h6>{showInfo.feature.properties.VDO}</h6>
                  <p className="mapInfoBoxHeading"> VCO </p>
                  <h6>{showInfo.feature.properties.VCO}</h6>
                  <p className="mapInfoBoxHeading"> Data created </p>
                  <h6>{new Date(showInfo.feature.properties.dateOfFormation).toLocaleDateString("en-US", dateOptions)}</h6>
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
  setShowInfo: ownProps.setShowInfo,
  lsoLocations: state.mapInfo.mapData.mapStoredData[MapLayerType.LSO]
});

export default memo(connect(MapStateToProps)(MapLayer))