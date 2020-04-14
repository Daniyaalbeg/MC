import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../css/loginModal.css'

import ShowDetails from './showDetails.component'
import { loggingOut } from '../../Actions/authActions';
import { Redirect, Link } from 'react-router-dom';

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
          <Modal.Title>
            {auth ? "My Account" : "Log in"}
            {auth &&
              <Button onClick={handleClose} size="sm" className="createEventButton"> <Link className="linkButtonText" to="/createRation">Create Event</Link> </Button>
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShowDetails handleClose={handleClose} />
        </Modal.Body>
        {auth && 
          <Modal.Footer className="logoutButton">
            <Button variant="danger" className="logoutButton" onClick={() => dispatch(loggingOut())}> Log out </Button>
          </Modal.Footer>
        }
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