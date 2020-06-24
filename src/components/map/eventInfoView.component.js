import React, { Fragment } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {} from '../../Actions/selectEventActions';
import '../../css/eventInfoView.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons'

const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 

const EventInfoView = (props) => {
  const event = props.event;
  if (event == null) {
    return <div className="noEvent"><h1> No Event selected. </h1></div>
  } else {
    return (
      <Fragment>
      {/* <button onClick={props.onClick} className="backButton"> <FontAwesomeIcon className="backButtonIcon" icon={faChevronLeft} /> Back </button> */}
        
      <hr className="searchBarSpace"/>

      <div className="bigBoi">
        <div className="smallBoi">
          <button className="standardButton" onClick={props.onClick} style={{marginBottom: "12px"}}> Back </button>
        </div>
        <div className="smallBoi">
          <h6 className="text-muted"> Name </h6>
          <p> {event.name} </p>
        </div>
        <div className="smallBoi">
          <h6 className="text-muted"> Description </h6>
          <p> {event.description} </p>
        </div>
        <div className="smallBoi">
          <h6 className="text-muted"> Number of items </h6>
          <p> {event.totalNumberOfItems} </p>
        </div>
        <div className="smallBoi">
          <h6 className="text-muted"> Descripiton of items </h6>
          <p> {event.itemsDescription} </p>
        </div>
        <div className="smallBoi">
          <h6 className="text-muted"> Type of Distribution </h6>
          <p> {event.typeOfRation === "ppe" ? "Personal Protection Equipment" : event.typeOfRation} </p>
        </div>
        <div className="smallBoi">
          <h6 className="text-muted"> Happened on </h6>
          <p> {new Date(event.date).toLocaleDateString("en-US", dateOptions)} </p>
        </div>
        <div className="smallBoi">
          <h6 className="text-muted"> Created by </h6>
          <Link to={'/organisations/' + event.createdBy._id}> {event.createdBy.supplierName} </Link>
        </div>
        {event.images.length !== 0 &&
          <div className="smallBoi spaceBelow">
          <h6 className="text-muted"> Images </h6>
          <Carousel>
            {event.images.map((image) => {
              return (
                <Carousel.Item key={image}>
                  <div className="imageContainer">
                    <img className="img" src={image} alt="" />
                  </div>
                </Carousel.Item>
              )
            })}
          </Carousel>
          </div>
        }
      </div>
      </Fragment>
    )
  }
}

export default EventInfoView;