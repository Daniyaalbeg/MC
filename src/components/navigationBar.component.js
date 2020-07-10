import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import '../css/navbar.css'
import MCMC from '../assets/svg/MCMC.svg';
import { useLocation } from 'react-router-dom';


const NavigationBar = ({ auth }) => {
  let location = useLocation()
  const [dropDown, setDropDown] = useState(false)

  if (location.pathname === "/") {
    return (
      <Navbar className="navBarHome" bg="black" variant="dark" expand="lg" expanded={dropDown} onToggle={() => setDropDown(!dropDown)}>
        <Link to="/">
          <Navbar.Brand className="navBarLogo">
            <img src={MCMC} alt="MC" className="mcLogoHome"/>
            <p> Beta </p>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item onClick={() => setDropDown(false)}><Link className="navlink navlinkHome spaceLink" to="/map"> Map </Link></Nav.Item>
            <Nav.Item onClick={() => setDropDown(false)}><Link className="navlink navlinkHome spaceLink" to="/organisations"> Organisations </Link></Nav.Item>
            <Nav.Item onClick={() => setDropDown(false)}><Link className="navlink navlinkHome spaceLink" to="/groups"> Groups </Link></Nav.Item>
            <Nav.Item onClick={() => setDropDown(false)}><Link className="navlink navlinkHome spaceLink" to="/cnic"> CNIC </Link></Nav.Item>
            {/* <Nav.Item><Link className="navlinkHome spaceLink" to="/about"> About </Link></Nav.Item> */}
            <Link className="loginNav loginNavHome" to="/dashboard" onClick={() => setDropDown(false)}> { auth ? "My Dashboard" : "Log in"} </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return (
      <Navbar className="navBar" bg="black" variant="dark" expand="lg" expanded={dropDown} onToggle={() => setDropDown(!dropDown)}>
        <Link to="/">
          <Navbar.Brand className="navBarLogo">
            <img src={MCMC} alt="MC" className="mcLogoHome"/>
            <p> Beta </p>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item onClick={() => setDropDown(false)}><Link className="navlink spaceLink" to="/map"> Map </Link></Nav.Item>
            <Nav.Item onClick={() => setDropDown(false)}><Link className="navlink spaceLink" to="/organisations"> Organisations </Link></Nav.Item>
            <Nav.Item onClick={() => setDropDown(false)}><Link className="navlink spaceLink" to="/groups"> Groups </Link></Nav.Item>
            <Nav.Item onClick={() => setDropDown(false)}><Link className="navlink spaceLink" to="/cnic"> CNIC </Link></Nav.Item>
            {/* <Nav.Item><Link className="navlink spaceLink" to="/about"> About </Link></Nav.Item> */}
            <Link className="loginNav" to="/dashboard" onClick={() => setDropDown(false)}> { auth ? "My Dashboard" : "Log in"} </Link>
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

