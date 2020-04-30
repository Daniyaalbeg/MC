import React, { Fragment } from 'react';
import { ListGroup } from 'react-bootstrap';
import { selectingRationEvent } from '../../Actions/selectRationEventActions';
import { connect } from 'react-redux';
import '../../css/rationlistView.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/pro-light-svg-icons'
import filterAndSearch from './filterAndSearch';
import { searchRationEvents, filterRationEvents } from '../../Actions/filterSearchRatioEventAction';
import RationInfoView from './rationInfoView.component';
import sack from '../../assets/svg/sack.svg'
import mask from '../../assets/svg/mask.svg'
import coin from '../../assets/svg/coin.svg'
import shirt from '../../assets/svg/shirt.svg'


const RationListItem = (props) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 
  return (
      <div className="list-view-container">
      <div className="list-left">
        <RationListImage type={props.rationEvent.typeOfRation} />
      </div>
      <div className="list-right">
        <h5> {props.rationEvent.name} </h5>
        <h6 className="text-muted"> {new Date(props.rationEvent.date).toLocaleDateString("en-US", dateOptions)} </h6>
      </div>
      </div>
  )
}

const RationListImage = (props) => {
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

const RationListView = ({dispatch, rationEvents, selectedRation, searchValue}) => {
  
  const onSearchChange = (event) => {
    dispatch(searchRationEvents(event.target.value))
  }

  const onFilterChange = (event) => {
    dispatch(filterRationEvents(event.target.value))
  }

  const resetSearchAndFilter = () => {
    dispatch(searchRationEvents(""))
    dispatch(filterRationEvents("all"))
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
            <ListGroup.Item className="listGroupItem" key={rationEvent._id} action onClick={() => {
              dispatch(selectingRationEvent(rationEvent))
              resetSearchAndFilter()
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