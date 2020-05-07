import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import NavigationBar from './components/navigationBar.component';
import HomeView from './components/homeView/homeView.component'
import MainMap from './components/homeView/mainMap.component';
import OrgView from './components/organisationsView.component';
import OrgViewInfo from './components/organisationInfoView.component';
import SignUp from './components/signup/signUp.component';
import ResetPassword from './components/resetPassword.component';
import ResettingPassword from './components/signup/resettingPassword.component';
import EmailVerification from './components/signup/emailVerification.component'
import CreateRation from './components/signup/createRation.component';
import UpdateRation from './components/update/updateRation.component';
import About from './components/about.component';
import Error404 from './components/404.component'

import { checkCookie } from './Actions/authActions';

import './css/app.css'

function App({ dispatch, checkedCookie, auth}) {
  
  useEffect(() => {
    if (!auth && !checkedCookie) {
      dispatch(checkCookie())
    }
  })

  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/" exact component={HomeView}/>
        <Route path="/map" exact component={MainMap}/>
        <Route path="/organisations/:id" component={OrgViewInfo}/>
        <Route path="/organisations" component={OrgView}/>
        <Route path="/about" component={About} />
        <Route path="/signup" component={SignUp}/>
        <Route path="/reset" component={ResetPassword} />
        <Route path="/resetPassword/:id/:token" component={ResettingPassword} />
        <Route path="/verify/:token" component={EmailVerification} />
        <Route path="/createRation" component={CreateRation} />
        <Route path="/updateRation/:id" component={UpdateRation} />
        <Route component={Error404} />
      </Switch>
    </Router>
  );
}

const MapStateToProps = (state) => ({
  checkedCookie: state.auth.checkedCookie,
  auth: state.auth.auth,
})

export default connect(MapStateToProps)(App);
