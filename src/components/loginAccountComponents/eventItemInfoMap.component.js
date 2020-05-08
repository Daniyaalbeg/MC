import React, { Component } from 'react';
import mapboxgl, { Point } from 'mapbox-gl';
import '../../css/map.css';
import token from '../../config';

mapboxgl.accessToken = token;

class EventItemInfoMap extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainerInfo,
      style: 'mapbox://styles/mapbox/outdoors-v9',
      center: [this.props.event.location.coordinates[0], this.props.event.location.coordinates[1]],
      zoom: 14
    });

    this.map.on('load', () => {
      this.map.addSource('points', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'feature',
              'geometry': {
                'type': this.props.event.location.type,
                'coordinates' : [this.props.event.location.coordinates[0], this.props.event.location.coordinates[1]]
              },
              'properties': {
                'title': this.props.event.name,
                'icon': 'fast-food'
              }
            }
          ]
        }
      });
      this.map.addLayer({
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
  }

  componentDidUpdate() {
    window.requestAnimationFrame(()=>{
      this.map.resize();
    })
  }

  render() {
    return (
      <div ref={el => this.mapContainerInfo = el} className="mapContainerInfo" />
    )
  }
}

export default EventItemInfoMap