import React, { memo } from 'react';
import { Marker, MarkerClusterer } from '@react-google-maps/api';
import { connect } from 'react-redux';

import filterAndSearch from '../utilities/filterAndSearch';

import coin from '../../assets/svg/coin.svg';
import sack from '../../assets/svg/sack.svg';
import shirt from '../../assets/svg/shirt.svg';
import mask from '../../assets/svg/mask.svg';


const clusterOptions = {
  styles: [{
    height: 40,
    url: "m/m1.png",
    width: 40,
    textColor: "#f5f5f5"
    },
    {
    height: 45,
    url: "m/m2.png",
    width: 45,
    textColor: "#f5f5f5",
    },
    {
    height: 55,
    url: "m/m3.png",
    width: 55,
    textColor: "#f5f5f5"
    },
    {
    height: 75,
    url: "m/m4.png",
    width: 75,
    textColor: "#f5f5f5"
    },
    {
    height: 90,
    url: "m/m5.png",
    width: 90,
    textColor: "#f5f5f5"
    }]
}

const MapMarkers = ({ events, onMarkerClick }) => {
  return (
    <MarkerClusterer
        options={clusterOptions}
        averageCenter
      >
        {(clusterer) =>
          events.map((event) => {
            return <Marker 
              key={event._id}
              position={{
                lat: event.location.coordinates[1],
                lng: event.location.coordinates[0]
              }}
              icon={{
                url: whichIcon(event.typeOfRation),
                scaledSize: new window.google.maps.Size(35, 35),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(12, 12),
              }}
              onClick={() => onMarkerClick(event._id)}
              clusterer={clusterer}
            />
          })
        }
      </MarkerClusterer>
  )
}

const whichIcon = (type) => {
  switch(type) {
    case "food":
      return sack
    case "clothes":
      return shirt
    case "ppe":
      return mask
    case "money":
      return coin
    default:
      return sack
  }
}

const MapStateToProps = (state) => ({
  filteredEvents: filterAndSearch(state.mapInfo.mapActions.events, state.mapInfo.mapActions.filterType, state.mapInfo.mapActions.filter, state.mapInfo.mapActions.search)
});

export default memo(connect(MapStateToProps)(MapMarkers))