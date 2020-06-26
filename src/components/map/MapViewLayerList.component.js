import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loadingLayer, loadingLsoLayer } from '../../Actions/mapActions';
import { Spinner } from 'react-bootstrap';

import * as MapLayerType from './mapLayerTypes';

const MapViewLayerList = ({ dispatch, loading }) => {
  const [activeButton, setActiveButton] = useState(0)
  const [activeToolTip, setActiveToolTip] = useState(null)

  const checkActiveState = (type) => {
    if (type === activeButton) {
      return "active"
    }
  }

  const checkActiveToolTip = (type) => {
    if (type === activeToolTip) {
      return "showToolTip"
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
      case 5:
        return "LSO"
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
      <button className={"MapLayerButton " + checkActiveState(0)}
      onClick={(e) => {
        setActiveButton(0)
        dispatch(loadingLayer(MapLayerType.NONE))
      }}> {whichButton(0)} </button>

      <div className="MapLayerButtonContainer">
        <button className={"MapLayerButton " + checkActiveState(1)}
          onClick={(e) => {
            setActiveButton(1)
            dispatch(loadingLayer(MapLayerType.UC))
          }}
          onMouseOver={() => setActiveToolTip(0)}
          onMouseLeave={() => setActiveToolTip(null)}
        > {whichButton(1)} </button>
        <p className={"toolTip " + checkActiveToolTip(0)}> Union Council </p>
      </div>

      <div className="MapLayerButtonContainer">
        <button className={"MapLayerButton " + checkActiveState(2)}
          onClick={(e) => {
            setActiveButton(2)
            dispatch(loadingLayer(MapLayerType.TEHSIL))
          }}
          onMouseOver={() => setActiveToolTip(1)}
          onMouseLeave={() => setActiveToolTip(null)}
        > {whichButton(2)} </button>
        <p className={"toolTip " + checkActiveToolTip(1)}> Tehsils </p>
      </div>

      <div className="MapLayerButtonContainer">
        <button className={"MapLayerButton " + checkActiveState(3)}
          onClick={(e) => {
            setActiveButton(3)
            dispatch(loadingLayer(MapLayerType.DISTRICT))
          }}
          onMouseOver={() => setActiveToolTip(2)}
          onMouseLeave={() => setActiveToolTip(null)}
        > {whichButton(3)} </button>
        <p className={"toolTip " + checkActiveToolTip(2)}> Districts </p>
      </div>

      <div className="MapLayerButtonContainer">
        <button className={"MapLayerButton " + checkActiveState(5)}
          onClick={(e) => {
            setActiveButton(5)
            dispatch(loadingLsoLayer())
          }}
          onMouseOver={() => setActiveToolTip(3)}
          onMouseLeave={() => setActiveToolTip(null)}
        > {whichButton(5)} </button>
        <p className={"toolTip " + checkActiveToolTip(3)}> Local Support Organisations </p>
      </div>
    </div>
  )
}

const MapStateToProps = (state) => ({
  loading: state.mapInfo.mapData.loadingMapLayer
})

export default connect(MapStateToProps)(MapViewLayerList);