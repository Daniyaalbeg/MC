import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/eventView.css';
import { Accordion } from 'react-bootstrap';

import EventItemCard from './eventItemCard.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faExclamationTriangle } from '@fortawesome/pro-duotone-svg-icons'

const EventContainer = (props) => {
  const [selectedEventId, setSelectedEventId] = useState("");
  const supplier = props.supplier;
  if (!supplier) {
    return (
        <div className="emptyDBContainer">
          <p style={{margin: "0"}}> <FontAwesomeIcon icon={faExclamationTriangle} className="cnicExclamationIcon" /> You need to create an organisation before adding distributions </p>
        </div>
    )
  }
  
  const events = supplier.events;

  const RenderEvents = () => {
    if (Array.isArray(events) && events.length) {
      const listOfEvents = events.map((event) =>
        <EventItemCard isUser={true} event={event} key={event._id} open={event._id === selectedEventId}/>
      )
      const list =
      <div style={{textAlign: "right"}}>
        <Link to="createEvent" className="createRationButton"><button className="createEventButton standardButton"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}}/>  Create Distribution </button></Link> 
        <Accordion style={{textAlign: "left"}} onSelect={setSelectedEventId} className="eventListCard">
            {listOfEvents}
        </Accordion>
      </div>
      return list;
    } else {
      return (
        <div className="emptyDBContainer">
          <p> <FontAwesomeIcon icon={faExclamationTriangle} className="cnicExclamationIcon" /> No distributions to display </p>
          <Link to="createEvent"><button className="createEventButton standardButton"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}}/>  Create Distribution </button></Link>
        </div>
      )
    }
  }

  return (
    RenderEvents()
  )
}


export default EventContainer