import React, { Fragment } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import '../../css/eventInfoView.css'

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
      <button onClick={props.onClick} className="backButton"> <FontAwesomeIcon className="backButtonIcon" icon={faChevronLeft} /> Back </button>
        
      <hr className="searchBarSpace"/>

      <div className="bigBoi">
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
          <h6 className="text-muted"> Type of Rations </h6>
          <p> {event.typeOfRation === "ppe" ? "Personal Protection Equipment" : event.typeOfRation} </p>
        </div>
        <div className="smallBoi">
          <h6 className="text-muted"> Happened on </h6>
          <p> {new Date(event.date).toLocaleDateString("en-US", dateOptions)} </p>
        </div>
        <div className="smallBoi">
          <h6 className="text-muted"> Charity </h6>
          <p> {event.supplier.supplierName} </p>
        </div>
        {event.images.length !== 0 &&
          <div className="smallBoi spaceBelow">
          <h6 className="text-muted"> Images </h6>
          <Carousel>
            {event.images.map((image) => {
              return (
                <Carousel.Item>
                  <div className="imageContainer">
                    <img className="img" src={image} alt="" />
                  </div>
                </Carousel.Item>
              )
            })}
          </Carousel>
          </div>
        }
        <div className="smallBoi">
          <Button variant="primary" onClick={props.onClick}> Back </Button>
        </div>
      </div>
      </Fragment>
    )
  }
}

export default EventInfoView;