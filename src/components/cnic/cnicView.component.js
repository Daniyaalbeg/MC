import React, { useState, useRef } from 'react'
import { Card, Row, Accordion, Spinner } from 'react-bootstrap'
import { Tabs, Panel } from '@bumaga/tabs'
import { connect } from 'react-redux'
import { getUserInfo } from '../../Actions/userInfoActions'
import { getCnic } from '../../Actions/cnicActions';
import CnicAddNew from './cnicAddNew.component'
import EventItemCard from '../dashboard/eventItemCard.component'
import { Tab } from '../utilities/tabComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/pro-light-svg-icons'
import { faFilePlus, faSearch as faSearchDuotone} from '@fortawesome/pro-duotone-svg-icons';

import '../../css/cnic.css'

const MustBeLoggedIn = () => {
  return (
    <div className="cnicMustBeLoggedIn">
      <h4 className="cnicLoggedInHeading"> Must be logged in and verified to view </h4>
    </div>
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
    <>
    <h1 className="cnicHeading"> Computerized National Identity Card </h1>
    <Card className="cnicCard">
    <Tabs>
      <Card.Header>
        <Row className="tabRow">
          <Tab>
            <FontAwesomeIcon icon={faSearchDuotone} style={{ marginRight: '8px' }} className="" />
            Search CNIC
          </Tab>
          <Tab>
            <FontAwesomeIcon icon={faFilePlus} style={{ marginRight: '8px' }} className="" />
            Add CNIC
          </Tab>
        </Row>
      </Card.Header>
      <Card.Body>

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

      </Card.Body>
      <Card.Footer className="text-muted">
        <h5> Note </h5>
        <p> Once CNIC information has been added it cannot be edited or retrieved, for any changes please email support. </p>
      </Card.Footer>
      </Tabs>
    </Card>
    </>
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
  verified: state.userInfo.verified,
  getLoading: state.cnicInfo.getLoading,
  getFetched: state.cnicInfo.getFetched,
  getHasError: state.cnicInfo.getHasError,
  getHasErrorMessage: state.cnicInfo.getHasErrorMessage,
  cnicInfo: state.cnicInfo.cnicInfo
})

export default connect(MapStateToProps)(CnicView)