import React from 'react';

import mcWhole3 from '../../assets/svg/mcWhole3.svg';
import pin from '../../assets/svg/pin.svg'
import * as MapLayerType from './mapLayerTypes';

const MapLegend = ({ mapLayerToDisplay }) => {
  return (
    <div className="mapLegend">
      <p id="mapLegendHeader"> Map Legend </p>
      <div className="mapLegendRow">
        <img className="mapLegendRoundIcons" src={mcWhole3} alt="asd"/>
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
          <img className="mapLegendRoundIcons" src={pin} alt="asd"/>
          <p> Local Support Organisation (LSO) </p>
        </div>
        </>
      )
    default:
      return null
  }
}

export default MapLegend