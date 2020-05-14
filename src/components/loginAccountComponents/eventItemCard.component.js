import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import EventItemInfo from './eventItemInfo.component';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EventItemCard = (props) => {
  const event = props.event;
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
  return (
    <Card className="eventListCard">
      <Accordion.Toggle as={Card.Header} className="eventCardInfo justify-content-between" eventKey={event._id}>
        <div>
          <Card.Title> {event.name} </Card.Title>
          <Card.Subtitle className="text-muted">
            {new Date(event.date).toLocaleDateString("en-US", dateOptions)} {props.isUser ? <Badge variant={event.approved ? "success" : "danger"}> {event.approved ? "Approved" : "Pending Approval"} </Badge> : null}
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