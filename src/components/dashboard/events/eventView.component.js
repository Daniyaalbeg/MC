import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/pro-solid-svg-icons'

import EventsContainer from './eventsContainer.component';
import HeaderIcons from '../HeaderIcons.component';

const EventView = ({ orgs }) => {
  return (
    <div className="eventViewContainer">
      <div className="eventViewHeader">
        <div className="eventTextIcon">
          <FontAwesomeIcon icon={faBoxOpen} />
          <p> Distributions </p>
        </div>
        <HeaderIcons />
      </div>
      <div className="eventViewContent">
        <EventsContainer orgs={orgs} />
      </div>
    </div>
  )
}

// const Organisation

export default EventView