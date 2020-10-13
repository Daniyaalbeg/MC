import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';

import * as MapLayerType from './mapLayerTypes';
import { loadingNationalLayer } from '../../Actions/mapActions';
import { createNationalPolygon } from './createPolygon';

const MapLayerNational = ({ dispatch, nationalLayerData, zoomLevel, mapLayerToDisplay }) => {
  useEffect(() => {
    console.log("run once")
    dispatch(loadingNationalLayer())
  }, [dispatch])

  if (zoomLevel < 10) {
    return null
  }

  if (nationalLayerData && mapLayerToDisplay === MapLayerType.UC) {
    return nationalLayerData.features.map((feature) => {
      return createNationalPolygon(feature)
    })
  } else {
    return null
  }
}

const MapStateToProps = (state) => ({
  nationalLayerData: state.mapInfo.mapData.mapStoredData[MapLayerType.NATIONAL]
})

export default memo(connect(MapStateToProps)(MapLayerNational))