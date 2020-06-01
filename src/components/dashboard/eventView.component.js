import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/eventView.css';
import { Accordion } from 'react-bootstrap';

import EventItemCard from './eventItemCard.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faExclamationTriangle } from '@fortawesome/pro-duotone-svg-icons'

const EventView = (props) => {
  const [selectedEventId, setSelectedEventId] = useState("");
  const supplier = props.supplier;
  if (!supplier) {
    return (
        <div className="emptyDBContainer">
          <p> <FontAwesomeIcon icon={faExclamationTriangle} className="cnicExclamationIcon" /> You need to create an organisation before adding rations </p>
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
      <>
        <Link to="createEvent"><button className="standardButton"> Create Ration </button></Link> 
        <Accordion onSelect={setSelectedEventId} className="eventListCard">
            {listOfEvents}
        </Accordion>
      </>
      return list;
    } else {
      return (
        <div className="emptyDBContainer">
          <h6 className="text-muted, errorText"> No events to display </h6>
          <Link to="createEvent"><button className="standardButton"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}} />  Create Ration </button></Link>
        </div>
      )
    }
  }

  return (
    RenderEvents()
  )
}


export default EventView