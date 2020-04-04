import React, { Component } from 'react';
import MapView from './homeView/mapView.component';
import RationListView from './homeView/rationListView.component';
import RationInfoView from './homeView/rationInfoView.component';
import '../css/homeView.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class HomeView extends Component {
  render() {
    return (
      <div>
        <Container fluid>
          <Row className="top" noGutters="false">
            <Col xs={8}> <MapView /> </Col>
            <Col> <RationListView /> </Col>
          </Row>
          <Row className="bottom">
            <Col> <RationInfoView className="rationInfoView"/> </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomeView;