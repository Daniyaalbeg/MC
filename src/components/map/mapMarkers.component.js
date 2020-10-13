import React, { memo } from 'react';
import { Marker, MarkerClusterer } from '@react-google-maps/api';
import { connect } from 'react-redux';

import filterAndSearch from '../utilities/filterAndSearch';
import { getIconSource } from '../iconController/iconCategories.component';

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

const MapMarkers = ({ objects, onMarkerClick, mapMode }) => {
  if (objects.length === 0) return null
  
  return (
    <MarkerClusterer
        options={clusterOptions}
        averageCenter
      >
        {(clusterer) =>
          objects.map((object) => {
            return <Marker 
              key={object._id}
              position={{
                lat: object.location.coordinates[1],
                lng: object.location.coordinates[0]
              }}
              icon={{
                url: getIconSource(mapMode === "PROJECTS" ? object.primaryCategory : object.typeOfRation),
                scaledSize: new window.google.maps.Size(35, 35),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(12, 12),
              }}
              onClick={() => {
                onMarkerClick(object._id)
              }}
              clusterer={clusterer}
            />
          })
        }
      </MarkerClusterer>
  )
}

const MapStateToProps = (state) => ({
  objects: filterAndSearch(state.mapInfo.mapActions.objects, state.mapInfo.mapActions.mapMode, state.mapInfo.mapActions.filterCategory, state.mapInfo.mapActions.filter, state.mapInfo.mapActions.search),
  mapMode: state.mapInfo.mapActions.mapMode
});

export default memo(connect(MapStateToProps)(MapMarkers))