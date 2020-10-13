import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loadingLayer, loadingLsoLayer } from '../../Actions/mapActions';
import { Spinner } from 'react-bootstrap';

import * as MapLayerType from './mapLayerTypes';

const MapSettingLayerList = ({ dispatch, loading, mapLayer}) => {
  const [activeButton, setActiveButton] = useState(mapLayer)
  const [activeToolTip, setActiveToolTip] = useState(null)

  const checkActiveState = (type) => {
    if (type === activeButton) {
      return "active"
    } else return ""
  }

  const checkActiveToolTip = (type) => {
    if (type === activeToolTip) {
      return "showToolTip"
    } else return ""
  }

  const whichButton = (type) => {
    if (loading) {
      if (type === activeButton) {
        return <LoadingSpinner />
      } else {
        return type
      }
    } else {
      return type
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
    <>
    <h6 className="mapModalLayerTitle"> Map Layers </h6>
    <div className="MapViewLayerListContainer">
      <div className="MapLayerButtonContainer">
        <button className={"MapLayerButton " + checkActiveState(MapLayerType.NONE)}
        onClick={(e) => {
          setActiveButton(MapLayerType.NONE)
          dispatch(loadingLayer(MapLayerType.NONE))
        }}> {whichButton(MapLayerType.NONE)} </button>
      </div>

      <div className="MapLayerButtonContainer">
        <button className={"MapLayerButton " + checkActiveState(MapLayerType.UC)}
          onClick={(e) => {
            setActiveButton(MapLayerType.UC)
            dispatch(loadingLayer(MapLayerType.UC))
          }}
          onMouseOver={() => setActiveToolTip(MapLayerType.UC)}
          onMouseLeave={() => setActiveToolTip(null)}
        > {whichButton(MapLayerType.UC)} </button>
        <p className={"toolTip " + checkActiveToolTip(MapLayerType.UC)}> Union Council </p>
      </div>

      <div className="MapLayerButtonContainer">
        <button className={"MapLayerButton " + checkActiveState(MapLayerType.TEHSIL)}
          onClick={(e) => {
            setActiveButton(MapLayerType.TEHSIL)
            dispatch(loadingLayer(MapLayerType.TEHSIL))
          }}
          onMouseOver={() => setActiveToolTip(MapLayerType.TEHSIL)}
          onMouseLeave={() => setActiveToolTip(null)}
        > {whichButton(MapLayerType.TEHSIL)} </button>
        <p className={"toolTip " + checkActiveToolTip(MapLayerType.TEHSIL)}> Tehsils </p>
      </div>

      <div className="MapLayerButtonContainer">
        <button className={"MapLayerButton " + checkActiveState(MapLayerType.DISTRICT)}
          onClick={(e) => {
            setActiveButton(MapLayerType.DISTRICT)
            dispatch(loadingLayer(MapLayerType.DISTRICT))
          }}
          onMouseOver={() => setActiveToolTip(MapLayerType.DISTRICT)}
          onMouseLeave={() => setActiveToolTip(null)}
        > {whichButton(MapLayerType.DISTRICT)} </button>
        <p className={"toolTip " + checkActiveToolTip(MapLayerType.DISTRICT)}> Districts </p>
      </div>

      <div className="MapLayerButtonContainer">
        <button className={"MapLayerButton " + checkActiveState("LSO")}
          onClick={(e) => {
            setActiveButton("LSO")
            dispatch(loadingLsoLayer())
          }}
          onMouseOver={() => setActiveToolTip("LSO")}
          onMouseLeave={() => setActiveToolTip(null)}
        > {whichButton("LSO")} </button>
        <p className={"toolTip " + checkActiveToolTip("LSO")}> Local Support Organisations </p>
      </div>
    </div>
    </>
  )
}

const MapStateToProps = (state) => ({
  loading: state.mapInfo.mapData.loadingMapLayer,
  mapLayer: state.mapInfo.mapData.mapLayerToDisplay
})

export default connect(MapStateToProps)(MapSettingLayerList);