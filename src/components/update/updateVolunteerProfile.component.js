import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import UpdateVolunteerProfileForm from "./updateVolunteerProfileForm.component";

const UpdateVolunteerProfile = ({
  dispatch,
  hasErrors,
  loading,
  success,
  auth,
  userDict,
  userID,
}) => {
  if (!userDict || !userID) return <Redirect to="/dashboard" />;
  else
    return (
      <UpdateVolunteerProfileForm
        dispatch={dispatch}
        hasErrors={hasErrors}
        loading={loading}
        success={success}
        auth={auth}
        userDict={userDict}
        userID={userID}
      />
    );
};

const MapStateToProps = (state) => ({
  loading: state.signUp.loading,
  success: state.signUp.success,
  hasErrors: state.signUp.hasErrors,
  auth: state.auth.auth,
  userDict: state.userInfo.user,
  userID: state.userInfo.userID,
});

export default connect(MapStateToProps)(UpdateVolunteerProfile);
