import React from 'react';
import { connect } from 'react-redux';

import CreateUserVolunteerForm from './createUserVolunteerForm.component';
import SignedUpMessage from '../signedUpMessage.component';

const CreateUserVolunteer = ({ props, success, dispatch }) => {
  if (success) {
    return <SignedUpMessage props={props} dispatch={dispatch} success={success} />
  } else {
    return (
      <div className="createVolunteerContainer">
        <CreateUserVolunteerForm />
      </div>
    )
  }
}

const MapStateToProps = (state, ownProps) => ({
  success: state.signUp.success,
  props: ownProps
});

export default connect(MapStateToProps)(CreateUserVolunteer)