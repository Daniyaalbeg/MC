import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import  ScrollToTop from './components/utilities/scrollToTop.component'

import { checkCookie } from './Actions/authActions';
import { Spinner } from 'react-bootstrap';
// import mcSpinner from './assets/svg/mcWhole3.svg';

import './css/app.css'
import './css/general.css'

import NavigationBar from './components/navigationBar.component';
import HomeView from './components/homeView/homeView.component'
import Error404 from './components/404.component';

const MainMap = lazy(() => import('./components/map/mainMap.component')); 
const Dashboard = lazy(() => import('./components/dashboard/dashboardContainer.component')); 
const OrgView = lazy(() => import('./components/organisations/organisationsView.component'));
const OrgViewInfo = lazy(() => import('./components/organisations/organisationInfoView.component'));
const SignUpOrg = lazy(() => import('./components/signup/signUpOrg.component'));
const SignupUser = lazy(() => import('./components/signup/signupUser.component'));
const ResetPassword = lazy(() => import('./components/reset/resetPassword.component'));
const ResettingPassword = lazy(() => import('./components/reset/resettingPassword.component'));
const EmailVerification = lazy(() => import('./components/signup/emailVerification.component'));
const CreateEvent = lazy(() => import('./components/signup/createEvent.component'));
const UpdateEvent = lazy(() => import('./components/update/updateEvent.component'));
const About = lazy(() => import('./components/about.component'));
const CnicView = lazy(() => import('./components/cnic/cnicView.component'));
const PrivacyPolicy = lazy(() => import('./components/privacyPolicy.component'));
const TermsAndConditions = lazy(() => import('./components/termsAndConditions'));


function App({ dispatch, checkedCookie }) {
  
  useEffect(() => {
    if (!checkedCookie) {
      dispatch(checkCookie())
    }
  })

  return (
    <Router>
      <ScrollToTop />
      <NavigationBar />
      <Suspense fallback={
        <div className="spinnerThing">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
      }>
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
      </Suspense>
    </Router>
  );
}

const MapStateToProps = (state) => ({
  checkedCookie: state.auth.checkedCookie,
})

export default connect(MapStateToProps)(App);
