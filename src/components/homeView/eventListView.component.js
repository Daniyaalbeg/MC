import React, { Fragment } from 'react';
import { ListGroup } from 'react-bootstrap';
import { selectingEvent } from '../../Actions/selectEventActions';
import { connect } from 'react-redux';
import '../../css/eventlistView.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/pro-light-svg-icons'
import filterAndSearch from './filterAndSearch';
import { searchEvents, filterEvents, filterEventsType } from '../../Actions/filterSearchEventAction';
import EventInfoView from './eventInfoView.component';
import sack from '../../assets/svg/sack.svg'
import mask from '../../assets/svg/mask.svg'
import coin from '../../assets/svg/coin.svg'
import shirt from '../../assets/svg/shirt.svg'


const EventListItem = (props) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 
  return (
      <div className="list-view-container">
      <div className="list-left">
        <EventListImage type={props.event.typeOfRation} />
      </div>
      <div className="list-right">
        <h5> {props.event.name} </h5>
        <h6 className="text-muted"> {new Date(props.event.date).toLocaleDateString("en-US", dateOptions)} </h6>
      </div>
      </div>
  )
}

const EventListImage = (props) => {
  switch (props.type) {
    case "clothes":
      return <img src={shirt} alt="error" className="list-left-image"/>
    case "food":
      return <img src={sack} alt="error" className="list-left-image"/>
    case "money":
      return <img src={coin} alt="error" className="list-left-image"/>
    case "ppe":
      return <img src={mask} alt="error" className="list-left-image"/>
    case "ramadan":
      return <img src={sack} alt="error" className="list-left-image"/>
    default:
      return <img src={sack} alt="error" className="list-left-image"/>
  }
}

const EventListView = ({dispatch, events, selectedEvent, searchValue}) => {
  
  const onSearchChange = (event) => {
    dispatch(searchEvents(event.target.value))
  }
  
  const onFilterChangeType = (event) => {
    dispatch(filterEventsType(event.target.value))
  }

  const onFilterChange = (event) => {
    dispatch(filterEvents(event.target.value))
  }

  const resetSearchAndFilter = () => {
    dispatch(searchEvents(""))
    dispatch(filterEvents("all"))
  }


  if (selectedEvent == null) {
    return (
      <Fragment>
      <form className="searchBarContainer" onSubmit={(e) => { e.preventDefault() }}>
        <div className="searchBar">
          <FontAwesomeIcon icon={faSearch} className="searchIcon" size="1x"/>
          <input type='text' onChange={onSearchChange} className="textInput"/>
        </div>
        <hr className="searchBarMiddleGap"/>
        <div className="filters">
          <div className="filterSelect">
            <FontAwesomeIcon icon={faFilter} className="filterIcon" size="1x"/>
            <select onChange={onFilterChangeType}>
              <option value="all"> all </option>
              <option value ="food">Food</option>
              <option value="ppe">PPE</option>
              <option value="money">Money</option>
              <option value="clothes">Clothes</option>
            </select>
          </div>
          <div className="filterSelect">
            <FontAwesomeIcon icon={faFilter} className="filterIcon" size="1x"/>
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
        </div>
      </form>
      <hr className="searchBarSpace"/>
      <ListGroup variant="flush" className="listGroup">
        {events.map((event) => {
          return (
            <ListGroup.Item className="listGroupItem" key={event._id} action onClick={() => {
              dispatch(selectingEvent(event))
              resetSearchAndFilter()
            }}>
              <EventListItem event={event} />
            </ListGroup.Item>
          )
        })}
      </ListGroup>
      </Fragment>
    )
  } else {
    return (
      <EventInfoView event={selectedEvent} onClick={() => dispatch(selectingEvent(null))} />
    )
  }
}

const MapStateToProps = (state) => ({
    events: filterAndSearch(state.eventInfo.events, state.eventInfo.filterType, state.eventInfo.filter, state.eventInfo.search),
    selectedEvent: state.eventInfo.selectedEvent,
    searchValue: state.eventInfo.search
});

export default connect(MapStateToProps)(EventListView);