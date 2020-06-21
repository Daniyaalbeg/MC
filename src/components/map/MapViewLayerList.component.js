import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loadingLayer } from '../../Actions/mapActions';
import { Spinner } from 'react-bootstrap';

import * as MapLayerType from './mapLayerTypes';

const MapViewLayerList = ({ dispatch, loading }) => {
  const [activeButton, setActiveButton] = useState(0)

  const checkActiveState = (type) => {
    if (type === activeButton) {
      return "active"
    }
  }

  const whichButton = (type) => {
    if (loading) {
      if (type === activeButton) {
        return <LoadingSpinner />
      } else {
        return label(type)
      }
    } else {
      return label(type)
    }
  }

  const label = (type) => {
    switch(type) {
      case 0:
        return "None"
      case 1:
        return "UC"
      case 2:
        return "TEHSIL"
      case 3:
        return "DISTRICT"
      case 4:
        return "PROVINCE"
      default:
        return "error"
    }
  }

  const LoadingSpinner = () => {
    return (
      <div className="loadingSpinner">
        <Spinner animation="border" role="status" size="sm">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <div className="MapViewLayerListContainer">
      <button className={"MapLayerButton " + checkActiveState(0)} onClick={(e) => {
        setActiveButton(0)
        dispatch(loadingLayer(MapLayerType.NONE))
      }}> {whichButton(0)} </button>
      <button className={"MapLayerButton " + checkActiveState(1)} onClick={(e) => {
        setActiveButton(1)
        dispatch(loadingLayer(MapLayerType.UC))
      }}> {whichButton(1)} </button>
      <button className={"MapLayerButton " + checkActiveState(2)} onClick={(e) => {
        setActiveButton(2)
        dispatch(loadingLayer(MapLayerType.TEHSIL))
      }}> {whichButton(2)} </button>
      <button className={"MapLayerButton " + checkActiveState(3)} onClick={(e) => {
        setActiveButton(3)
        dispatch(loadingLayer(MapLayerType.DISTRICT))
      }}> {whichButton(3)} </button>
      {/* <button className={"MapLayerButton " + checkActiveState(4)} onClick={(e) => {
        setActiveButton(4)
        dispatch(loadingLayer(MapLayerType.PROVINCE))
      }}> {whichButton(4)} </button> */}
      {/* <button className={"MapLayerButton " + checkActiveState(5)} onClick={(e) => {
        setActiveButton(5)
        dispatch(changingMapLayer(MapLayerType.NATIONAL))
      }}> NATIONAL </button> */}
    </div>
  )
}

const MapStateToProps = (state) => ({
  loading: state.mapInfo.mapData.loadingMapLayer
})

export default connect(MapStateToProps)(MapViewLayerList);