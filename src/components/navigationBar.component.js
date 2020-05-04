import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import LoginModal from './loginAccountComponents/loginModal.component';
import '../css/navbar.css'
import MCMC from '../assets/svg/MCMC.svg';
import { useLocation } from 'react-router-dom';


const NavigationBar = () => {

  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  let location = useLocation()
  console.log(location)
  console.log(location.pathname)

  if (location.pathname === "/") {
    return (
      <Navbar className="navBar" bg="dark" variant="dark" expand="lg">
        <Link to="/"><Navbar.Brand>
          <img src={MCMC} alt="MC" className="mcLogo"/>
          </Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item><Link className="navlink spaceLink" to="/map"> Map </Link></Nav.Item>
            <Nav.Item><Link className="navlink spaceLink" to="/organisations"> Organisations </Link></Nav.Item>
            <Nav.Item><Link className="navlink" to="/about"> About </Link></Nav.Item>
          </Nav>
          {/* <NavLink to="/login"> Log in </NavLink> */}
          <LoginModal openModal={openModal} closeModal={closeModal} show={show}/>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Link to="/"><Navbar.Brand>
          <img src={MCMC} alt="MC" className="mcLogo"/>
          </Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item><Link className="navlink spaceLink" to="/map"> Map </Link></Nav.Item>
            <Nav.Item><Link className="navlink spaceLink" to="/organisations"> Organisations </Link></Nav.Item>
            <Nav.Item><Link className="navlink" to="/about"> About </Link></Nav.Item>
          </Nav>
          {/* <NavLink to="/login"> Log in </NavLink> */}
          <LoginModal openModal={openModal} closeModal={closeModal} show={show}/>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;

