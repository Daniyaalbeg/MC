import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavigationBar from './components/navigationBar.component';
import HomeView from './components/homeView/homeView.component';
import OrgView from './components/organisationsView.component';
import Signup from './components/signup/signUp.component';
import ResetPassword from './components/resetPassword.component';
import ResettingPassword from './components/signup/resettingPassword.component';
import CreateRation from './components/signup/createRation.component';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Route path="/" exact component={HomeView}/>
      <Route path="/organisations" component={OrgView}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/reset" component={ResetPassword} />
      <Route path="/resetPassword/:id/:token" component={ResettingPassword} />
      <Route path="/createRation" component={CreateRation} />
    </Router>
  );
}

export default App;
