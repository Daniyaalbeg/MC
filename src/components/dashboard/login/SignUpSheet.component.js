import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faHandsHelping } from '@fortawesome/pro-solid-svg-icons';
// import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

const SignUpSheet = ({ setSignUp }) => {
  const history = useHistory();

  const navigateToUserSignup = () => history.push('/signup')
  const navigateToUserVolunteerSignup = () => history.push('/createUserVolunteer')

  return (
    <div style={{ width: "100%" }}>
      <button onClick={navigateToUserSignup} className="standardButtonWithoutColour mcLightBG" style={{marginBottom: '8px', height: '2.2em', fontWeight: "bold", width: "100%" }}>
        <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '8px' }} />
        Sign Up
      </button>
      <button onClick={navigateToUserVolunteerSignup} className="standardButtonWithoutColour mcLightBG" style={{marginBottom: '8px', height: '2.2em', fontWeight: "bold", width: "100%" }}>
        <FontAwesomeIcon icon={faHandsHelping} style={{ marginRight: '8px' }} />
        Sign Up as a Volunteer
      </button>
      {/* <button className="standardButtonWithoutColour mcLightBG" style={{marginBottom: '8px', height: '2.2em', fontWeight: "bold", width: "100%" }}>
        <FontAwesomeIcon icon={faFacebook} style={{ marginRight: '8px' }} />
        Sign Up with Facebook
      </button> */}
      {/* <button className="standardButtonWithoutColour mcLightBG" style={{height: '2.2em', fontWeight: "bold", width: "100%" }}>
        <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '8px' }} />
        Sign Up with Google
      </button> */}
    </div>
  )
}

export default SignUpSheet
