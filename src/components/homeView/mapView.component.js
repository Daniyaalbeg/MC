import React from 'react';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import '../../css/map.css';
import token from '../../config';
import styled from 'styled-components';
import { selectingRationEvent } from '../../Actions/selectRationEventActions';
import svgD from '../../assets/svg.js'
import filterAndSearch from './filterAndSearch'

mapboxgl.accessToken = token

const Map = ReactMapboxGl({
  accessToken: token
});

const flyToOptions = {
  speed: 1
}

const image = new Image();
image.src = 'data:image/svg+xml;charset=utf-8;base64,'+btoa(svgD);
const images = ['sack', image]

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 40;
  font-size: 35;
  padding: 5px;
  border-radius: 2px;
`;

const layoutLayer = {
  'icon-image': 'sack'
}

const startingBounds = [[78.7393, 37.2946], [59.9632, 23.5181]];
let rationEventKeys = {}

class MapView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      center: [69.3451, 30.3753],
      zoom: [4.7],
    }
  }

  componentWillUpdate() {
    this.props.filteredEvents.map((event) => {
      rationEventKeys[event._id] = {...event}
    });
  }

  onDrag = () => {
    if (this.props.selectedRation) {
      this.setState = ({
        center: this.props.selectedRation.location.coordinates,
        zoom: [14]
      })
      this.props.dispatch(selectingRationEvent(null))
    }
  }

  onMarkerClick = (rationEventId) => {
    this.props.dispatch(selectingRationEvent(rationEventKeys[rationEventId]))
  }

  render() {
    return (
      <Map
        style='mapbox://styles/daniyaalbeg/ck8xf05we46ts1ipm9zqkoyya'
        containerStyle={{
          height: '100%',
          width: '100%'
        }}
        
        fitBounds={startingBounds}
        center={this.props.selectedRation == null ? this.state.center : this.props.selectedRation.location.coordinates}
        zoom={this.props.selectedRation == null ? this.state.zoom : [14]}
        // onZoom={}
        // onMove={}
        onDrag={this.onDrag}
        flyToOptions={flyToOptions}
      >
        <Layer type="symbol" id="marker" layout={layoutLayer} images={images} >
          {this.props.filteredEvents.map((rationEvent, index) => (
            <Feature
              key={rationEvent._id}
              coordinates={rationEvent.location.coordinates}
              onClick={() => {this.onMarkerClick(rationEvent._id)}}
            />
          ))}
        </Layer>
        {this.props.selectedRation && (
          <Popup key={this.props.selectedRation._id} coordinates={this.props.selectedRation.location.coordinates}>
            <StyledPopup>
              <div>{this.props.selectedRation.name}</div>
            </StyledPopup>
          </Popup>
        )
        }
      </Map>
    )
  } 
}


const MapStateToProps = (state) => ({
  selectedRation: state.rationInfo.selectedRation,
  filteredEvents: filterAndSearch(state.rationInfo.rationEvents, state.rationInfo.filter, state.rationInfo.search)
});

export default connect(MapStateToProps)(MapView);