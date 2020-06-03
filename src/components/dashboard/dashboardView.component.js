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
import { faHomeLg, faUserCircle, faProjectDiagram, faUsers, faBox, faBoxOpen, faBoxFull, faSitemap, faPersonSign, faHandsHelping,  } from '@fortawesome/pro-solid-svg-icons'
import { faUser, faBell, faSignOut } from '@fortawesome/pro-duotone-svg-icons'

import { logout } from '../../Actions/authActions'

const DashboardView = ({dispatch, fetched, loading, user, hasErrors, error, props}) => {
  
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
            <p> {user.username} </p>
          </div>
          <div className="dbLeftBar">
            <Tab>
              <FontAwesomeIcon icon={faHomeLg} />
              <p> Home </p>
            </Tab>
            <Tab>
            <FontAwesomeIcon icon={faUserCircle} />
              <p> Profile </p> 
            </Tab>
            <Tab>
              <FontAwesomeIcon icon={faSitemap} />
              <p> Organisation </p>
            </Tab>
            <Tab>
              <FontAwesomeIcon icon={faProjectDiagram} />
              <p> Projects </p>
            </Tab>
            <Tab>
              <FontAwesomeIcon icon={faUsers} />
              <p> Groups </p>
            </Tab>
            <Tab>
              <FontAwesomeIcon icon={faBox} />
              <p> Distributions </p>
            </Tab>
            <Tab>
              <FontAwesomeIcon icon={faHandsHelping} />
              <p> Volunteer </p>
            </Tab>
            {/* <button className="standardButton logoutButton" onClick={() => { dispatch(logout()) }}> logout </button> */}
          </div>
          <div className="dbBody">
            <Panel>
              <p> Notifications here </p>
            </Panel>
            <Panel>
              <ProfileInfoView user={user} />
            </Panel>
            <Panel>
              <SupplierInfoView supplier={user.supplier} />
            </Panel>
            <Panel>
              <p> Coming Soon </p>
            </Panel>
            <Panel>
            <p> Coming Soon </p>
            </Panel>
            <Panel>
              <EventView supplier={user.supplier} />
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
  fetched: state.userInfo.fetched,
  loading: state.userInfo.loading,
  user: state.userInfo.user,
  hasErrors: state.userInfo.hasErrors,
  error: state.userInfo.error,
  props: ownProps
})

export default connect(MapStateToProps)(DashboardView);