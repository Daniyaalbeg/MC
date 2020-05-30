import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/eventView.css';
import { Accordion } from 'react-bootstrap';

import EventItemCard from './eventItemCard.component'

const EventView = (props) => {
  const [selectedEventId, setSelectedEventId] = useState("");
  const supplier = props.supplier;
  if (!supplier) {
    return (
      <>
      <p> You have no org </p>
      </>
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
        <>
          <h6 className="text-muted, errorText"> No events to display </h6>
          <Link to="createEvent"><button className="standardButton"> Create Ration </button></Link>
        </>
      )
    }
  }

  return (
    RenderEvents()
  )
}


export default EventView