import React, { useState, useRef } from 'react'
import { Card, Button, Tab, Nav, Row, Accordion, Spinner } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserInfo } from '../../Actions/userInfoActions'
import { getCnic } from '../../Actions/cnicActions';
import CnicAddNew from './cnicAddNew.component'
import EventItemCard from '../loginAccountComponents/eventItemCard.component'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/pro-light-svg-icons'
import { faFilePlus, faSearch as faSearchDuotone} from '@fortawesome/pro-duotone-svg-icons';

import '../../css/cnic.css'

const MustBeLoggedIn = () => {
  return (
    <div className="cnicMustBeLoggedIn">
      <h4 className="cnicLoggedInHeading"> Must be logged in or verified to view </h4>
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
    <Tab.Container defaultActiveKey="search">
      <Card.Header>
      <Nav variant="pills" className="flex-column">
        <Row className="tabRow">
          <Nav.Item>
            <Nav.Link eventKey="search">
              <FontAwesomeIcon icon={faSearchDuotone} style={{ marginRight: '8px' }} />
              Search CNIC
              </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="add">
              <FontAwesomeIcon icon={faFilePlus} style={{ marginRight: '8px' }} />
              Add CNIC
            </Nav.Link>
          </Nav.Item>
        </Row>
        </Nav>
      </Card.Header>
      <Card.Body>

        <Tab.Content>
          <Tab.Pane eventKey="search">
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
          </Tab.Pane>
          <Tab.Pane eventKey="add">
            <CnicAddNew />
          </Tab.Pane>
        </Tab.Content>

      </Card.Body>
      <Card.Footer className="text-muted">
        <h5> Note </h5>
        <p> Once CNIC information has been added it cannot be edit or retrieved, for any changes please email support. </p>
      </Card.Footer>
      </Tab.Container>
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