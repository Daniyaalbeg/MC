import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import RationItemInfo from './rationItemInfo.component';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RationItemCard = (props) => {
  const ration = props.ration;
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
  return (
    <Card className="rationListCard">
      <Accordion.Toggle as={Card.Header} className="rationCardInfo justify-content-between" eventKey={ration._id}>
        <div>
          <Card.Title> {ration.name} </Card.Title>
          <Card.Subtitle className="text-muted">
            {new Date(ration.date).toLocaleDateString("en-US", dateOptions)} <Badge variant={ration.approved ? "success" : "danger"}> {ration.approved ? "Approved" : "Pending Approval"} </Badge>
          </Card.Subtitle>
        </div>
        <FontAwesomeIcon icon={props.open ? faAngleUp : faAngleDown}/>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={ration._id}>
        <Card.Body>
          <RationItemInfo ration={ration} handleClose={props.handleClose} />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

export default RationItemCard;