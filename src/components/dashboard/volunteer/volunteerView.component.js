import React from 'react'

import HeaderIcons from '../HeaderIcons.component';
import VolunteerContentView from './volunteerContentView.component.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHelping } from '@fortawesome/pro-solid-svg-icons'

const VolunteerView = ({ volunteer }) => {
  return (
    <div className="volunteerViewContainer">
      <div className="volunteerViewHeader">
        <div className="volunteerViewTextIcon">
          <FontAwesomeIcon icon={faHandsHelping} />
          <p> Volunteer </p>
        </div>
        <HeaderIcons />
      </div>
      <div className="volunteerViewContent">
        <VolunteerContentView volunteer={volunteer} />
      </div>
    </div>
  )
}

export default VolunteerView
