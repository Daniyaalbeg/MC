import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Carousel, Row, Spinner } from 'react-bootstrap';
// import EventItemInfoMap from './eventItemInfoMap.component.js';

import { deleteEvent, resetDelete } from '../../../Actions/deleteEventAction'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/pro-duotone-svg-icons'

const EventItemInfo = ({ dispatch, hasErrors, deletedEvent, deletingEvent, props }) => {
  const [showDeleteSure, setDeleteSure] = useState(false);
  const handleClose = () => setDeleteSure(false);
  const handleShow = () => setDeleteSure(true);
  const [dispatchedReset, setDispatchedReset] = useState(false)

  if (hasErrors && !dispatchedReset) {
    setDispatchedReset(true)
    dispatch(resetDelete())
    handleClose()
    console.log("Error deleting")
  }
  if (deletedEvent && showDeleteSure) {
    handleClose()
    dispatch(resetDelete())
  }

  const event = props.event;
  // const MapViewLazy = React.lazy(() => import('./eventitemInfoMap.component.js'))
  return (
    <>
      <p className="eventTitle"> Description of distribution </p>
      <p> {event.description} </p>

      <p className="eventTitle"> Number of items distributed </p>
      <p> {event.totalNumberOfItems} </p>

      <p className="eventTitle"> Descripiton of items </p>
      <p> {event.itemsDescription} </p>

      <p className="eventTitle"> Type of distribution </p>
      <p> {event.typeOfRation === "ppe" ? "Personal Protection Equipment" : event.typeOfRation} </p>

      {event.images &&
          <div className="imageCarouselContainer">
          <p className="eventTitle"> Images </p>
          <Carousel className="imageCarousel">
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
      {/* <hr />
      <p className="eventTitle"> Location </p>
      <Suspense fallback={<div> Loading... </div>}>
        <MapViewLazy event={event} />
      </Suspense> */}
      {/* <EventItemInfoMap event={event} /> */}

      {
        props.isUser &&
          <Row className="updateDelete">
            <Link to={"/updateEvent/" + event.createdBy + '/' + event._id}>
              <button className="standardButton squareButton editIconVersion">
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </Link>
              <button className="standardButton squareButton redVersion" onClick={() => {
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
        <div className="formButtons">
          <button className="standardButton eventModalDeleteButton redVersion" disabled={deletingEvent} onClick={() => {
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
        </div>
        {hasErrors &&
          <p className="redError"> An error occurred trying to delete this. Please contact support info@ministryofchange.org</p>
        }
      </Modal.Body>
      </Modal>

    </>
  )
}

const MapStateToProps = (state, ownProps) => ({
  deletingEvent: state.deleteInfo.deleteEvent.deleting,
  hasErrors: state.deleteInfo.deleteEvent.hasErrors,
  deletedEvent: state.deleteInfo.deleteEvent.deleted,
  props: ownProps
})

export default connect(MapStateToProps)(EventItemInfo);