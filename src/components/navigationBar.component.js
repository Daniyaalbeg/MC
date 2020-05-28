import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import '../css/navbar.css'
import MCMC from '../assets/svg/MCMC.svg';
import { useLocation } from 'react-router-dom';


const NavigationBar = ({ auth }) => {
  let location = useLocation()

  if (location.pathname === "/") {
    return (
      <Navbar className="navBar" bg="black" variant="dark" expand="lg">
        <Link to="/"><Navbar.Brand>
          <img src={MCMC} alt="MC" className="mcLogo"/>
          </Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item><Link className="navlink spaceLink" to="/map"> Map </Link></Nav.Item>
            <Nav.Item><Link className="navlink spaceLink" to="/organisations"> Organisations </Link></Nav.Item>
            <Nav.Item><Link className="navlink spaceLink" to="/cnic"> CNIC </Link></Nav.Item>
            {/* <Nav.Item><Link className="navlink spaceLink" to="/about"> About </Link></Nav.Item> */}
            <Link className="loginNav" to="/dashboard"> { auth ? "My Dashboard" : "Log in"} </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return (
      <Navbar className="navBar" bg="black" variant="dark" expand="lg">
        <Link to="/"><Navbar.Brand>
          <img src={MCMC} alt="MC" className="mcLogo"/>
          </Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item><Link className="navlink spaceLink" to="/map"> Map </Link></Nav.Item>
            <Nav.Item><Link className="navlink spaceLink" to="/organisations"> Organisations </Link></Nav.Item>
            <Nav.Item><Link className="navlink spaceLink" to="/cnic"> CNIC </Link></Nav.Item>
            {/* <Nav.Item><Link className="navlink spaceLink" to="/about"> About </Link></Nav.Item> */}
            <Link className="loginNav" to="/dashboard"> { auth ? "My Dashboard" : "Log in"} </Link>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const MapStateToProps = (state) => ({
  auth: state.auth.auth
})

export default connect(MapStateToProps)(NavigationBar);

