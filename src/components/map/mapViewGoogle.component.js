import React from 'react';
import { connect } from 'react-redux';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'

import filterAndSearch from '../utilities/filterAndSearch'


const Map = ({ dispatch, selectedEvent, showList, fetched, filteredEvents }) => {
  return (
    <GoogleMap
      defaultZoom={6}
      defaultCenter={{ lat: 30.3753, lng:  69.3451}}
    >
    {
      filteredEvents.map((event) => {
        return <Marker 
          key={event._id}
          position={{
            lat: event.location.coordinates[1],
            lng: event.location.coordinates[0]
          }}
        />
      })
    }
    </GoogleMap >
  );
}

const MapStateToProps = (state) => ({
  selectedEvent: state.eventInfo.selectedEvent,
  showList: state.eventInfo.showList,
  fetched: state.eventInfo.fetched,
  filteredEvents: filterAndSearch(state.eventInfo.events, state.eventInfo.filterType, state.eventInfo.filter, state.eventInfo.search)
});

const MapView = withScriptjs(withGoogleMap(connect(MapStateToProps)(Map)));

export default MapView