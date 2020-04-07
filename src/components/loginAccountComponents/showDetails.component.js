import React from 'react';
import LoginForm from './loginForm.component'
import AccountView from './accountView.component';
import { connect } from 'react-redux'


const ShowDetails = ({auth, handleClose}) => {
  const isLoggedIn = auth
  if (isLoggedIn) {
    return <AccountView />
  } else {
    return <LoginForm handleClose={handleClose}/>
  }
}

const MapStateToProps = (state, ownProps) => ({
  auth: state.auth.auth,
  handleClose: ownProps.handleClose
});

export default connect(MapStateToProps)(ShowDetails)