import React, { Fragment } from 'react';
import { ListGroup, Card } from 'react-bootstrap';
import { selectingRationEvent } from '../../Actions/selectRationEventActions';
import { connect } from 'react-redux';
import '../../css/rationlistView.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/pro-light-svg-icons'
import filterAndSearch from './filterAndSearch';

import { searchRationEvents, filterRationEvents } from '../../Actions/filterSearchRatioEventAction';

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

const RationListView = ({dispatch, rationEvents, selectedRation, searchValue}) => {
  
  const onSearchChange = (event) => {
    dispatch(searchRationEvents(event.target.value))
  }

  const onFilterChange = (event) => {
    dispatch(filterRationEvents(event.target.value))
  }


  if (selectedRation == null) {
    return (
      <Fragment>
      <form className="searchBarContainer">
        <FontAwesomeIcon icon={faSearch} className="searchIcon"/>
        <input type='text' className="searchBar" onChange={onSearchChange}/>
        <FontAwesomeIcon icon={faFilter} className="filterIcon"/>
        <div className="filterSelect">
          <select onChange={onFilterChange}>
            <option value="all"> all </option>
            <option value ="Armed Forces">Armed Forces</option>
            <option value="Community">Community</option>
            <option value="Corporate">Corporate</option>
            <option value="Civil Society">Civil Society</option>
            <option value="Government">Government</option>
            <option value="Individual">Individual</option>
            <option value="NGO">NGO</option>
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
    rationEvents: filterAndSearch(state.rationInfo.rationEvents, state.rationInfo.filter, state.rationInfo.search),
    selectedRation: state.rationInfo.selectedRation,
    searchValue: state.rationInfo.search
});

export default connect(MapStateToProps)(RationListView);