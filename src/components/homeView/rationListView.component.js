import React, { Fragment } from 'react';
import { ListGroup, Card } from 'react-bootstrap';
import { selectingRationEvent } from '../../Actions/selectRationEventActions';
import { connect } from 'react-redux';

const RationListItem = (props) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 
  return (
    <Fragment>
      <h5> {props.rationEvent.name} </h5>
      <h6 className="text-muted"> {new Date(props.rationEvent.date).toLocaleDateString("en-US", dateOptions)} </h6>
    </Fragment>
  )
}

const RationListView = ({dispatch, rationEvents}) => {
  return (
    <ListGroup variant="flush">
      {rationEvents.map((rationEvent) => {
        return (
          <ListGroup.Item key={rationEvent._id} action onClick={() => {
            dispatch(selectingRationEvent(rationEvent))
          }}>
            <RationListItem rationEvent={rationEvent} />
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}

const MapStateToProps = (state) => ({
  rationEvents: state.rationInfo.rationEvents
});

export default connect(MapStateToProps)(RationListView);