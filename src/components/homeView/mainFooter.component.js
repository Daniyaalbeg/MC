import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faTwitterSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons'
import { faEnvelopeSquare, faInfoSquare } from '@fortawesome/pro-solid-svg-icons'

const Footer = (props) => {
  return (
    <div className="homeViewFooter">
      <div className ="homeViewFooterItem" style={{textAlign: "center"}}>
        <p className="footHeader"> Connect </p>
        <a href="https://www.facebook.com/ministryochange" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookSquare} className="footerIcon" /></a>
        <a href="https://instagram.com/ministry.of.change" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagramSquare} className="footerIcon" /></a>
        <a href="https://twitter.com/ministrychange" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitterSquare} className="footerIcon" /></a>
        <a href="mailto:info@ministryofchange.org" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faEnvelopeSquare} className="footerIcon" /></a>
      </div>
      <div className ="homeViewFooterItem" style={{textAlign: "center"}}>
        <p className="footHeader"> About Us </p>
        <Link to="/about" className="navlink aboutUsCustom"><FontAwesomeIcon icon={faInfoSquare} className="footerIcon" /></Link>
      </div>
      <div className ="homeViewFooterItem">
        <p className="footHeader"> Contact</p>
        <hr className="footerDash"/>
        <p> Address: </p>
        <p> 1A Park Road, Chakshahzad </p>
        <p style={{marginBottom: '5px'}}> Islamabad, Pakistan </p>
        <p> info@ministryofchange.org </p>
      </div>
    </div>
  )
}

export default Footer