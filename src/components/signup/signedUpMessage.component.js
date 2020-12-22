import React, { useEffect } from 'react';
import { signupReset } from '../../Actions/signUpActions';


const SignedUpMessage = ({ props, dispatch, success }) => {
  useEffect(() => {
    return function cleanup() {
      dispatch(signupReset())
    }
  }, [success])

  return (
    <div className="userSignupWelcomeMessageContainer">
      <div className="userSignupWelcomeMessage">
        <h1> Congratulations! </h1>
        <p>
          You are now a member of Ministry of Change. We welcome you to our family of changemakers. You can now create an organisation, create a project, map your impact or create a group.
        </p>
        <p>
          You can now go to the dashboard to manage your account and create your organisation or group. They will show up for everyone else once you have been approved by our admins.
        </p>
        <p>
          Please also verify your email as you will not be able to perform any actions until it has been verified.
        </p>
        <button className="standardButton" onClick={() => {
          props.history.push('/dashboard')
        }} > Go to Dashboard </button>
      </div>
    </div>
  )
}

export default SignedUpMessage