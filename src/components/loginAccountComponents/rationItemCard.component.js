import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import RationItemInfo from './rationItemInfo.component';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RationItemCard = (props) => {
  const ration = props.ration;
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
  return (
    <Card className="rationListCard">
      <Card.Header className="rationCardInfo justify-content-between">
        <div>
          <Card.Title> {ration.name} </Card.Title>
          <Card.Subtitle className="text-muted">
            {new Date(ration.date).toLocaleDateString("en-US", dateOptions)} <Badge variant={ration.approved ? "success" : "danger"}> {ration.approved ? "Approved" : "Pending Approval"} </Badge>
          </Card.Subtitle>
        </div>
        <Accordion.Toggle as={Button} variant="light" eventKey={ration._id} className="rationCardButton" id={ration._id}>
          <FontAwesomeIcon icon={props.open ? faAngleUp : faAngleDown}/>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={ration._id}>
        <Card.Body>
          <RationItemInfo ration={ration}/>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

export default RationItemCard;