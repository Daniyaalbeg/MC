import React, { useEffect } from 'react';
// import MapView from './mapView.component';
import { Helmet } from 'react-helmet';
import MapView from './mapViewGoogle.component';
import MapListView from './mapListView.component';

const HomeView = () => {

  return (
    <>
    <Helmet>
      <html lang="en" />
      <meta name="description" content="Map that shows distribtuions, projects, layer data, etc all over Pakistan" />
    </Helmet>
    <div className="containerHome">
      <div className="mapView">
        <MapView />
      </div>
      <div className="eventListView">
        <MapListView />
      </div>
    </div>
    </>
  )
}


export default HomeView;