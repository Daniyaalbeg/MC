import React, { useState } from 'react';
import { Helmet } from 'react-helmet'

import LoginForm from './loginForm.component';
import SignUpSheet from './SignUpSheet.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/pro-solid-svg-icons';

const LoginContainer = ({  }) => {
  const [signUp, setSignUp] = useState(false)

  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta name="description" content="Dashboard for your MC account where you can add, edit or delete all your information" />
      </Helmet>
      <div className="loginFormContainer">
        <div className="loginForm">
          <div className="loginFormHeader">
            <FontAwesomeIcon icon={faUserCircle} />
            <p> {signUp ? "Sign Up" : "Log In"} </p>
          </div>
          <div className="loginFormContent">
            {
              signUp
              ?
              <SignUpSheet setSignUp={setSignUp} />
              :
              <LoginForm setSignUp={setSignUp} />
            }
          </div>
        </div>
      </div>
    </>
  )

}

export default LoginContainer