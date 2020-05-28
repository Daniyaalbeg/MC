import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import EventItemInfo from './eventItemInfo.component';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EventItemCard = (props) => {
  const event = props.event;
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
  return (
    <Card style={{marginTop: "0px", marginBottom: "0px"}}>
      <Accordion.Toggle as={Card.Header} className="eventCardInfo justify-content-between" eventKey={event._id}>
        <div>
          <Card.Title> {event.name} </Card.Title>
          <Card.Subtitle className="text-muted">
            {new Date(event.date).toLocaleDateString("en-US", dateOptions)} {props.isUser ? <p className= {"pillBadge" + (event.approved ? " pillGreenVersion" : " pillRedVersion")}> {event.approved ? "Approved" : "Pending Approval"} </p> : null}
          </Card.Subtitle>
        </div>
        <FontAwesomeIcon icon={props.open ? faAngleUp : faAngleDown}/>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={event._id}>
        <Card.Body>
          <EventItemInfo isUser={props.isUser} event={event} handleClose={props.handleClose} />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

export default EventItemCard;