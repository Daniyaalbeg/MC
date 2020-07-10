import React, { useState, useRef } from 'react'
import { Accordion, Spinner } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { Tabs, Panel } from '@bumaga/tabs'
import { connect } from 'react-redux'
import { getUserInfo } from '../../Actions/userInfoActions'
import { getCnic } from '../../Actions/cnicActions';
import CnicAddNew from './cnicAddNew.component'
import EventItemCard from '../dashboard/eventItemCard.component'
import { TabCnic } from '../utilities/tabComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/pro-light-svg-icons'
import { faFilePlus, faSearch as faSearchDuotone, faExclamationTriangle} from '@fortawesome/pro-duotone-svg-icons';

import '../../css/cnic.css'
import getRandomColour from '../utilities/randomMCColour.component';

const MustBeLoggedIn = () => {
  const randomColour = getRandomColour()

  return (
    <>
    <Helmet htmlAttributes>
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

const CnicView = ({ dispatch, auth, userDataFetched, authLoading, verified, getLoading, getFetched, getHasError, getHasErrorMessage, cnicInfo }) => {
  const searchInputRef = useRef();

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

  const searchCnicChange = () => {
    if (searchInputRef.current.value !== "") {
      dispatch(getCnic(searchInputRef.current.value))
    }
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
      <form onSubmit={
        (e) => { e.preventDefault()
        searchCnicChange()
      }}>
        <div className="searchCnicContainer">
          <div className="searchCnicBox">
            <FontAwesomeIcon icon={faSearch} className="cnicSearchIcon" onClick={searchCnicChange} spin={getLoading}/>
            <input ref={searchInputRef} type="text" placeholder="CNIC number" className="cnicSearchInput" />
          </div>
          <button className="standardButton cnicSearchButton" onClick={searchCnicChange}> Search </button>
        </div>
      </form>
      <CnicResult getHasError={getHasError} getHasErrorMessage={getHasErrorMessage} cnicInfo={cnicInfo} />  
      </Panel>
      <Panel>
        <CnicAddNew />
      </Panel>  
      </div>
      </Tabs>
    </div>
    <div className="cnicFooter">
    <h6> Note </h6>
      <p> Once CNIC information has been added it cannot be edited or retrieved, for any changes please email support. </p>
    </div>
    </div>
  )
}

const CnicResult = (props) => {
  const { getHasError, getHasErrorMessage, cnicInfo } = props
  const [selectedEventId, setSelectedEventId] = useState("");


  if (getHasError) {
    return <ErrorMessage getHasErrorMessage={getHasErrorMessage} />
  } else if (cnicInfo !== null && Array.isArray(cnicInfo.connectedEvents) && cnicInfo.connectedEvents.length) {
    const listOfCnic = cnicInfo.connectedEvents.map((event) =>
        <EventItemCard isUser={false} handleClose={props.handleClose} event={event} key={event._id} open={event._id === selectedEventId}/>
      )
      const list = 
        <Accordion onSelect={setSelectedEventId} className="eventListCard">
            {listOfCnic}
        </Accordion>
      return list;
  } else {
    return null
  }
}

const ErrorMessage = (props) => {
  return (
    <h4 className='largerErrorMessage'> {props.getHasErrorMessage} </h4>
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