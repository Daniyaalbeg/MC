import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Modal, Button, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../../css/loginModal.css'

import ShowDetails from './showDetails.component'
import { logout } from '../../Actions/authActions';

const LoginModal = ({dispatch, loading, hasErrors, auth}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        {auth ? "My Account" : "Log in"}
      </Button> */}

      <Nav.Item className="navlink" onClick={handleShow}> {auth ? "My Account" : "Log in"} </Nav.Item>

      <Modal show={show} onHide={handleClose} className="modalFont">
        <Modal.Header closeButton>
          <Modal.Title>
            {auth ? "My Account" : "Log in"}
            {auth &&
              <Link className="linkButtonText" to="/createEvent"><Button onClick={handleClose} size="sm" className="createEventButton"> Create Event </Button></Link>
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShowDetails handleClose={handleClose} />
        </Modal.Body>
        {auth && 
          <Modal.Footer className="logoutButton">
            <Button variant="danger" className="logoutButton" onClick={() => dispatch(logout())}> Log out </Button>
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