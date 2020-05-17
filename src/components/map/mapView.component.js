import React, { Fragment } from 'react';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
import ReactMapboxGl, { Cluster, Layer, Feature, Popup, MapContext } from 'react-mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Carousel } from  'react-bootstrap';
import '../../css/map.css';
import token from '../../config';
import styled from 'styled-components';
import { selectingEvent } from '../../Actions/selectEventActions';
import sack, { mapMarker, mapPin, shirt, coin, mask, MCRing} from '../../assets/svg.js'
import filterAndSearch from '../utilities/filterAndSearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{ faGlobeAsia } from '@fortawesome/pro-regular-svg-icons';

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
const imageMCRing = new Image();
imageMCRing.src = 'data:image/svg+xml;charset=utf-8;base64,'+btoa(MCRing);
const imagesSack = ['mapSack', imageSack]
const imagesCoin = ['mapCoin', imageCoin]
const imagesShirt = ['mapShirt', imageShirt]
const imagesMask = ['mapMask', imageMask]
const imagesMCRing = ['mapMCRing', imageMCRing]

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
const layoutLayerMCRing = {
  'icon-image': 'mapMCRing'
}

const startingBounds = [[78.7393, 37.2946], [59.9632, 23.5181]];
let eventKeys = {}

class MapView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      center: [69.3451, 30.3753],
      zoom: [4.7],
      screenWidth: null,
      styleSatellite: false 
    }
    this.styleButtonClicked = this.styleButtonClicked.bind(this);
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
      return eventKeys[event._id] = {...event}
    });
  }

  onDrag = () => {
    if (this.props.selectedEvent) {
      this.setState = ({
        center: this.props.selectedEvent.location.coordinates,
        zoom: [14],
      })
      this.props.dispatch(selectingEvent(null))
    }
  }

  onMarkerClick = (eventId) => {
    this.props.dispatch(selectingEvent(eventKeys[eventId]))
  }

  styleButtonClicked() {
    this.setState({
      styleSatellite: !this.state.styleSatellite
    })
  }

  render() {
    return (
      <Fragment>
      <button className="styleToggle" onClick={this.styleButtonClicked}>
        <FontAwesomeIcon icon={faGlobeAsia} />
      </button>
      <Map
        style='mapbox://styles/daniyaalbeg/ck8xf05we46ts1ipm9zqkoyya'
        containerStyle={{
          height: '100%',
          width: '100%'
        }}
        
        fitBounds={startingBounds}
        center={this.props.selectedEvent == null ? this.state.center : this.props.selectedEvent.location.coordinates}
        zoom={this.props.selectedEvent == null ? this.state.zoom : [14]}
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
          map.addControl(
            new mapboxgl.NavigationControl()
          )
        }}
      >
        <MapContext.Consumer>
          {(map) => {
            map.setStyle(this.state.styleSatellite ? "mapbox://styles/mapbox/satellite-v9" : "mapbox://styles/daniyaalbeg/ck8xf05we46ts1ipm9zqkoyya")
          }}
        </MapContext.Consumer>
        <FeatureLayer layoutLayer={layoutLayerCoin} images={imagesCoin} onMarkerClick={this.onMarkerClick} filteredEvents={this.props.filteredEvents} whichType="money"/>
        <FeatureLayer layoutLayer={layoutLayerShirt} images={imagesShirt} onMarkerClick={this.onMarkerClick} filteredEvents={this.props.filteredEvents} whichType="clothes"/>
        <FeatureLayer layoutLayer={layoutLayerSack} images={imagesSack} onMarkerClick={this.onMarkerClick} filteredEvents={this.props.filteredEvents} whichType="food"/>
        <FeatureLayer layoutLayer={layoutLayerMask} images={imagesMask} onMarkerClick={this.onMarkerClick} filteredEvents={this.props.filteredEvents} whichType="ppe"/>
        <FeatureLayer layoutLayer={layoutLayerSack} images={imagesSack} onMarkerClick={this.onMarkerClick} filteredEvents={this.props.filteredEvents} whichType="ramadan"/>
        <FeatureLayer layoutLayer={layoutLayerSack} images={imagesSack} onMarkerClick={this.onMarkerClick} filteredEvents={this.props.filteredEvents} whichType="other"/>
        <FeatureLayer layoutLayer={layoutLayerSack} images={imagesSack} onMarkerClick={this.onMarkerClick} filteredEvents={this.props.filteredEvents} whichType={undefined} />
        {this.props.selectedEvent && (
          <WhichPopup className="mainPopup" screenWidth={this.state.screenWidth} selectedEvent={this.props.selectedEvent} />
        )
        }
      </Map>
      </Fragment>
    )
  } 
}

const FeatureLayer = (props) => {
  const {layoutLayer, images, filteredEvents, onMarkerClick, whichType} = props

  const furtherFilteredEvents = filteredEvents.filter((event) => {
    return event.typeOfRation === whichType
  })

  if (furtherFilteredEvents.length === 0) {
    return null
  }

  const returnEvents = furtherFilteredEvents.map((event) => {
    return (
      <Feature 
        key={event._id}
        coordinates={event.location.coordinates}
        onClick={() => {onMarkerClick(event._id)}}
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
      <Popup key={props.selectedEvent._id} coordinates={props.selectedEvent.location.coordinates}>
        <StyledPopup>
          <div>{props.selectedEvent.name}</div>
        </StyledPopup>
      </Popup>
    )
  } else {
    return (
      <Popup className="mainPopup" key={props.selectedEvent._id} coordinates={props.selectedEvent.location.coordinates}>
        <StyledPopup>
        <Carousel indicators={false}>
            {props.selectedEvent.images.map((image) => {
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
            <h4 className="text-muted popupHeader">{props.selectedEvent.name}</h4>
            <h6 className="text-muted popupHeader"> Description </h6>
            <p className="popupText"> {props.selectedEvent.description} </p>
            <h6 className="text-muted popupHeader"> Total rations </h6>
            <p className="popupText"> {props.selectedEvent.totalNumberOfItems} </p>
            <h6 className="text-muted popupHeader"> Ration description </h6>
            <p className="popupText"> {props.selectedEvent.itemsDescription} </p>
          </div>
        </StyledPopup>
      </Popup>
    )
  }
}


const MapStateToProps = (state) => ({
  selectedEvent: state.eventInfo.selectedEvent,
  filteredEvents: filterAndSearch(state.eventInfo.events, state.eventInfo.filterType, state.eventInfo.filter, state.eventInfo.search)
});

export default connect(MapStateToProps)(MapView);