import React, { useState, Suspense } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Carousel, Row, Button } from 'react-bootstrap';
import '../../css/rationInfoView.css'
import RationItemInfoMap from './rationitemInfoMap.component.js';

import { deleteRation, resetDelete } from '../../Actions/deleteRationAction'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/pro-duotone-svg-icons'

const RationItemInfo = ({ dispatch, hasErrors, deletedRation, deletingRation, props }) => {
  const [showDeleteSure, setDeleteSure] = useState(false);
  const handleClose = () => setDeleteSure(false);
  const handleShow = () => setDeleteSure(true);

  if (hasErrors) {
    handleClose()
    alert("An error occured. Cannot delete, please contact support.")
    dispatch(resetDelete())
  }
  if (deletedRation) {
    // handleClose()
  }

  const ration = props.ration;
  // const MapViewLazy = React.lazy(() => import('./rationitemInfoMap.component.js'))
  return (
    <>
      <p> {ration.description} </p>
      <hr />
      <h6 className="text-muted"> Number of rations distributed </h6>
      <p> {ration.totalNumberOfItems} </p>
      <hr />
      <h6 className="text-muted"> Descripiton of items </h6>
      <p> {ration.itemsDescription} </p>
      <hr />
      <h6 className="text-muted"> Type of Rations </h6>
      <p> {ration.typeOfRation === "ppe" ? "Personal Protection Equipment" : ration.typeOfRation} </p>      <hr />
      {ration.images.length !== 0 &&
          <div className="imageCarouselContainer">
          <h6 className="text-muted"> Images </h6>
          <Carousel className="imageCarousel">
            {ration.images.map((image) => {
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
        <MapViewLazy ration={ration} />
      </Suspense> */}
      {/* <RationItemInfoMap ration={ration} /> */}

      <Row className="updateDelete">
      <Link to={"/updateRation/" + ration._id}>
        <Button variant="primary" onClick={() => {
          props.handleClose()
        }}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        </Link>
        <Button variant="danger" onClick={() => {
          handleShow()
        }}>
        <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </Row>

      <Modal show={showDeleteSure} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
      <Modal.Body>
        <Button variant="danger" className="rationModalDeleteButton" onClick={() => {
          dispatch(deleteRation(ration._id))
        }}>
          {deletingRation ? "Deleting" : "Delete"}
        </Button>
        <Button variant="primary" onClick={() => {
          handleClose()
        }}>
          Close
        </Button>
      </Modal.Body>
      </Modal>

    </>
  )
}

const MapStateToProps = (state, ownProps) => ({
  deletingRation: state.deleteInfo.deletingRation,
  hasErrors: state.deleteInfo.hasErrors,
  deletedRation: state.deleteInfo.deletedRation,
  props: ownProps
})

export default connect(MapStateToProps)(RationItemInfo);