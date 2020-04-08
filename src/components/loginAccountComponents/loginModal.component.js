import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import ShowDetails from './showDetails.component'

const LoginModal = ({dispatch, loading, hasErrors, auth}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {auth ? "My Account" : "Log in"}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{auth ? "My Account" : "Log in"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <ShowDetails handleClose={handleClose} />

        </Modal.Body>
      </Modal>
    </>
  );
}

const MapStateToProps = state => ({
  loading: state.auth.loading,
  hasErrors: state.auth.hasErrors,
  auth: state.auth.auth
})

export default connect(MapStateToProps)(LoginModal);