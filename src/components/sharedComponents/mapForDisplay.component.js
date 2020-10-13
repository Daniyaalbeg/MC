import React, { Component, Fragment } from "react";
import { MAPBOX_API_KEY } from '../../config';
import mapboxgl from 'react-mapbox-gl';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import * as markers from '../../assets/svg.js';
import '../../css/map.css';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


mapboxgl.accessToken = MAPBOX_API_KEY

const Map = ReactMapboxGl({
  accessToken: MAPBOX_API_KEY
});


const layoutLayer = {
  'icon-image': 'marker'
}

const flyToOptions = {
  speed: 1
}

const image = new Image();
image.src = 'data:image/svg+xml;charset=utf-8;base64,'+btoa(markers.mapPin);
const images = ['marker', image]


class MapForDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: [props.location.coordinates[0], props.location.coordinates[1]],
      zoom: [4],
      selectedPoint: [],
      geocoderAdded: false
    }
  }

  render() {
    return (
      <Fragment>
      {/* <input className="dontShow" name="location" id="location"/> */}
      <Map
        style={'mapbox://styles/daniyaalbeg/ck8xf05we46ts1ipm9zqkoyya'}
        containerStyle={{
          height: '300px',
          width: '100%',
          borderRadius: '5px',
        }}
        center={this.state.center}
        zoom={this.state.zoom}
        onDrag={this.onDrag}
        flyToOptions={flyToOptions}
        onStyleLoad={(map) => {
          map.addControl(
            new MapboxGeocoder({
              accessToken: MAPBOX_API_KEY,
              mapboxgl: map,
              countries: 'pk'
            })
          )
        }}
      >
        <Layer type="symbol" id="marker" layout={layoutLayer} images={images} >
          <Feature
            key={'clickedMarker'}
            coordinates={this.state.center}
          />
        </Layer>
      </Map>
      </Fragment>
    )
  }
}

export default MapForDisplay