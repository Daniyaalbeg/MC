import React, { useState } from 'react';
import { connect } from 'react-redux';

import { changingMapLayer } from '../../Actions/mapActions';
import * as MapLayerType from './mapLayerTypes';

const MapViewLayerList = ({ dispatch }) => {
  const [activeButton, setActiveButton] = useState(0)

  const checkActiveState = (type) => {
    if (type === activeButton) {
      return "active"
    }
  }

  return (
    <div className="MapViewLayerListContainer">
      <button className={"MapLayerButton " + checkActiveState(0)} onClick={(e) => {
        setActiveButton(0)
        dispatch(changingMapLayer(MapLayerType.NONE))
      }}> None </button>
      <button className={"MapLayerButton " + checkActiveState(1)} onClick={(e) => {
        setActiveButton(1)
        dispatch(changingMapLayer(MapLayerType.UC))
      }}> UC </button>
      <button className={"MapLayerButton " + checkActiveState(2)} onClick={(e) => {
        setActiveButton(2)
        dispatch(changingMapLayer(MapLayerType.TEHSIL))
      }}> TEHSIL </button>
      <button className={"MapLayerButton " + checkActiveState(3)} onClick={(e) => {
        setActiveButton(3)
        dispatch(changingMapLayer(MapLayerType.DISTRICT))
      }}> DISTRICT </button>
      <button className={"MapLayerButton " + checkActiveState(4)} onClick={(e) => {
        setActiveButton(4)
        dispatch(changingMapLayer(MapLayerType.PROVINCE))
      }}> PROVINCE </button>
      <button className={"MapLayerButton " + checkActiveState(5)} onClick={(e) => {
        setActiveButton(5)
        dispatch(changingMapLayer(MapLayerType.NATIONAL))
      }}> NATIONAL </button>
    </div>
  )
}

const MapStateToProps = (state) => ({

})

export default connect(MapStateToProps)(MapViewLayerList);