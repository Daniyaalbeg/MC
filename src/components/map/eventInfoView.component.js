import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {} from '../../Actions/selectEventActions';
import '../../css/eventInfoView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/pro-duotone-svg-icons'

const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 

const EventInfoView = (props) => {
  const event = props.event;
  if (event == null) {
    return <div className="noEvent"><h1> No Event selected. </h1></div>
  } else {
    return (
      <div className="bigBoi">
        <div className="smallBoi">
          <button className="standardButton" onClick={props.onClick} style={{marginBottom: "12px"}}> Back </button>
        </div>
        <div className="smallBoi">
          <p className="eventTitle"> Name </p>
          <p className="eventContent"> {event.name} </p>
        </div>
        <div className="smallBoi">
          <p className="eventTitle"> Description </p>
          <p className="eventContent"> {event.description} </p>
        </div>
        <div className="smallBoi">
          <p className="eventTitle"> Number of items </p>
          <p className="eventContent"> {event.totalNumberOfItems} </p>
        </div>
        <div className="smallBoi">
          <p className="eventTitle"> Descripiton of items </p>
          <p className="eventContent"> {event.itemsDescription} </p>
        </div>
        <div className="smallBoi">
          <p className="eventTitle"> Type of Distribution </p>
          <p className="eventContent"> {event.typeOfRation === "ppe" ? "Personal Protection Equipment" : event.typeOfRation} </p>
        </div>
        <div className="smallBoi">
          <p className="eventTitle"> Happened on </p>
          <p className="eventContent"> {new Date(event.date).toLocaleDateString("en-US", dateOptions)} </p>
        </div>
        <div className="smallBoi">
          <p className="eventTitle"> Created by </p>
          <div className="orgLinkFromEvent">
            <FontAwesomeIcon icon={faLink} size="sm" />
            <Link to={'/organisations/' + event.createdBy._id}> {event.createdBy.supplierName} </Link>
          </div>
        </div>
        {event.images.length !== 0 &&
          <div className="spaceBelow">
          <p className="eventTitle"> Images </p>
          <Carousel>
            {event.images.map((image) => {
              return (
                <Carousel.Item key={image}>
                  <div className="imageContainerEvent">
                    <img className="imgEvent" src={image} alt="" />
                  </div>
                </Carousel.Item>
              )
            })}
          </Carousel>
          </div>
        }
      </div>
    )
  }
}

export default EventInfoView;