import React, { useEffect } from 'react';
// import MapView from './mapView.component';
import MapView from './mapViewGoogle.component';
import EventListView from './eventListView.component';
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
    <div className="containerHome">
      {/* <div className="mapView"><MapView /></div> */}
      <div className="mapView">
        <MapView />
      </div>
      <div className="eventListView"><EventListView /></div>
    </div>
  )
}

const MapStateToProps = (state) => ({
  loading: state.eventInfo.loading,
  fetched: state.eventInfo.fetched,
})

export default connect(MapStateToProps)(HomeView);