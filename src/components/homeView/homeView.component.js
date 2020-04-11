import React, { useEffect, Fragment } from 'react';
import MapView from './mapView.component';
import RationListView from './rationListView.component';
import RationInfoView from './rationInfoView.component';
import { connect } from 'react-redux';
import { getRationInfo } from '../../Actions/getRationinfoActions';
import '../../css/homeView.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HomeView = ({ dispatch, loading, fetched, selectedRation, rationEvents}) => {

  useEffect(() => {
    if (!fetched && !loading) {
      dispatch(getRationInfo())
    }
  })

  return (
    <div className="container">
      <div className="top">
        <div className="mapView"><MapView rationEvents={rationEvents}/></div>
        <div className="rationListView"><RationListView /></div>
      </div>
      <div className="bottom">
        <div className="rationInfoView"><RationInfoView rationEvent={selectedRation} /></div>
      </div>
    </div>
  )
}

const MapStateToProps = (state) => ({
  loading: state.rationInfo.loading,
  selectedRation: state.rationInfo.selectedRation,
  fetched: state.rationInfo.fetched,
  rationEvents: state.rationInfo.rationEvents
})

export default connect(MapStateToProps)(HomeView);