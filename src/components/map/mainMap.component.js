import React, { useEffect } from 'react';
// import MapView from './mapView.component';
import { Helmet } from 'react-helmet';
import MapView from './mapViewGoogle.component';
import EventListView from './eventListView.component';
import MapViewLayerList from './MapViewLayerList.component';
import { connect } from 'react-redux';
import { getEventInfo, getEventResetFetch } from '../../Actions/getEventInfoActions';
import { GOOGLE_API_KEY } from '../../config';
import '../../css/mainMap.css';

const HomeView = ({ dispatch, loading, fetched}) => {

  useEffect(() => {
    if (!fetched && !loading) {
      dispatch(getEventInfo())
    }

    return function cleanUp() {
      // console.log("as")
      // dispatch(getEventResetFetch());
    }
  })

  return (
    <>
    <Helmet>
      <html lang="en" />
      <meta name="description" content="Map that shows distribtuions, projects, layer data, etc all over Pakistan" />
    </Helmet>
    <div className="containerHome">
      {/* <div className="mapView"><MapView /></div> */}
      <div className="mapViewLayerList">
        <MapViewLayerList />
      </div>
      <div className="mapView">
        <MapView />
      </div>
      <div className="eventListView"><EventListView /></div>
    </div>
    </>
  )
}

const MapStateToProps = (state) => ({
  loading: state.mapInfo.loading,
  fetched: state.mapInfo.fetched,
})

export default connect(MapStateToProps)(HomeView);