import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabContent from 'react-bootstrap/TabContent'
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container'
import '../../css/accountView.css'

import ProfileInfoView from './profileInfoView.component';
import SupplierInfoView from './supplierInfoView.component';
import RationView from './rationView.component'
import { getUserInfo } from '../../Actions/userInfoActions';
import { Row, Col, Nav } from 'react-bootstrap';

const AccountView = ({dispatch, fetched, loading, username, email, supplier, approved, createdAt, hasErrors, error}) => {
  
  useEffect(() => {
    if (!fetched) { dispatch(getUserInfo()) }
  }, [dispatch])

  const renderInfo = () => {
    if (hasErrors) return (<h1> Error occured, cannot get user info. Please accept our humblest apologies</h1>);
    if (!loading && fetched) { 
      return (
        <Tab.Container defaultActiveKey="userInfo">
          <Nav variant="pills" className="flex-column">
            <Container>
              <Row>
                <Col>
                  <Nav.Item>
                    <Nav.Link eventKey="userInfo" className="centreText"> User Info </Nav.Link>
                  </Nav.Item>
                  </Col>
                  <Col>
                  <Nav.Item>
                    <Nav.Link eventKey="supplierInfo" className="centreText"> {supplier.type + " Info"} </Nav.Link>
                  </Nav.Item>
                  </Col>
                  <Col>
                  <Nav.Item>
                    <Nav.Link eventKey="rations" className="centreText"> Ration Info </Nav.Link>
                  </Nav.Item>
                </Col>
              </Row>
            </Container>
          </Nav>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="userInfo">
                <ProfileInfoView username={username} email={email} approved={approved} createdAt={createdAt} />
              </Tab.Pane>
              <Tab.Pane eventKey="supplierInfo">
                <SupplierInfoView supplier={supplier} />
              </Tab.Pane>
              <Tab.Pane eventKey="rations">
                <RationView rations={supplier.rationEvents} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Tab.Container>
      )
    } else {
      return(
        <Spinner animation="border" role="status" className="loadingSpinner, red">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) 
    }
  }


  return (
    renderInfo()
  )
}

const MapStateToProps = state => ({
  fetched: state.userInfo.fetched,
  loading: state.userInfo.loading,
  username: state.userInfo.username,
  email: state.userInfo.email,
  supplier: state.userInfo.supplier,
  approved: state.userInfo.approved,
  createdAt: state.userInfo.createdAt,
  hasErrors: state.userInfo.hasErrors,
  error: state.userInfo.error
})

export default connect(MapStateToProps)(AccountView);