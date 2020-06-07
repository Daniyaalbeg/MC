import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import  ScrollToTop from './components/utilities/scrollToTop.component'

import NavigationBar from './components/navigationBar.component';
import HomeView from './components/homeView/homeView.component'
import MainMap from './components/map/mainMap.component';
import OrgView from './components/organisations/organisationsView.component';
import OrgViewInfo from './components/organisations/organisationInfoView.component';
import SignUpOrg from './components/signup/signUpOrg.component';
import SignupUser from './components/signup/signupUser.component';
import ResetPassword from './components/reset/resetPassword.component';
import ResettingPassword from './components/reset/resettingPassword.component';
import EmailVerification from './components/signup/emailVerification.component'
import CreateEvent from './components/signup/createEvent.component';
import UpdateEvent from './components/update/updateEvent.component';
import About from './components/about.component';
import CnicView from './components/cnic/cnicView.component';
import Dashboard from './components/dashboard/dashboardContainer.component';
import PrivacyPolicy from './components/privacyPolicy.component';
import TermsAndConditions from './components/termsAndConditions';
import Error404 from './components/404.component';

import { checkCookie } from './Actions/authActions';

import './css/app.css'
import './css/general.css'

function App({ dispatch, checkedCookie, auth }) {
  
  useEffect(() => {
    if (!checkedCookie) {
      dispatch(checkCookie())
    }
  })

  return (
    <Router>
      <ScrollToTop />
      <NavigationBar />
      <Switch>
        <Route path="/" exact component={HomeView}/>
        <Route path="/dashboard" exact component={Dashboard}/>
        <Route path="/map" exact component={MainMap}/>
        <Route path="/organisations/:id" component={OrgViewInfo}/>
        <Route path="/organisations" component={OrgView}/>
        <Route path="/about" component={About} />
        <Route path="/signup" component={SignupUser}/>
        <Route path="/signupOrg" component={SignUpOrg}/>
        <Route path="/reset" component={ResetPassword} />
        <Route path="/resetPassword/:id/:token" component={ResettingPassword} />
        <Route path="/verify/:token" component={EmailVerification} />
        <Route path="/createEvent" component={CreateEvent} />
        <Route path="/updateEvent/:id" component={UpdateEvent} />
        <Route path="/cnic" component={CnicView} />
        <Route path="/privacypolicy" component={PrivacyPolicy} />
        <Route path="/termsandconditions" component={TermsAndConditions} />
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
