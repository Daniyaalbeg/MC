import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Tabs, Panel } from '@bumaga/tabs'
import { Spinner, Container} from 'react-bootstrap';
//css for this was moved to dashboard.css

import ProfileInfoView from './profileInfoView.component';
import SupplierInfoView from './supplierInfoView.component';
import EventView from './eventView.component'
import Footer from '../homeView/mainFooter.component'
import { getUserInfo } from '../../Actions/userInfoActions';
import { Nav } from 'react-bootstrap';
import { Tab } from '../utilities/tabComponent';
import imagePlaceholder from '../../assets/Images/temp.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBell, faSignOut } from '@fortawesome/pro-duotone-svg-icons'

import { logout } from '../../Actions/authActions'

const DashboardView = ({dispatch, fetched, loading, token, userId, username, email, supplier, approved, verified, createdAt, hasErrors, error, props}) => {
  
  useEffect(() => {
    if (!fetched) { dispatch(getUserInfo()) }
  })

  const renderInfo = () => {
    if (hasErrors) return (<h1> Error occured, cannot get user info. Please accept our humblest apologies</h1>);
    
    if (!loading && fetched) { 
      return (
        <div className="dbLayout">
          <Tabs>
          <div className="dbHeader">
            <button>
              <div className="dbHeaderIcon dbIconBg">
                <FontAwesomeIcon icon={faBell} className="dbFaBell dbIconFont" />
              </div>
            </button>
            <button onClick={() => { dispatch(logout()) }}>
              <div className="dbHeaderIcon dbIconBg">
                <FontAwesomeIcon icon={faSignOut} className="dgFaSignOut dbIconFont" />
              </div>
            </button>
          </div>
          <div className="dbTopLeft">
            <img src={imagePlaceholder} alt="" className="dbUserImage"/>
            <p> {username} </p>
          </div>
          <div className="dbLeftBar">
            <Tab>
              <p> Home </p>
            </Tab>
            <Tab>
              {/* <FontAwesomeIcon icon={faUser} /> */}
              <p> Profile </p> 
            </Tab>
            <Tab>
              <p> Organisation </p>
            </Tab>
            <Tab>
              <p> Projects </p>
            </Tab>
            <Tab>
              <p> Groups </p>
            </Tab>
            <Tab>
              <p> Distributions </p>
            </Tab>
            <Tab>
              <p> Volunteer </p>
            </Tab>
            {/* <button className="standardButton logoutButton" onClick={() => { dispatch(logout()) }}> logout </button> */}
          </div>
          <div className="dbBody">
            <Panel>
              <p> Notifications here </p>
            </Panel>
            <Panel>
              <ProfileInfoView id={userId} token={token} username={username} email={email} approved={approved} createdAt={createdAt} verified={verified} />
            </Panel>
            <Panel>
              <SupplierInfoView supplier={supplier} />
            </Panel>
            <Panel>
              <p> Coming Soon </p>
            </Panel>
            <Panel>
            <p> Coming Soon </p>
            </Panel>
            <Panel>
              <EventView supplier={supplier} />
            </Panel>
            <Panel>
            <p> Coming Soon </p>
            </Panel>
          </div>
          <div className="dbFooter">
            <Footer />
          </div>
          </Tabs>
        </div>
      )
    }
    
    if (!loading && fetched) { 
      return (
        <Tabs>
          <button onClick={() => { dispatch(logout()) }}> logout </button>
          <Nav variant="pills" className="flex-column">
            <Container>
              <div className="accountTabHeaders">
                <Tab>
                  User Info
                </Tab>
                <Tab>
                  Organisation
                </Tab>
                <Tab>
                  Ration Info
                </Tab>
              </div>
            </Container>
          </Nav>
          <Panel className="accountViewPanel">
            <ProfileInfoView id={userId} token={token} username={username} email={email} approved={approved} createdAt={createdAt} verified={verified} />
          </Panel>
          <Panel className="accountViewPanel">
            <SupplierInfoView supplier={supplier} />
          </Panel>
          <Panel className="accountViewPanel">
            <EventView supplier={supplier} />
          </Panel>
        </Tabs>
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

export default connect(MapStateToProps)(DashboardView);