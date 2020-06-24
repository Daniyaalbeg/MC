import React, { memo } from 'react';
import { Marker, MarkerClusterer } from '@react-google-maps/api';
import { connect } from 'react-redux';

import filterAndSearch from '../utilities/filterAndSearch';

// import sack, { shirt, coin, mask, MCRing} from '../../assets/svg.js'
import coin from '../../assets/svg/coin.svg';
import sack from '../../assets/svg/sack.svg';
import shirt from '../../assets/svg/shirt.svg';
import mask from '../../assets/svg/mask.svg';

const clusterOptions = {
  imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
  // imagePath: circle
  // styles: [{
  //   textColor: 'black',
  //   height: 53,
  //   url: circle,
  //   width: 53
  // },
  // {
  //   textColor: 'black',
  //   height: 56,
  //   url: circle,
  //   width: 56
  // },
  // {
  //   textColor: 'black',
  //   height: 66,
  //   url:circle,
  //   width: 66
  // },
  // {
  //   textColor: 'black',
  //   height: 78,
  //   url: circle,
  //   width: 78
  // },
  // {
  //   textColor: 'black',
  //   height: 90,
  //   url: circle,
  //   width: 90
  // }]
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
    default:
      return sack
  }
}

const MapStateToProps = (state) => ({
  filteredEvents: filterAndSearch(state.mapInfo.mapActions.events, state.mapInfo.mapActions.filterType, state.mapInfo.mapActions.filter, state.mapInfo.mapActions.search)
});

export default memo(connect(MapStateToProps)(MapMarkers))