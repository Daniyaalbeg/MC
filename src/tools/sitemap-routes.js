import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function Routes() {
  return (
    <Router>

        <Switch>
          <Route path="/" />
          <Route path="/dashboard" />
          <Route path="/map" />
          <Route path="/organisations/:id" />
          <Route path="/organisations" />
          <Route path="/groups" />
          <Route path="/about"  />
          <Route path="/signup" />
          <Route path="/signupOrg" />
          <Route path="/updateOrg/:id" />
          <Route path="/reset"  />
          <Route path="/resetPassword/:id/:token"  />
          <Route path="/verify/:token"  />
          <Route path="/createEvent"  />
          <Route path="/updateEvent/:id"  />
          <Route path="/createGroup"  />
          <Route path="/cnic"  />
          <Route path="/privacypolicy"  />
          <Route path="/termsandconditions"  />
        </Switch>
    </Router>
  );
}

export default Routes;
