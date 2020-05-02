import React, { Fragment, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { Carousel, Spinner } from 'react-bootstrap';
import '../../css/homeView.css';
import { getMainInfo } from '../../Actions/homeViewActions'

import photo1 from '../../assets/Images/oldman.jpg'
import photo2 from '../../assets/Images/chitralman.jpg'
import photo3 from '../../assets/Images/doobi.jpg'
import photo4 from '../../assets/Images/kalashgirls.jpg'
import photo5 from '../../assets/Images/kalashkids.jpg'
import photo6 from '../../assets/Images/smallkid.jpg'
import mapScreenshot from '../../assets/Images/mapScreenshot.png'
import imagePlaceholder from '../../assets/Images/temp.jpg'

import sack from '../../assets/svg/sack.svg'
import coin from '../../assets/svg/coin.svg'
import mask from '../../assets/svg/mask.svg'
import shirt from '../../assets/svg/shirt.svg'
import { render } from '@testing-library/react';
const images = [photo1, photo2, photo3, photo4, photo5, photo6]

const HomeView = ({ dispatch, loading, fetched, hasErrors, numberOfRations, numberOfUsers, featuredEvents }) => {

  useEffect(() => {
    if (!fetched && !loading) {
      dispatch(getMainInfo())
    }
  })

  return (
    <Fragment>
    <Carousel controls="false" fade indicators="false" interval="2000">
      {images.map((image) => {
        return (
          <Carousel.Item className="carouselImage" key={image}>
            {/* <Carousel.Caption>
              <h3 className="slideCaption">Be the Change</h3>
            </Carousel.Caption> */}
            <img className="homeImage" src={image} alt=""/>
          </Carousel.Item>
        )
      })}
    </Carousel>
    <ProjectsInfo loading={loading} hasErrors={hasErrors} numberOfRations={numberOfRations} numberOfUsers={numberOfUsers} />
    <div className="separator text-muted featuredText"> FEATURED ORGANISATIONS TO ENGAGE WITH </div>
    <FeaturedOrganisation featuredEvents={featuredEvents} />
    <div className="separator text-muted featuredText"> MAP TO ENGAGE WITH </div>
    <MapIconKey />
    <HomeViewMap />
    </Fragment>
  )
}

const HomeViewMap = (props) => {
  return (
    <div className="mapScreenshot">
      <NavLink to="/map">
        <img className="mapScreenshotContainer" src={mapScreenshot} alt={imagePlaceholder} />
      </NavLink>
    </div>
  )
}

const MapIconKey = (props) => {
  return (
    <div className="iconKeyContainer">
      <div className="iconKey">
        <img className="iconKeyImage" src={sack} alt={imagePlaceholder}/>
        <p> Food </p>
      </div>
      <div className="iconKey">
        <img className="iconKeyImage" src={coin} alt={imagePlaceholder}/>
        <p> Money </p>
      </div>
      <div className="iconKey">
        <img className="iconKeyImage" src={mask} alt={imagePlaceholder}/>
        <p> PPE </p>
      </div>
      <div className="iconKey">
        <img className="iconKeyImage" src={shirt} alt={imagePlaceholder}/>
        <p> Clothes </p>
      </div>
    </div>
  )
}

// class HomeViewMap extends React.Component {
//   constructor(props) {
//     super(props)
//   }
//   render() {
//     return (
//       <p> MAP </p>
//     )
//   }
// }

const FeaturedOrganisation = (props) => {
  const { featuredEvents } = props
  return (
    <Fragment>
    <div className="featuredEvents">
      {featuredEvents.map((event) => {
        return (
          <div className="featuredEventCard" key={event._id}>
            <img src={event.images[0]} alt={imagePlaceholder} className="featuredEventImage" />
            <p className="featuredEventText"> {event.name} </p>
            <hr className="featuredEventDivider" />
            {/* <img className="featuredEventIcon" src={whichIcon(event.typeOfRation)} alt={imagePlaceholder} /> */}
          </div>
        )
      })}
    </div>
    </Fragment>
  )
}

const whichIcon = (icon) => {
  switch(icon) {
    case "food":
      return sack
    case "money":
      return coin
    case "clothes":
      return shirt
    case "ppe":
      return mask
    default:
      return sack
  }
}

const ProjectsInfo = (props) => {
  const { loading, hasErrors, numberOfRations, numberOfUsers } = props
  if (loading) {
    return (
      <Spinner animation="border" role="status" className="spinnerHomeView">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  } else {
    return (
      <div className="projectInfoContainer">
        <div className="projectInfoDetails">
          <h4> {numberOfUsers} </h4>
          <p className="text-muted"> users </p>
        </div>
        <div className="projectInfoDetails">
          <h4> {numberOfRations} </h4>
          <p className="text-muted"> events </p>
        </div>
      </div>
    )
  }
}

const MapStateToProps = (state) => ({
  loading: state.info.loading,
  fetched: state.info.fetched,
  hasErrors: state.info.hasErrors,
  numberOfUsers: state.info.numberOfUsers,
  numberOfRations: state.info.numberOfRations,
  featuredEvents: state.info.featuredEvents
})

export default connect(MapStateToProps)(HomeView);