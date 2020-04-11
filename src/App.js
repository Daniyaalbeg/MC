import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavigationBar from './components/navigationBar.component';
import HomeView from './components/homeView/homeView.component';
import OrgView from './components/organisationsView.component';
import Signup from './components/signup/signUp.component';
import ResetPassword from './components/resetpassword.component';


function App() {
  return (
    <Router>
      <NavigationBar />
      <Route path="/" exact component={HomeView}/>
      <Route path="/organisations" component={OrgView}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/resetPassword" component={ResetPassword} />
    </Router>
  );
}

export default App;
