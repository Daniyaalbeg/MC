import React from 'react';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Carousel } from  'react-bootstrap';
import '../../css/map.css';
import token from '../../config';
import styled from 'styled-components';
import { selectingRationEvent } from '../../Actions/selectRationEventActions';
import sack, { mapMarker, mapPin, shirt, coin, mask } from '../../assets/svg.js'
import filterAndSearch from './filterAndSearch'

mapboxgl.accessToken = token

const Map = ReactMapboxGl({
  accessToken: token
});

const flyToOptions = {
  speed: 1
}

const imageSack = new Image();
imageSack.src = 'data:image/svg+xml;charset=utf-8;base64,'+btoa(sack);
const imageCoin = new Image();
imageCoin.src = 'data:image/svg+xml;charset=utf-8;base64,'+btoa(coin);
const imageMask = new Image();
imageMask.src = 'data:image/svg+xml;charset=utf-8;base64,'+btoa(mask);
const imageShirt = new Image();
imageShirt.src = 'data:image/svg+xml;charset=utf-8;base64,'+btoa(shirt);
const imagesSack = ['mapSack', imageSack]
const imagesCoin = ['mapCoin', imageCoin]
const imagesShirt = ['mapShirt', imageShirt]
const imagesMask = ['mapMask', imageMask]

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 40;
  font-size: 35;
  border-radius: 2px;
  width: 200px;
  text-align: center;
`;

const layoutLayerSack = {
  'icon-image': 'mapSack'
}
const layoutLayerCoin = {
  'icon-image': 'mapCoin'
}
const layoutLayerShirt = {
  'icon-image': 'mapShirt'
}
const layoutLayerMask = {
  'icon-image': 'mapMask'
}

const startingBounds = [[78.7393, 37.2946], [59.9632, 23.5181]];
let rationEventKeys = {}

class MapView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      center: [69.3451, 30.3753],
      zoom: [4.7],
      screenWidth: null
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions());
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ screenWidth: window.innerWidth });
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
        <FeatureLayer layoutLayer={layoutLayerCoin} images={imagesCoin} onMarkerClick={this.onMarkerClick} filteredEvents={this.props.filteredEvents} whichType="money"/>
        <FeatureLayer layoutLayer={layoutLayerShirt} images={imagesShirt} onMarkerClick={this.onMarkerClick} filteredEvents={this.props.filteredEvents} whichType="clothes"/>
        <FeatureLayer layoutLayer={layoutLayerSack} images={imagesSack} onMarkerClick={this.onMarkerClick} filteredEvents={this.props.filteredEvents} whichType="food"/>
        <FeatureLayer layoutLayer={layoutLayerMask} images={imagesMask} onMarkerClick={this.onMarkerClick} filteredEvents={this.props.filteredEvents} whichType="ppe"/>
        <FeatureLayer layoutLayer={layoutLayerSack} images={imagesSack} onMarkerClick={this.onMarkerClick} filteredEvents={this.props.filteredEvents} whichType="ramadan"/>
        <FeatureLayer layoutLayer={layoutLayerSack} images={imagesSack} onMarkerClick={this.onMarkerClick} filteredEvents={this.props.filteredEvents} whichType="other"/>
        <FeatureLayer layoutLayer={layoutLayerSack} images={imagesSack} onMarkerClick={this.onMarkerClick} filteredEvents={this.props.filteredEvents} whichType={undefined} />
        {this.props.selectedRation && (
          <WhichPopup className="mainPopup" screenWidth={this.state.screenWidth} selectedRation={this.props.selectedRation} />
        )
        }
      </Map>
    )
  } 
}

const FeatureLayer = (props) => {
  const {layoutLayer, images, filteredEvents, onMarkerClick, whichType} = props

  const furtherFilteredEvents = filteredEvents.filter((rationEvent) => {
    // console.log(rationEvent.typeOfRation + " " + whichType)
    // console.log(rationEvent.typeOfRation === whichType)
    // console.log("---------------")
    return rationEvent.typeOfRation === whichType
  })

  if (furtherFilteredEvents.length === 0) {
    return null
  }

  const returnEvents = furtherFilteredEvents.map((rationEvent) => {
    return (
      <Feature 
        key={rationEvent._id}
        coordinates={rationEvent.location.coordinates}
        onClick={() => {onMarkerClick(rationEvent._id)}}
      />
    )
  })
  return (
    <Layer type="symbol" id={whichType} layout={layoutLayer} images={images}>
      {returnEvents}
    </Layer>
  )
}

const WhichPopup = (props) => {

  if (props.screenWidth > 600) {
    return (
      <Popup key={props.selectedRation._id} coordinates={props.selectedRation.location.coordinates}>
        <StyledPopup>
          <div>{props.selectedRation.name}</div>
        </StyledPopup>
      </Popup>
    )
  } else {
    return (
      <Popup className="mainPopup" key={props.selectedRation._id} coordinates={props.selectedRation.location.coordinates}>
        <StyledPopup>
        <Carousel indicators={false}>
            {props.selectedRation.images.map((image) => {
              return (
                <Carousel.Item>
                  <div className="imageContainerMap">
                    <img className="imgMap" src={image} alt="" />
                  </div>
                </Carousel.Item>
              )
            })}
          </Carousel>
          <div className="popupContent">
            <hr />
            <h4 className="text-muted popupHeader">{props.selectedRation.name}</h4>
            <h6 className="text-muted popupHeader"> Description </h6>
            <p className="popupText"> {props.selectedRation.description} </p>
            <h6 className="text-muted popupHeader"> Total rations </h6>
            <p className="popupText"> {props.selectedRation.totalNumberOfItems} </p>
            <h6 className="text-muted popupHeader"> Ration description </h6>
            <p className="popupText"> {props.selectedRation.itemsDescription} </p>
          </div>
        </StyledPopup>
      </Popup>
    )
  }
}


const MapStateToProps = (state) => ({
  selectedRation: state.rationInfo.selectedRation,
  filteredEvents: filterAndSearch(state.rationInfo.rationEvents, state.rationInfo.filter, state.rationInfo.search)
});

export default connect(MapStateToProps)(MapView);