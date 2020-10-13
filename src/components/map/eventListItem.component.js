import React from 'react';

import { getIcon } from '../iconController/iconCategories.component';

const EventListItem = ({ event }) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 
  return (
      <div className="list-view-container">
        <div className="list-left">
          {getIcon(event.typeOfRation, "list-left-image")}
        </div>
        <div className="list-right">
          <p className="eventListTitle"> {event.name} </p>
          <p className="eventListDate"> {new Date(event.date).toLocaleDateString("en-US", dateOptions)} </p>
        </div>
      </div>
  )
}

export default EventListItem