import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Carousel, Row, Spinner } from 'react-bootstrap';
import '../../css/eventInfoView.css'
// import EventItemInfoMap from './eventItemInfoMap.component.js';

import { deleteEvent, resetDelete } from '../../Actions/deleteEventAction'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/pro-duotone-svg-icons'

const EventItemInfo = ({ dispatch, hasErrors, deletedEvent, deletingEvent, props }) => {
  const [showDeleteSure, setDeleteSure] = useState(false);
  const handleClose = () => setDeleteSure(false);
  const handleShow = () => setDeleteSure(true);

  if (hasErrors) {
    handleClose()
    alert("An error occured. Cannot delete, please contact support.")
    dispatch(resetDelete())
  }
  if (deletedEvent) {
    // handleClose()
  }

  const event = props.event;
  // const MapViewLazy = React.lazy(() => import('./eventitemInfoMap.component.js'))
  return (
    <>
      <p> {event.description} </p>
      <hr />
      <h6 className="text-muted"> Number of items distributed </h6>
      <p> {event.totalNumberOfItems} </p>
      <hr />
      <h6 className="text-muted"> Descripiton of items </h6>
      <p> {event.itemsDescription} </p>
      <hr />
      <h6 className="text-muted"> Type of distribution </h6>
      <p> {event.typeOfRation === "ppe" ? "Personal Protection Equipment" : event.typeOfRation} </p>      <hr />
      {event.images.length !== 0 &&
          <div className="imageCarouselContainer">
          <h6 className="text-muted"> Images </h6>
          <Carousel className="imageCarousel">
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
      {/* <hr />
      <h6 className="text-muted"> Location </h6>
      <Suspense fallback={<div> Loading... </div>}>
        <MapViewLazy event={event} />
      </Suspense> */}
      {/* <EventItemInfoMap event={event} /> */}

      {
        props.isUser &&
          <Row className="updateDelete">
          <Link to={"/updateEvent/" + event._id}>
            <button className="standardButton editIconVersion" onClick={() => {
              props.handleClose()
            }}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            </Link>
            <button className="standardButton redVersion" onClick={() => {
              handleShow()
            }}>
            <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </Row>
      }


      <Modal show={showDeleteSure} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
      <Modal.Body>
        <button className="standardButton eventModalDeleteButton redVersion" onClick={() => {
          dispatch(deleteEvent(event._id))
        }}>
          {
          deletingEvent ? 
          <Spinner animation="grow" size="sm" style={{ marginRight: '8px' }} /> 
          :
          null
        }
          {deletingEvent ? "Deleting" : "Delete"}
        </button>
        <button className="standardButton" onClick={() => {
          handleClose()
        }}>
          Close
        </button>
      </Modal.Body>
      </Modal>

    </>
  )
}

const MapStateToProps = (state, ownProps) => ({
  deletingEvent: state.deleteInfo.deletingEvent,
  hasErrors: state.deleteInfo.hasErrors,
  deletedEvent: state.deleteInfo.deletedEvent,
  props: ownProps
})

export default connect(MapStateToProps)(EventItemInfo);