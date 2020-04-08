import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import '../../css/map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaXlhYWxiZWciLCJhIjoiY2s2Y2V6M2VtMDRjbTNtcWJpaGl5Z2Q3eCJ9.eL1wNXGcQdJ5CUQCdGNW1A';

class MapView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lng: 73.0479,
      lat: 33.6844,
      zoom: 10
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/outdoors-v9',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el} className="mapContainer" />
    )
  }
}

export default MapView;