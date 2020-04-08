import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const organisationsView = () => {
  return (
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
      <Tab eventKey="home" title="Home">
        <p>asdasdasd</p>
      </Tab>
      <Tab eventKey="profile" title="Profile">
      <p>asdasdasd</p>
      </Tab>
      <Tab eventKey="contact" title="Contact">
      <p>asdasdasd</p>
      </Tab>
    </Tabs>
  );
}

export default organisationsView;