import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Carousel, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import '../../css/homeView.css';
import { getStatInfo, getFeaturedInfo } from '../../Actions/homeViewActions';
import { getUserInfo } from '../../Actions/userInfoActions';
import { WhatCategoriesHomeView } from '../iconController/iconCategories.component';

import Footer from './mainFooter.component';

import badlde from '../../assets/logo/badlde.png';
import serendip from '../../assets/logo/serendip.jpg';
import cfp from '../../assets/logo/codeforpakistan.svg';

// import photo0 from '../../assets/Images/oldman.jpg';
// import photo3 from '../../assets/Images/chitralman.jpg';
// import photo2 from '../../assets/Images/doobi.jpg';
// import photo9 from '../../assets/Images/kalashgirls.jpg';
// import photo6 from '../../assets/Images/kalashkids.jpg';
// import photo5 from '../../assets/Images/smallkid.jpg';
// import photo7 from '../../assets/Images/attentiveDude.jpg';
// import photo1 from '../../assets/Images/girlCamera.jpg';
// import photo4 from '../../assets/Images/presentation.jpg';
// import photo8 from '../../assets/Images/sindhLady.jpg';
import mapScreenshot from '../../assets/Images/mapScreenshot.png';
import imagePlaceholder from '../../assets/Images/temp.jpg';

import photoNew1 from '../../assets/Images/new/1.jpg';
import photoNew2 from '../../assets/Images/new/2.jpg';
import photoNew3 from '../../assets/Images/new/3.jpg';
import photoNew4 from '../../assets/Images/new/4.jpg';
import photoNew5 from '../../assets/Images/new/5.jpg';
import photoNew6 from '../../assets/Images/new/6.jpg';

//together we can, change our destiny, by changing ourselves doobi, being in service chitral dude, doing good presentation, living our truth mother son, working together group boys, focusing solutions ather, respecting diversity sindhi, honoring past kalash, together we can defocus being humble
// const images = [photo0, photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9]
// const captions = ["TOGETHER WE CAN", "CHANGE OUR DESTINY", "BY CHANGING OURSELVES", "BEING IN SERVICE", "DOING GOOD", "LIVING OUR TRUTH", "WORKING TOGETHER", "FOCUSING ON SOLUTIONS", "RESPECTING DIVERSITY", "HONOURING OUR PAST"]
// const styleCaptions = ["caption0", "caption1", "caption2", "caption3", "caption4", "caption5", "caption6", "caption7", "caption8", "caption9"]
// const styleImages = ["homeImage0", "homeImage1", "homeImage2", "homeImage3", "homeImage4", "homeImage5", "homeImage6", "homeImage7", "homeImage8", "homeImage9"]

const images = [photoNew1, photoNew2, photoNew3, photoNew4, photoNew5, photoNew6]
const captions = ["HELP THEM HELP THEMSELVES", "NETWORK WITH CHANGEMAKERS", "VOLUNTEER IN PROJECTS", "DONATE TO CAUSES", "FIND SOLUTIONS", "HAVE YOUR VOICE HEARD"]
const styleCaptions = ["captionNew1", "captionNew2", "captionNew3", "captionNew4", "captionNew5", "captionNew6"]
const styleImages = ["homeImageNew1", "homeImageNew2", "homeImageNew3", "homeImageNew4", "homeImageNew5", "homeImageNew6"]


