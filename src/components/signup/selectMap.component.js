import React, { Component, Fragment } from "react";
import token from '../../config';
import mapboxgl, { MapContext } from 'react-mapbox-gl';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import * as markers from '../../assets/svg.js';
// import Geocoder from './Geocoder.component';
import '../../css/map.css';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


mapboxgl.accessToken = token

const Map = ReactMapboxGl({
  accessToken: token
});

const GeocodedMap = () => {

}

const layoutLayer = {
  'icon-image': 'marker'
}

const flyToOptions = {
  speed: 1
}

const image = new Image();
image.src = 'data:image/svg+xml;charset=utf-8;base64,'+btoa(markers.markerDuotone);
const images = ['marker', image]

const startingBounds = [[78.7393, 37.2946], [59.9632, 23.5181]];

class SelectMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: [69.3451, 30.3753],
      zoom: [4.7],
      selectedPoint: [],
      geocoderAdded: false
    }
  }

  render() {
    return (
      <Fragment>
      {/* <input className="dontShow" name="location" id="location"/> */}
      <Map
        style='mapbox://styles/daniyaalbeg/ck8xf05we46ts1ipm9zqkoyya'
        containerStyle={{
          height: '300px',
          width: '100%',
          borderRadius: '5px',
        }}
        onClick={ (stuff, e) => {
          this.setState({
           location: e.lngLat,
           center: e.lngLat,
           selectedPoint: [e.lngLat.lng, e.lngLat.lat]
          })
          this.props.callBack([this.state.location.lng, this.state.location.lat])
        }}
        fitBounds={startingBounds}
        center={this.state.center}
        zoom={this.state.zoom}
        onDrag={this.onDrag}
        flyToOptions={flyToOptions}
        onStyleLoad={(map) => {
          map.addControl(
            new MapboxGeocoder({
              accessToken: token,
              mapboxgl: map,
              countries: 'pk'
            })
          )
        }}
      >
        <Layer type="symbol" id="marker" layout={layoutLayer} images={images} >
          {this.state.selectedPoint.length != 0 &&
            <Feature
              key={'clickedMarker'}
              coordinates={this.state.selectedPoint}
            />
          }
        </Layer>
        {/* <Geocoder /> */}
      </Map>
      </Fragment>
    )
  }
}

export default SelectMap