import React from 'react';
import { connect } from 'react-redux';

import SignupUserForm from './signupUserForm.component';
import SignedUpMessage from './signedUpMessage.component';

const SignupUser = ({ dispatch, success, props }) => {
  if (success) {
    return <SignedUpMessage props={props} dispatch={dispatch} success={success} />
  } else {
    return <SignupUserForm />
  }
}

const MapStateToProps = (state, ownProps) => ({
  success: state.signUp.success,
  props: ownProps
});


export default connect(MapStateToProps)(SignupUser);