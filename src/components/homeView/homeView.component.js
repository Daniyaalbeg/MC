import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Carousel, Spinner } from 'react-bootstrap';
import '../../css/homeView.css';
import { getStatInfo, getFeaturedInfo } from '../../Actions/homeViewActions';
import { getUserInfo } from '../../Actions/userInfoActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitterSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons'
import { faEnvelopeSquare } from '@fortawesome/pro-solid-svg-icons'

import photo0 from '../../assets/Images/oldman.jpg'
import photo3 from '../../assets/Images/chitralman.jpg'
import photo2 from '../../assets/Images/doobi.jpg'
import photo9 from '../../assets/Images/kalashgirls.jpg'
import photo6 from '../../assets/Images/kalashkids.jpg'
import photo5 from '../../assets/Images/smallkid.jpg'
import photo7 from '../../assets/Images/attentiveDude.jpg'
import photo1 from '../../assets/Images/girlCamera.jpg'
import photo4 from '../../assets/Images/presentation.jpg'
import photo8 from '../../assets/Images/sindhLady.jpg';
import mapScreenshot from '../../assets/Images/mapScreenshot.png'
import imagePlaceholder from '../../assets/Images/temp.jpg'

import sack from '../../assets/svg/sack.svg'
import coin from '../../assets/svg/coin.svg'
import mask from '../../assets/svg/mask.svg'
import shirt from '../../assets/svg/shirt.svg'
//together we can, change our destiny, by changing ourselves doobi, being in service chitral dude, doing good presentation, living our truth mother son, working together group boys, focusing solutions ather, respecting diversity sindhi, honoring past kalash, together we can defocus being humble
const images = [photo0, photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9]
const captions = ["TOGETHER WE CAN", "CHANGE OUR DESTINY", "BY CHANGING OURSELVES", "BEING IN SERVICE", "DOING GOOD", "LIVING OUR TRUTH", "WORKING TOGETHER", "FOCUSING ON SOLUTIONS", "RESPECTING DIVERSITY", "HONOURING OUR PAST"]
const styleCaptions = ["caption0", "caption1", "caption2", "caption3", "caption4", "caption5", "caption6", "caption7", "caption8", "caption9"]
const styleImages = ["homeImage0", "homeImage1", "homeImage2", "homeImage3", "homeImage4", "homeImage5", "homeImage6", "homeImage7", "homeImage8", "homeImage9"]

const HomeView = ({ dispatch, userInfoFetched, userInfoHasError, userInfoLoading, statLoading, statFetched, statHasErrors, featuredLoading, featuredFetched, featuredHasErrors, numberOfEvents, numberOfUsers, numberOfIndividuals, numberOfOrganisations, featuredOrgs }) => {
  useEffect(() => {
    if (!statFetched && !statLoading) {
      dispatch(getStatInfo())
    }
    if (!featuredFetched && !featuredLoading) {
      dispatch(getFeaturedInfo())
    }
    if (!userInfoFetched && !userInfoHasError && !userInfoLoading) {
      dispatch(getUserInfo())
    }
  })

  return (
    <>
    <Carousel controls={true} fade={true} indicators={false} interval={2000}>
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
    <ProjectsInfo loading={statLoading} hasErrors={statHasErrors} numberOfEvents={numberOfEvents} numberOfUsers={numberOfUsers} numberOfIndividuals={numberOfIndividuals} numberOfOrganisations={numberOfOrganisations}/>
    <div className="separator text-muted featuredText fontProxima"> FEATURED ORGANISATIONS TO ENGAGE WITH </div>
    <FeaturedOrganisation loading={featuredLoading} hasErrors={featuredHasErrors} featuredOrgs={featuredOrgs} />
    <div className="separator text-muted featuredText fontProxima"> MAP TO INFORM </div>
    <MapIconKey />
    <HomeViewMap />
    <Footer />
    </>
  )
}

const Footer = (props) => {
  return (
    <div className="homeViewFooter">
      <div className ="homeViewFooterItem">
        <h4> Connect </h4>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookSquare} className="footerIcon" /></a>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagramSquare} className="footerIcon" /></a>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitterSquare} className="footerIcon" /></a>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faEnvelopeSquare} className="footerIcon" /></a>
      </div>
      <div className ="homeViewFooterItem">
        <Link to="/about" className="navlink aboutUsCustom"><h4> About Us </h4></Link>
      </div>
      <div className ="homeViewFooterItem">
        <h4> Contact</h4>
        <hr className="footerDash"/>
        <p> Address: </p>
        <p> 1A Park Road, Chakshahzad </p>
        <p style={{marginBottom: '5px'}}> Islamabad, Pakistan </p>
        <p style={{marginBottom: '5px'}}> 03028911883 </p>
        <p> info@ministryofchange.org </p>
      </div>
    </div>
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
  const { featuredOrgs, loading, hasErrors } = props
  if (hasErrors) {
    return <p> error </p>
  }
  if (loading) {
    return (
      <div className="spinnerHomeView">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    )
  } else {
    return (
      <>
      <div className="featuredOrgs">
        {featuredOrgs.map((org) => {
          return (
            <div className="featuredOrgCard grow" key={org._id}>
            <Link className="featuredLink" to={'/organisations/'+org._id}>
              <img src={org.supplierImageURL !== undefined ? org.supplierImageURL : imagePlaceholder} alt="error" className="featuredOrgImage" />
              <p className="featuredOrgText"> {org.supplierName} </p>
              <hr className="featuredOrgDivider" />
              {/* <img className="featuredEventIcon" src={whichIcon(event.typeOfRation)} alt={imagePlaceholder} /> */}
            </Link>
            </div>
          )
        })}
      </div>
      </>
    )
  }
}

const ProjectsInfo = (props) => {
  const { loading, hasErrors, numberOfEvents, numberOfUsers, numberOfIndividuals, numberOfOrganisations } = props
  if (loading) {
    return (
      <div className="spinnerHomeView">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    )
  } else {
    return (
      <div className="projectInfoContainer">
        <div className="projectInfoDetails">
          <h4 className="projectInfoHeading"> {numberOfUsers} </h4>
          <p className="text-muted"> users </p>
        </div>
        <div className="projectInfoDetails">
          <h4 className="projectInfoHeading"> {numberOfIndividuals} </h4>
          <p className="text-muted"> individuals </p>
        </div>
        <div className="projectInfoDetails">
          <h4 className="projectInfoHeading"> {numberOfOrganisations} </h4>
          <p className="text-muted"> organisations </p>
        </div>
        <div className="projectInfoDetails">
          <h4 className="projectInfoHeading"> {numberOfEvents} </h4>
          <p className="text-muted"> events </p>
        </div>
      </div>
    )
  }
}

const MapStateToProps = (state) => ({
  statLoading: state.info.statLoading,
  statFetched: state.info.statFetched,
  statHasErrors: state.info.statHasErrors,
  featuredLoading: state.info.featuredLoading,
  featuredFetched: state.info.featuredFetched,
  userInfoFetched: state.userInfo.fetched,
  userInfoHasError: state.userInfo.hasErrors,
  userInfoLoading: state.userInfo.loading,
  featuredHasErrors: state.info.featuredHasErrors,
  numberOfUsers: state.info.numberOfUsers,
  numberOfEvents: state.info.numberOfEvents,
  numberOfIndividuals: state.info.numberOfIndividuals,
  numberOfOrganisations: state.info.numberOfOrganisations,
  featuredOrgs: state.info.featuredOrgs
})

export default connect(MapStateToProps)(HomeView);