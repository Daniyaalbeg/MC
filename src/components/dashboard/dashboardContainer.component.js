import React from 'react';
import LoginContainer from './login/loginContainer.component';
import DashboardView from './dashboardView.component';
import { connect } from 'react-redux'
import '../../css/dashboard.css'


const DashboardContainer = ({ auth }) => {
  const isLoggedIn = auth
  if (isLoggedIn) {
    return (
      <div className="dashboardContainer">
        <DashboardView />
      </div>
    )
  } else {
    return <LoginContainer />
  }
}

const MapStateToProps = (state, ownProps) => ({
  auth: state.auth.auth,
  handleClose: ownProps.handleClose
});

export default connect(MapStateToProps)(DashboardContainer)