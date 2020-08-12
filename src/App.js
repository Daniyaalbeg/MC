import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import  ScrollToTop from './components/utilities/scrollToTop.component'

import { checkCookie } from './Actions/authActions';
import { Spinner } from 'react-bootstrap';
// import mcSpinner from './assets/svg/mcWhole3.svg';

import './css/about.css';
import './css/app.css';
import './css/cnic.css';
import './css/dashboard.css';
import './css/eventInfoView.css';
import './css/eventlistView.css';
import './css/eventView.css';
import './css/form.css';
import './css/general.css';
import './css/homeView.css';
import './css/index.css';
import './css/mainMap.css';
import './css/map.css';
import './css/misc.css';
import './css/navbar.css';
import './css/organisationsView.css';
import './css/organisationInfoView.css';
import './css/profileInfoView.css';
import './css/signupUser.css';
import './css/organisationDashInfoView.css';
import './css/groupInfoView.css';
import './css/groupMainView.css';
import './css/inspireView.css'
import './css/projectView.css'

import NavigationBar from './components/navigationBar.component';
import HomeView from './components/homeView/homeView.component';
import GeneralError from './components/errors/generalError.component';
import Error404 from './components/404.component';
import { faAmazonPay } from '@fortawesome/free-brands-svg-icons';

const MainMap = lazy(() => import('./components/map/mainMap.component')); 
const Dashboard = lazy(() => import('./components/dashboard/dashboardContainer.component')); 
const OrgView = lazy(() => import('./components/organisations/organisationsView.component'));
const GroupView = lazy(() => import('./components/groups/groupView.component'));
const CreateProject = lazy(() => import('./components/signup/createProject.component'));
const OrgViewInfo = lazy(() => import('./components/organisations/organisationInfoView.component'));
const SignUpOrg = lazy(() => import('./components/signup/signUpOrg.component'));
const EditOrg = lazy(() => import('./components/update/updateOrganisation.component'));
const SignupUser = lazy(() => import('./components/signup/signupUser.component'));
const UpdateProfile = lazy(() => import('./components/update/updateProfile.component'));
const ResetPassword = lazy(() => import('./components/reset/resetPassword.component'));
const ResettingPassword = lazy(() => import('./components/reset/resettingPassword.component'));
const EmailVerification = lazy(() => import('./components/signup/emailVerification.component'));
const CreateEvent = lazy(() => import('./components/signup/createEvent.component'));
const UpdateEvent = lazy(() => import('./components/update/updateEvent.component'));
const AboutView = lazy(() => import('./components/about.component'));
const InspireView = lazy(() => import('./components/inspire/inspireView.component'));
const CnicView = lazy(() => import('./components/cnic/cnicView.component'));
const PrivacyPolicy = lazy(() => import('./components/privacyPolicy.component'));
const TermsAndConditions = lazy(() => import('./components/termsAndConditions'));
const CreateGroup = lazy(() => import('./components/signup/createGroup.component'));


function App({ dispatch, checkedCookie }) {
  
  useEffect(() => {
    if (!checkedCookie) {
      dispatch(checkCookie())
    }
  })

  return (
    <Router>
      <GeneralError>
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
          <Route path="/groups" component={GroupView}/>
          <Route path="/about" component={AboutView} />
          <Route path={["/inspire/:id", "/inspire"]} component={InspireView} />
          <Route path="/signup" component={SignupUser}/>
          <Route path="/updateProfile" component={UpdateProfile}/>
          <Route path="/signupOrg" component={SignUpOrg}/>
          <Route path="/updateOrg/:id" component={EditOrg}/>
          <Route path="/createProject/:orgID" component={CreateProject}/>
          <Route path="/reset" component={ResetPassword} />
          <Route path="/resetPassword/:id/:token" component={ResettingPassword} />
          <Route path="/verify/:token" component={EmailVerification} />
          <Route path="/createEvent/:orgID" component={CreateEvent} />
          <Route path="/updateEvent/:orgID/:id" component={UpdateEvent} />
          <Route path="/createGroup" component={CreateGroup} />
          <Route path="/cnic" component={CnicView} />
          <Route path="/privacypolicy" component={PrivacyPolicy} />
          <Route path="/termsandconditions" component={TermsAndConditions} />
          <Route component={Error404} />
        </Switch>
      </Suspense>
    </GeneralError>
    </Router>
  );
}

const MapStateToProps = (state) => ({
  checkedCookie: state.auth.checkedCookie,
})

export default connect(MapStateToProps)(App);
