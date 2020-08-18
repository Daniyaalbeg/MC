import React from 'react';
import LoginForm from './loginForm.component'
import DashboardView from './dashboardView.component';
import { Helmet } from 'react-helmet'
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
    return (
      <>
      <Helmet>
        <html lang="en" />
        <meta name="description" content="Dashboard for your MC account where you can add, edit or delete all your information" />
      </Helmet>
      <div className="loginFormContainer">
        <LoginForm />
      </div>
      </>
    )
  }
}

const MapStateToProps = (state, ownProps) => ({
  auth: state.auth.auth,
  handleClose: ownProps.handleClose
});

export default connect(MapStateToProps)(DashboardContainer)