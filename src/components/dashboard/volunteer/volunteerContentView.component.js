import React from 'react'
import { Link } from 'react-router-dom'

import VolunteerSelectionView from './volunteerSelectionView.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/pro-duotone-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const VolunteerContentView = ({ volunteer }) => {
  if (volunteer) {
    return <VolunteerSelectionView volunteer={volunteer} />
  } else {
    return (
      <div className="emptyDBContainer">
        <p> <FontAwesomeIcon icon={faExclamationTriangle} className="cnicExclamationIcon" /> You have not created a volunteer profile yet. </p>
        <Link to="createVolunteer"><button className="standardButtonWithoutColour mcRedBG"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}} /> Create Volunteer Profile </button></Link>
      </div>
    )
  }
}

export default VolunteerContentView
