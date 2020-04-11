import React, { useLayoutEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
import '../../css/map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaXlhYWxiZWciLCJhIjoiY2s2Y2V6M2VtMDRjbTNtcWJpaGl5Z2Q3eCJ9.eL1wNXGcQdJ5CUQCdGNW1A';

const mapStart = ({
  lng: 69.3451,
  lat: 30.3753,
  zoom: 4.7
})

var mapContainer

const MapView = ({dispatch, rationEvents, selectedRation}) => {

  useLayoutEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/mapbox/outdoors-v9',
      center: [mapStart.lng, mapStart.lat],
      zoom: mapStart.zoom
    });

    const features = []
    rationEvents.map((rationEvent) => {
      const feature = {
        'type': 'feature',
        'geometry': {
          'type': rationEvent.location.type,
          'coordinates': [rationEvent.location.coordinates[1], rationEvent.location.coordinates[0]]
        },
        'properties': {
          'title': rationEvent.name,
          'icon': 'fast-food'
        }
      }
      features.push(feature)
    });
  
    map.on('load', () => {
      map.addSource('points', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': features
        }
      });
      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
        // get the icon name from the source's "icon" property
        // concatenate the name to get an icon from the style's sprite sheet
        'icon-image': ['concat', ['get', 'icon'], '-15'],
        // get the title name from the source's "title" property
        'text-field': ['get', 'title'],
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.6],
        'text-anchor': 'top'
        }
        });
    });
  });

  return (
    <div ref={el => mapContainer = el} className="mapContainer" />
    )
}

const MapStateToProps = (state) => ({
  selectedRation: state.rationInfo.selectedRation,
  rationEvents: state.rationInfo.rationEvents 
});

export default connect(MapStateToProps)(MapView);