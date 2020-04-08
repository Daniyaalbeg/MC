import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';

const RationItemCard = (props) => {
  const ration = props.ration
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 
  return (
    <ListGroup.Item>
      <Row>
        <Col className="rationCardInfo">
          <h5 className="rationNameText"> {ration.name} </h5>
          <h6 className="text-muted">
            {new Date(ration.date).toLocaleDateString("en-US", dateOptions)}
            <Badge variant={ration.approved ? "success" : "danger"}> {ration.approved ? "Approved" : "Pending Approval"} </Badge>
          </h6>
        </Col>
        <Col className="rationCardButton">
          <Button variant="outline-primary" onClick={props.onClick}>View</Button>
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

export default RationItemCard;