import React, { Component, Fragment } from "react";
import token from '../../config';
import mapboxgl from 'mapbox-gl';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import svgD from '../../assets/svg.js'
import '../../css/map.css';


mapboxgl.accessToken = token

const Map = ReactMapboxGl({
  accessToken: token
});

const layoutLayer = {
  'icon-image': 'sack'
}

const flyToOptions = {
  speed: 1
}

const image = new Image();
image.src = 'data:image/svg+xml;charset=utf-8;base64,'+btoa(svgD);
const images = ['sack', image]

const startingBounds = [[78.7393, 37.2946], [59.9632, 23.5181]];

class SelectMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: [69.3451, 30.3753],
      zoom: [4.7],
      selectedPoint: []
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
           center: e.lngLat
          })
          this.props.callBack([this.state.location.lng, this.state.location.lat])
        }}
        fitBounds={startingBounds}
        center={this.state.center}
        zoom={this.state.zoom}
        onDrag={this.onDrag}
        flyToOptions={flyToOptions}
      >
        {this.state.selectedPoint &&
          <Layer type="symbol" id="marker" layout={layoutLayer} images={images} >
            <Feature
              key={'clickedMarker'}
              coordinates={this.state.selectedPoint}
            />
          </Layer>
        }
      </Map>
      </Fragment>
    )
  }
}

export default SelectMap