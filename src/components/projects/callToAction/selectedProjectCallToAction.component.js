import React from 'react';
import { connect } from 'react-redux';

import CallToActionButtonViews from './callToActionButtonView.component';
import CallToActionProgressViews from './callToActionProgressViews.component';

const SelectedProjectCallToAction = ({ project, setActiveTab, auth }) => {
  return (
    <div className="selectedProjectCallToActionView">
      <h4> Call To Action </h4>
      <CallToActionProgressViews project={project} />
      <CallToActionButtonViews project={project} setActiveTab={setActiveTab} auth={auth} />
    </div>
  )
}

const MapStateToProps = (state) => ({
  auth: state.auth.auth
})

export default connect(MapStateToProps)(SelectedProjectCallToAction)