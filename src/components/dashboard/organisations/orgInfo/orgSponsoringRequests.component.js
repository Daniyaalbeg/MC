import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { API, rootURL, production } from '../../../../config'
import axios from 'axios'
import { getUserInfoBackground } from '../../../../Actions/userInfoActions'

import LoadingSpinner from '../../../utilities/loadingSpinner.component';
import imagePlaceholder from '../../../../assets/Images/temp.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const OrgSponsoringRequests = ({ org, sponsorRequestsDict }) => {
  if (!org.sponsorRequests || org.sponsorRequests.length === 0) {
    return null
  }

  const requestStatus = (request) => {
    if (request.pending) return "Pending"
    if (!request.pending && request.accepted) return "Accepted"
    if (!request.accepted) return "Declined"
    return "Unknown"
  }

  return (
    <div className="orgCard orgCardF">
      <p> Sponsor Project Requests </p>
      {
        org.sponsorRequests.map((requestID) => {
          const request = sponsorRequestsDict[requestID]
          return (
            <div key={request._id} className="sponsorRequestCard">
              <img src={(request.imageURL && request.imageURL.length !== 0) ? request.imageURL[0] : imagePlaceholder} alt="Logo" />
              <p className="sponsorRequestName"> {request.requestingProject.name} </p>
              <p className="sponsorRequestStatus" > Status: {requestStatus(request)} </p>
              <OrgSponsoringRequestButtons request={request} />
            </div>
          )
        })
      }
    </div>
  )
}

const OrgSponsoringRequestButtons = ({ request }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  if (!request.pending) {
    return null
  }

  if (loading) return (
    <div className="standardButtonWithoutColour mcBlueBG">
      <LoadingSpinner size="1x" style={{minHeight: "fit-content", padding: "0.3em 0.6em"}} />
    </div>
  )

  return (
    <div className="sponsorRequestCardButtonsRow">
      <button onClick={() => {
        if (loading) return
        sendSponsorRequest(dispatch, request, setLoading, null, 'post') //Accept request
      }} className="standardButtonWithoutColour mcGreenBG" style={{ fontSize: "small" }}>
      {
        loading ? <LoadingSpinner size="1x" style={{minHeight: "fit-content"}} /> : <FontAwesomeIcon icon={faCheck} />
      }
      </button>
      <button onClick={() => {
        if (loading) return
        sendSponsorRequest(dispatch, request, setLoading, null, 'delete') //decline request
      }} className="standardButtonWithoutColour mcRedBG" style={{ fontSize: "small" }}>
      {
        loading ? <LoadingSpinner size="1x" style={{minHeight: "fit-content", padding: "0.3em 0.6em"}} /> : <FontAwesomeIcon icon={faTimes} />
      }
      </button>
    </div>
  )
}

const sendSponsorRequest = (dispatch, request, setLoading, setSuccess, method) => {
  setLoading(true)
  axios({
    method: method,
    url: rootURL(production)+API+'/organisation/sponsorRequest/'+request._id,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
    credentials: 'include',
  })
  .then((res) => {
    setLoading(false)
    // setSuccess(true)
    dispatch(getUserInfoBackground())
    return
  })
  .catch((error) => {
    setLoading(false)
    // setSuccess(false)
  });
}

const MapStateToProps = (state) => ({
  sponsorRequestsDict: state.userInfo.sponsorRequests,
})

export default connect(MapStateToProps)(OrgSponsoringRequests)