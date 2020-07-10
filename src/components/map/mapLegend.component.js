import React from 'react';

import target from '../../assets/target.png';
import lsoMarker from '../../assets/svg/LSO_Marker.svg'
import * as MapLayerType from './mapLayerTypes';

const MapLegend = ({ mapLayerToDisplay }) => {
  return (
    <div className="mapLegend">
      <p id="mapLegendHeader"> Map Legend </p>
      <div className="mapLegendRow">
        <img className="mapLegendRoundIcons" src={target} alt="Marker Target"/>
        <p> Cluster of icons </p>
      </div>
      <LegendBasedOnLayer mapLayerToDisplay={mapLayerToDisplay} />
    </div>
  )
}

const LegendBasedOnLayer = ({ mapLayerToDisplay }) => {
  switch(mapLayerToDisplay) {
    case MapLayerType.LSO: 
      return (
        <>
        <div className="mapLegendRow">
          <img className="mapLegendRoundIcons lsoIconLegend" src={lsoMarker} alt="asd"/>
          <p> Local Support Organisation (LSO) </p>
        </div>
        </>
      )
    default:
      return null
  }
}

export default MapLegend