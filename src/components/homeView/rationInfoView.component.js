import React, { Fragment } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import '../../css/rationInfoView.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons'

const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 

const RationInfoView = (props) => {
  const ration = props.rationEvent;
  if (ration == null) {
    return <div className="noRation"><h1> No Ration selected. </h1></div>
  } else {
    return (
      <Fragment>
      <button onClick={props.onClick} className="backButton"> <FontAwesomeIcon className="backButtonIcon" icon={faChevronLeft} /> Back </button>
        
      <hr className="searchBarSpace"/>

      <div className="bigBoi">
        <div className="smallBoi">
          <h6 className="text-muted"> Name </h6>
          <p> {ration.name} </p>
        </div>
        <div className="smallBoi">
          <h6 className="text-muted"> Description </h6>
          <p> {ration.description} </p>
        </div>
        <div className="smallBoi">
          <h6 className="text-muted"> Number of items </h6>
          <p> {ration.totalNumberOfItems} </p>
        </div>
        <div className="smallBoi">
          <h6 className="text-muted"> Descripiton of items </h6>
          <p> {ration.itemsDescription} </p>
        </div>
        <div className="smallBoi">
          <h6 className="text-muted"> Happened on </h6>
          <p> {new Date(ration.date).toLocaleDateString("en-US", dateOptions)} </p>
        </div>
        <div className="smallBoi">
          <h6 className="text-muted"> Charity </h6>
          <p> {ration.supplier.supplierName} </p>
        </div>
        {ration.images.length !== 0 &&
          <div className="smallBoi spaceBelow">
          <h6 className="text-muted"> Images </h6>
          <Carousel>
            {ration.images.map((image) => {
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

export default RationInfoView;