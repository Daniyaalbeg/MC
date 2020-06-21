import React, { Fragment } from 'react';
import { ListGroup } from 'react-bootstrap';
import { selectingEvent, toggleShowList } from '../../Actions/selectEventActions';
import { connect } from 'react-redux';
import '../../css/eventlistView.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/pro-light-svg-icons'
import filterAndSearch from '../utilities/filterAndSearch';
import { searchEvents, filterEvents, filterEventsType } from '../../Actions/filterSearchEventAction';
import { FilterRationType, FilterOrgType } from '../utilities/filterOptions'
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
        <p className="eventListTitle"> {props.event.name} </p>
        <p className="text-muted eventListDate"> {new Date(props.event.date).toLocaleDateString("en-US", dateOptions)} </p>
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

const EventListView = ({dispatch, events, selectedEvent, searchValue, showList}) => {
  
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


  if (showList) {
    return (
    <div className="eventListContainer">
      <form className="searchBarContainer" onSubmit={(e) => { e.preventDefault() }}>
        <div className="searchBar">
          <FontAwesomeIcon icon={faSearch} className="searchIcon" size="1x"/>
          <input type='text' onChange={onSearchChange} className="textInput"/>
        </div>
        <hr className="searchBarMiddleGap"/>
        <div className="filters">
          <div className="filterSelect">
            <FontAwesomeIcon icon={faFilter} className="filterIcon" size="1x"/>
            <FilterRationType onChange={onFilterChangeType} />
          </div>
          <div className="filterSelect">
            <FontAwesomeIcon icon={faFilter} className="filterIcon" size="1x"/>
            <FilterOrgType onChange={onFilterChange} />
          </div>
        </div>
      </form>
      <hr className="searchBarSpace"/>
      <ListGroup variant="flush" className="listGroup">
        {events.map((event) => {
          return (
            <ListGroup.Item className="listGroupItem" key={event._id} action onClick={() => {
              dispatch(selectingEvent(event))
              dispatch(toggleShowList())
              resetSearchAndFilter()
            }}>
              <EventListItem event={event} />
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </div>
    )
  } else {
    return (
      <EventInfoView event={selectedEvent} onClick={() => {
        dispatch(selectingEvent(null))
        dispatch(toggleShowList())
      }} />
    )
  }
}

const MapStateToProps = (state) => ({
    events: filterAndSearch(state.mapInfo.mapActions.events, state.mapInfo.mapActions.filterType, state.mapInfo.mapActions.filter, state.mapInfo.mapActions.search),
    showList: state.mapInfo.mapActions.showList,
    selectedEvent: state.mapInfo.mapActions.selectedEvent,
    searchValue: state.mapInfo.mapActions.search
});

export default connect(MapStateToProps)(EventListView);