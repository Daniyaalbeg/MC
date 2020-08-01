import React, { useRef } from 'react'
import { Spinner } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { Tabs, Panel } from '@bumaga/tabs'
import { connect } from 'react-redux'
import { getUserInfo } from '../../Actions/userInfoActions'
import CnicAddNew from './cnicAddNew.component'
import { TabCnic } from '../utilities/tabComponent';
import CnicSearch from './cnicSearch.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePlus, faSearch as faSearchDuotone, faExclamationTriangle} from '@fortawesome/pro-duotone-svg-icons';

import getRandomColour from '../utilities/randomMCColour.component';

const MustBeLoggedIn = () => {
  const randomColour = getRandomColour()

  return (
    <>
    <Helmet>
      <html lang="en" />
      <meta name="description" content="Search or add CNIC numbers to ration distributions" />
    </Helmet>
    <div className="cnicMustBeLoggedIn">
      <p className="cnicLoggedInHeading" style={{backgroundColor: randomColour}}>
        <FontAwesomeIcon icon={faExclamationTriangle} className="cnicExclamationIcon" />
        Must be logged in and verified to view
      </p>
    </div>
    </>
  )
}

const CnicView = ({ dispatch, auth, userDataFetched, authLoading, verified }) => {
  if (auth && !userDataFetched) {
    dispatch(getUserInfo())
  }

  if (auth && authLoading) {
    return (
      <div className="cnicSpinner">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    )
  }

  if (!auth || !verified) {
    return <MustBeLoggedIn />
  }

  return (
    <div className="cnicContainer">
    <h1 className="cnicHeading"> Computerized National Identity Card </h1>
    <div className="cnicCard">
      <Tabs>
      <div className="cnicHeader">
        <TabCnic addClass="cnicTab">
          <FontAwesomeIcon icon={faSearchDuotone} style={{ marginRight: '8px' }} />
          Search CNIC
        </TabCnic>
        <TabCnic addClass="cnicTab">
          <FontAwesomeIcon icon={faFilePlus} style={{ marginRight: '8px' }} />
          Add CNIC
        </TabCnic>
      </div>
      <div className="cnicBody">
      <Panel>
        <CnicSearch />
      </Panel>
      <Panel>
        <CnicAddNew />
      </Panel>  
      </div>
      </Tabs>
    </div>
    <div className="cnicFooter">
    <h6> Note </h6>
      <p> Once Computerised National identity Card / CNIC information has been added it cannot be edited or retrieved, for any changes please email support. </p>
    </div>
    </div>
  )
}

const MapStateToProps = (state) => ({
  auth: state.auth.auth,
  authLoading: state.userInfo.loading,
  userDataFetched: state.userInfo.fetched,
  verified: state.userInfo.user.verified,
  getLoading: state.cnicInfo.getLoading,
  getFetched: state.cnicInfo.getFetched,
  getHasError: state.cnicInfo.getHasError,
  getHasErrorMessage: state.cnicInfo.getHasErrorMessage,
  cnicInfo: state.cnicInfo.cnicInfo
})

export default connect(MapStateToProps)(CnicView)