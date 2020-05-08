import React, { useState } from 'react';
import '../../css/eventView.css';
import { Accordion } from 'react-bootstrap';

import EventItemCard from './eventItemCard.component'

const EventView = (props) => {
  const [selectedEventId, setSelectedEventId] = useState("");
  const events = props.events;

  const RenderEvents = () => {
    if (Array.isArray(events) && props.events.length) {
      const listOfEvents = events.map((event) =>
        <EventItemCard handleClose={props.handleClose} event={event} key={event._id} open={event._id === selectedEventId}/>
      )
      const list = 
        <Accordion onSelect={setSelectedEventId} className="eventListCard">
            {listOfEvents}
        </Accordion>
      return list;
    } else {
      return (<h6 className="text-muted, errorText"> No events to display </h6>)
    }
  }

  return (
    RenderEvents()
  )
}


export default EventView