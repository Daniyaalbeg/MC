import React from 'react';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/pro-solid-svg-icons';


export const WhichLogo = ({ icon }) => {
  if (icon === "" || icon === undefined) {
    return null
  }
  if (icon.toLowerCase().includes("facebook")) {
    return <a href={icon} target="_blank" rel="noopener noreferrer" className="iconSpecific websiteIcon"> <FontAwesomeIcon icon={faFacebook} /> </a>
  } else if (icon.includes('twitter')) {
    return <a href={icon} target="_blank" rel="noopener noreferrer" className="iconSpecific websiteIcon"> <FontAwesomeIcon icon={faTwitter} href={icon} /> </a>
  } else if (icon.includes('instagram')) {
    return <a href={icon} target="_blank" rel="noopener noreferrer" className="iconSpecific websiteIcon">< FontAwesomeIcon icon={faInstagram} href={icon} /> </a>
  } else {
    return <a href={icon} target="_blank" rel="noopener noreferrer" className="iconSpecific websiteIcon">< FontAwesomeIcon icon={faGlobe} href={icon} /> </a>
  }
}

export default WhichLogo