import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavigationBar from './components/navigationBar.component';
import HomeView from './components/homeView/homeView.component';
import OrgView from './components/organisationsView.component';
import SignUp from './components/signup/signUp.component';
import ResetPassword from './components/resetPassword.component';
import ResettingPassword from './components/signup/resettingPassword.component';
import EmailVerification from './components/signup/emailVerification.component'
import CreateRation from './components/signup/createRation.component';
import About from './components/about.component';
import Error404 from './components/404.component'

function App() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/" exact component={HomeView}/>
        <Route path="/organisations" component={OrgView}/>
        <Route path="/about" component={About} />
        <Route path="/signup" component={SignUp}/>
        <Route path="/reset" component={ResetPassword} />
        <Route path="/resetPassword/:id/:token" component={ResettingPassword} />
        <Route path="/verify/:token" component={EmailVerification} />
        <Route path="/createRation" component={CreateRation} />
        <Route component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
