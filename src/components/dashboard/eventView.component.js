import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/pro-solid-svg-icons'

import EventContainer from './eventsContainer.component';

const EventView = (props) => {
  return (
    <div className="eventViewContainer">
      <div className="eventViewHeader">
        <FontAwesomeIcon icon={faBoxOpen} />
        <p> Distributions </p>
      </div>
      <div className="eventViewContent">
        <EventContainer supplier={props.supplier} />
      </div>
    </div>
  )
}

export default EventView