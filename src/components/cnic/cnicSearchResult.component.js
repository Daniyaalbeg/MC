import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';

import EventItemCard from '../dashboard/events/eventItemCard.component';

const CnicSearchResult = ({ getHasError, getHasErrorMessage, cnicInfo, props }) => {
  const [selectedEventId, setSelectedEventId] = useState("");


  if (getHasError || !cnicInfo) {
    return <ErrorMessage getHasErrorMessage={getHasErrorMessage} />
  } else if (cnicInfo !== null && Array.isArray(cnicInfo.connectedEvents) && cnicInfo.connectedEvents.length) {
    const listOfCnic = cnicInfo.connectedEvents.map((event) =>
        <EventItemCard isUser={false} event={event} key={event._id} open={event._id === selectedEventId}/>
      )
      const list = 
        <Accordion onSelect={setSelectedEventId} className="eventListCard">
            {listOfCnic}
        </Accordion>
      return list;
  } else {
    return null
  }
}

const ErrorMessage = (props) => {
  return (
    <h4 className='largerErrorMessage'> {props.getHasErrorMessage} </h4>
  )
}

export default CnicSearchResult