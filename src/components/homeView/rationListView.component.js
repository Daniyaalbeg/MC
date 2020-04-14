import React, { Fragment } from 'react';
import { ListGroup, Card } from 'react-bootstrap';
import { selectingRationEvent } from '../../Actions/selectRationEventActions';
import { connect } from 'react-redux';
import '../../css/rationlistView.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/pro-light-svg-icons'


import RationInfoView from './rationInfoView.component';


const RationListItem = (props) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 
  return (
    <Fragment>
      <h5> {props.rationEvent.name} </h5>
      <h6 className="text-muted"> {new Date(props.rationEvent.date).toLocaleDateString("en-US", dateOptions)} </h6>
    </Fragment>
  )
}

// function onChange(value) {
//   alert(value.value);
// }

const RationListView = ({dispatch, rationEvents, selectedRation}) => {
  if (selectedRation == null) {
    return (
      <Fragment>
      <form className="searchBarContainer">
        <FontAwesomeIcon icon={faSearch} className="searchIcon"/>
        <input type='text' className="searchBar"/>
        <FontAwesomeIcon icon={faFilter} className="filterIcon"/>
        <div className="filterSelect">
          <select>
            <option value="all"> all </option>
          </select>
        </div>
      </form>
      <hr className="searchBarSpace"/>
      <ListGroup variant="flush" className="listGroup">
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
      </Fragment>
    )
  } else {
    return (
      <RationInfoView rationEvent={selectedRation} onClick={() => dispatch(selectingRationEvent(null))} />
    )
  }
}

const MapStateToProps = (state) => ({
  rationEvents: state.rationInfo.rationEvents,
  selectedRation: state.rationInfo.selectedRation
});

export default connect(MapStateToProps)(RationListView);