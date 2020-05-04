import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Carousel, Spinner } from 'react-bootstrap';
import '../../css/homeView.css';
import { getMainInfo } from '../../Actions/homeViewActions';
import { checkCookie } from '../../Actions/authActions';

import photo0 from '../../assets/Images/oldman.jpg'
import photo1 from '../../assets/Images/chitralman.jpg'
import photo2 from '../../assets/Images/doobi.jpg'
import photo3 from '../../assets/Images/kalashgirls.jpg'
import photo4 from '../../assets/Images/kalashkids.jpg'
import photo5 from '../../assets/Images/smallkid.jpg'
import mapScreenshot from '../../assets/Images/mapScreenshot.png'
import imagePlaceholder from '../../assets/Images/temp.jpg'

import sack from '../../assets/svg/sack.svg'
import coin from '../../assets/svg/coin.svg'
import mask from '../../assets/svg/mask.svg'
import shirt from '../../assets/svg/shirt.svg'
const images = [photo0, photo1, photo2, photo3, photo4, photo5]
const captions = ["TOGETHER WE CAN", "CHANGE OUR DESTINY", "OPENING OUR HEARTS", "HONOURING OUR PAST", "LIVING OUR TRUTH", "RESPECTING DIVERSITY"]
const styleCaptions = ["caption0", "caption1", "caption2", "caption3", "caption4", "caption5"]
const styleImages = ["homeImage0", "homeImage1", "homeImage2", "homeImage3", "homeImage4", "homeImage5"]

const HomeView = ({ dispatch, auth, loading, fetched, checkedCookie, hasErrors, numberOfRations, numberOfUsers, numberOfIndividuals, numberOfOrganisations, featuredOrgs }) => {
  useEffect(() => {
    if (!auth && !checkedCookie) {
      dispatch(checkCookie())
    }
    if (!fetched && !loading) {
      dispatch(getMainInfo())
    }
  })

  return (
    <Fragment>
    <Carousel controls={false} fade={true} indicators={false} interval={2000}>
      {images.map((image, index) => {
        return (
          <Carousel.Item className="carouselImage" key={image}>
            <Carousel.Caption bsPrefix="slideCaptionContainer">
              <p className={"slideCaption " + styleCaptions[index]}>{captions[index]}</p>
            </Carousel.Caption>
            <img className={"homeImage " + styleImages[index]} src={image} alt=""/>
          </Carousel.Item>
        )
      })}
    </Carousel>
    <ProjectsInfo loading={loading} hasErrors={hasErrors} numberOfRations={numberOfRations} numberOfUsers={numberOfUsers} numberOfIndividuals={numberOfIndividuals} numberOfOrganisations={numberOfOrganisations}/>
    <div className="separator text-muted featuredText"> FEATURED ORGANISATIONS TO ENGAGE WITH </div>
    <FeaturedOrganisation featuredOrgs={featuredOrgs} />
    <div className="separator text-muted featuredText"> MAP TO ENGAGE WITH </div>
    <MapIconKey />
    <HomeViewMap />
    </Fragment>
  )
}

const HomeViewMap = (props) => {
  return (
    <div className="mapScreenshotContainer grow">
      <Link to="/map">
        <img className="mapScreenshot" src={mapScreenshot} alt={imagePlaceholder} />
      </Link>
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
  const { featuredOrgs } = props
  return (
    <Fragment>
    <div className="featuredOrgs">
      {featuredOrgs.map((org) => {
        return (
          <div className="featuredOrgCard grow" key={org._id}>
          <Link className="featuredLink" to={'/organisations/'+org._id}>
            <img src={org.supplierImageURL !== undefined ? org.supplierImageURL : imagePlaceholder} alt="image loading error" className="featuredOrgImage" />
            <p className="featuredOrgText"> {org.supplierName} </p>
            <hr className="featuredOrgDivider" />
            {/* <img className="featuredEventIcon" src={whichIcon(event.typeOfRation)} alt={imagePlaceholder} /> */}
          </Link>
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
  const { loading, hasErrors, numberOfRations, numberOfUsers, numberOfIndividuals, numberOfOrganisations } = props
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
          <h4> {numberOfIndividuals} </h4>
          <p className="text-muted"> individuals </p>
        </div>
        <div className="projectInfoDetails">
          <h4> {numberOfOrganisations} </h4>
          <p className="text-muted"> organisations </p>
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
  checkedCookie: state.auth.checkedCookie,
  auth: state.auth.auth,
  hasErrors: state.info.hasErrors,
  numberOfUsers: state.info.numberOfUsers,
  numberOfRations: state.info.numberOfRations,
  numberOfIndividuals: state.info.numberOfIndividuals,
  numberOfOrganisations: state.info.numberOfOrganisations,
  featuredOrgs: state.info.featuredOrgs
})

export default connect(MapStateToProps)(HomeView);