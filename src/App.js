import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';


import NavigationBar from './components/navigationBar.component';
import HomeView from './components/homeView.component';
import OrgView from './components/organisationsView.component';
import Signup from './components/signup.component';
import ResetPassword from './components/resetpassword.component';


function App() {
  const user = {
    auth: false,
    token: null
  }

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
