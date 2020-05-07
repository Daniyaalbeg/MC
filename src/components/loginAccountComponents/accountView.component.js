import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Tab from 'react-bootstrap/Tab';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container'
import '../../css/accountView.css'

import ProfileInfoView from './profileInfoView.component';
import SupplierInfoView from './supplierInfoView.component';
import RationView from './rationView.component'
import { getUserInfo } from '../../Actions/userInfoActions';
import { Row, Col, Nav } from 'react-bootstrap';

const AccountView = ({dispatch, fetched, loading, token, userId, username, email, supplier, approved, verified, createdAt, hasErrors, error, props}) => {
  
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
                    <Nav.Link eventKey="supplierInfo" className="centreText"> Organisation </Nav.Link>
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
                <ProfileInfoView id={userId} token={token} username={username} email={email} approved={approved} createdAt={createdAt} verified={verified} />
              </Tab.Pane>
              <Tab.Pane eventKey="supplierInfo">
                <SupplierInfoView supplier={supplier} />
              </Tab.Pane>
              <Tab.Pane eventKey="rations">
                <RationView rations={supplier.rationEvents} handleClose={props.handleClose}/>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Tab.Container>
      )
    } else {
      return(
        <div className="loadingSpinner">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) 
    }
  }


  return (
    renderInfo()
  )
}

const MapStateToProps = (state, ownProps) => ({
  token: state.auth.token,
  fetched: state.userInfo.fetched,
  loading: state.userInfo.loading,
  userId: state.userInfo.userId,
  username: state.userInfo.username,
  email: state.userInfo.email,
  supplier: state.userInfo.supplier,
  approved: state.userInfo.approved,
  verified: state.userInfo.verified,
  createdAt: state.userInfo.createdAt,
  hasErrors: state.userInfo.hasErrors,
  error: state.userInfo.error,
  props: ownProps
})

export default connect(MapStateToProps)(AccountView);