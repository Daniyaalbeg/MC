import React, { Component, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import LoginModal from './modals/loginModal.component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'


const NavigationBar = () => {
  // constructor(props) {
  //   const [show, setShow] = useState(false);
  //   const openModal = () => setShow(true);
  //   const closeModal = () => setShow(false);
  // }

  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  // render() {
    return (
      <Navbar bg="light" expand="lg">
        <NavLink to="/"><Navbar.Brand>Corona Ration</Navbar.Brand></NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink to="/organisations"><Nav.Item> Organisations </Nav.Item></NavLink>
          </Nav>
          {/* <NavLink to="/login"> Log in </NavLink> */}
          <LoginModal openModal={openModal} closeModal={closeModal} show={show}/>
        </Navbar.Collapse>
      </Navbar>
    );
  // }
}

export default NavigationBar;

