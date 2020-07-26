import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signupReset } from '../../Actions/signUpActions';

import SignupUserForm from './signupUserForm.component';
import '../../css/form.css';

const SignupUser = ({ dispatch, success, props }) => {
  if (true) {
    return <SignedUpMessage props={props} dispatch={dispatch} success={success} />
  } else {
    return <SignupUserForm />
  }
}

const SignedUpMessage = ({ props, dispatch, success }) => {
  useEffect(() => {
    return function cleanup() {
      console.log('reset signup')
      dispatch(signupReset())
    }
  }, [success])

  return (
    <div className="userSignupWelcomeMessageContainer">
      <div className="userSignupWelcomeMessage">
        <h1> Congratulations! </h1>
        <p>
          You are now a member of Ministry of Change. We welcome you to our family of changemakers. You can now create an organisation, map your impact or create a group.
        </p>
        <p>
          You can now go to the dashboard to manage your account and create your organisation or group. They will show up for everyone else once you have been approved by our admins.
        </p>
        <button className="standardButton" onClick={() => {
          props.history.push('/dashboard')
          console.log(props)
        }} > Go to Dashboard </button>
      </div>
    </div>
  )
}

const MapStateToProps = (state, ownProps) => ({
  success: state.signUp.success,
  // auth: state.auth.auth,
  props: ownProps
});


export default connect(MapStateToProps)(SignupUser);