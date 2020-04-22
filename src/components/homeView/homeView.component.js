import React, { useEffect } from 'react';
import MapView from './mapView.component';
import RationListView from './rationListView.component';
import { connect } from 'react-redux';
import { getRationInfo, getRationResetFetch } from '../../Actions/getRationinfoActions';
import '../../css/homeView.css';

const HomeView = ({ dispatch, loading, fetched}) => {

  useEffect(() => {
    if (!fetched && !loading) {
      dispatch(getRationInfo())
    }

    return function cleanUp() {
      // console.log("as")
      // dispatch(getRationResetFetch());
    }
  })

  return (
    <div className="containerHome">
      <div className="mapView"><MapView /></div>
      <div className="rationListView"><RationListView /></div>
    </div>
  )
}

const MapStateToProps = (state) => ({
  loading: state.rationInfo.loading,
  fetched: state.rationInfo.fetched,
})

export default connect(MapStateToProps)(HomeView);