const HomeView = ({ dispatch, userInfoFetched, userInfoHasError, userInfoLoading, statLoading, statFetched, statHasErrors, featuredLoading, featuredFetched, featuredHasErrors, numberOfEvents, numberOfUsers, numberOfGroups, numberOfOrganisations, featuredOrgs }) => {
  useEffect(() => {
    if (!statFetched && !statLoading) {
      dispatch(getStatInfo())
    }
    if (!featuredFetched && !featuredLoading) {
      dispatch(getFeaturedInfo())
    }
    if (!userInfoFetched && !userInfoLoading) {
      dispatch(getUserInfo())
    }
  }, [])

  return (
    <>
    <Helmet>
      <html lang="en" />
      <meta name="description" content="A web portal for change makers." />
    </Helmet>
    <div className="homeViewContainer">
      <Carousel controls={true} fade={true} indicators={false} interval={10000}>
        {images.map((image, index) => {
          return (
            <Carousel.Item className="carouselImage" key={image}>
              <Carousel.Caption bsPrefix="slideCaptionContainer">
                <p className={"slideCaption " + styleCaptions[index]}>{captions[index]}</p>
              </Carousel.Caption>
              <img className={"homeImage " + styleImages[index]} src={image} alt="Different people of Pakistan"/>
            </Carousel.Item>
          )
        })}
      </Carousel>
      <ProjectsInfo loading={statLoading} hasErrors={statHasErrors} numberOfEvents={numberOfEvents} numberOfUsers={numberOfUsers} numberOfGroups={numberOfGroups} numberOfOrganisations={numberOfOrganisations}/>
      <div className='w-full my-16'>
        <h1 className='w-full text-center'> Let us build Pakistan together </h1>
        <div className='w-full justify-center items-center flex'>
          <a href="/map" className='font-bold px-3 py-2 bg-blue-200 rounded-xl' > See who is doing what </a>
        </div>
      </div>
      <div className="separator text-muted featuredText"> WHO WE ARE </div>
      <IntroText />
      <div className="separator text-muted featuredText"> FEATURED ORGANISATIONS TO ENGAGE WITH </div>
      <FeaturedOrganisation loading={featuredLoading} hasErrors={featuredHasErrors} featuredOrgs={featuredOrgs} />
      <div className="separator text-muted featuredText"> CATEGORIES TO EXPLORE </div>
      <CategoriesIcons />
      <div className="separator text-muted featuredText"> OUR PARTNERS </div>
      <Partners />
      <Footer />
    </div>
    </>
  )
}

const CategoriesIcons = () => {
  return (
    <div className="iconListHomeViewContainer">
      {WhatCategoriesHomeView()}
    </div>
  )
}

const IntroText = () => {
  return (
    <section className="introText">
      <p>
      The future of ‘Collective Action’ is here. Ministry of Change (MC) is a community of activists. Map your impact, volunteer, and crowdsource money, supplies and help. You could be an individual citizen, a government, a corporation, or a philanthropist. Browse through projects that inspire and excite you. In these challenging COVID 19 times, we are mapping donors who are donating food rations, PPE (Personal Protective Equipment), cash, and clothes to people who need them. Many are already engaged in Whatsapp groups. Post your own and join others.
        <br />
        <br />
        <span style={{fontWeight: "bold"}}>We are ready to change the world. Are you?</span>
      </p>
    </section>
  )
}

const Partners = () => {
  return (
    <div className="aboutLogo" style={{marginTop: '32px'}}>
        <div className="logoRow" style={{justifyContent: 'center'}}>
          {/* <a href="http://akho.org.pk" target="_blank" rel="noopener noreferrer"><img className="logoImage grow" src={akho} alt="error" /></a> */}
          <a href="https://badlde.org" target="_blank" rel="noopener noreferrer"><img className="logoImage grow" src={badlde} alt="error" /></a>
          <a href="http://serendip.tv" target="_blank" rel="noopener noreferrer"><img className="logoImage grow mr-4" src={serendip} alt="error" /></a>
          <a href="http://serendip.tv" target="_blank" rel="noopener noreferrer"><img className="logoImage grow" src={cfp} alt="error" /></a>
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

const FeaturedOrganisation = (props) => {
  const { featuredOrgs, loading, hasErrors } = props
  if (hasErrors) {
    return <p className="loadError" > Could not load featured organisations </p>
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
              <img src={org.imageURL ? org.imageURL : imagePlaceholder} alt="error" className="featuredOrgImage" />
              <div className="featuredOrgText">
                <span> {org.name} </span>
              </div>
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
  const { loading, hasErrors, numberOfEvents, numberOfUsers, numberOfGroups, numberOfOrganisations } = props
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
          <h4 className="projectInfoHeading"> {numberOfGroups} </h4>
          <p className="text-muted"> groups </p>
        </div>
        <div className="projectInfoDetails">
          <h4 className="projectInfoHeading"> {numberOfOrganisations} </h4>
          <p className="text-muted"> organisations </p>
        </div>
        <div className="projectInfoDetails">
          <h4 className="projectInfoHeading"> {numberOfEvents} </h4>
          <p className="text-muted"> distributions </p>
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
  numberOfGroups: state.info.numberOfGroups,
  numberOfOrganisations: state.info.numberOfOrganisations,
  featuredOrgs: state.info.featuredOrgs
})

export default connect(MapStateToProps)(HomeView);