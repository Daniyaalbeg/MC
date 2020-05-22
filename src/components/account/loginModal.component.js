import React, { useState } from 'react';
import { connect } from 'react-redux'
import { Modal, Nav} from 'react-bootstrap';
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

      <Nav.Item className="loginNav" onClick={handleShow}> {auth ? "My Account" : "Log in"} </Nav.Item>

      <Modal show={show} onHide={handleClose} className="modalFont">
        <Modal.Header closeButton>
          <Modal.Title>
            {auth ? "My Account" : "Log in"}
            {auth &&
              <Link className="linkButtonText" to="/createEvent"><button onClick={handleClose} size="sm" className="createEventButton standardButton smallVersion"> Create Event </button></Link>
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShowDetails handleClose={handleClose} />
        </Modal.Body>
        {auth && 
          <Modal.Footer className="logoutButton">
            <button className="logoutButton standardButton redVersion" onClick={() => dispatch(logout())}> Log out </button>
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