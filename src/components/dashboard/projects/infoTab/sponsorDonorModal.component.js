import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { API, rootURL, production } from '../../../../config'
import imagePlaceholder from '../../../../assets/Images/temp.jpg'
import LoadingSpinner from '../../../utilities/loadingSpinner.component';
import { getUserInfoBackground } from '../../../../Actions/userInfoActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/pro-solid-svg-icons'

const SponsorDonorModal = ({ project, setShowModal, showModal }) => {
  const [typingTimeout, setTypingTimeout] = useState(0)
  const [searchResults, setSearchResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedSponsorKeys, setSelectedSponsorKeys] = useState([])

  const onSearchChange = (event) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const text = event.target.value
    setTypingTimeout(setTimeout(() => {
      searchOrgName(text, setSearchResults, setLoading)
    }, 500))
  }

  return (
    <div className="addSponsorForm">
      <h3> Search for a Sponsor </h3>
      <div className="textInputSponsor">
        <input type='text' onChange={onSearchChange}/>
        <OrgSearchResultsDropDown project={project} orgSearchResults={searchResults} loading={loading} selectedSponsorKeys={selectedSponsorKeys} setSelectedSponsorKeys={setSelectedSponsorKeys} />
        <SelectedOrgs project={project} selectedSponsorKeys={selectedSponsorKeys} setSelectedSponsorKeys={setSelectedSponsorKeys} sponsorDict={searchResults} />
        <CurrentSponsorRequests project={project} setShowModal={setShowModal} />
      </div>
    </div>
  )
}

const CurrentSponsorRequests = ({ project, setShowModal }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  if (!project.sponsorRequests || project.sponsorRequests.length === 0) return null

  const requestStatus = (request) => {
    if (request.pending) return "Pending"
    if (!request.pending && request.accepted) return "Accepted"
    if (!request.accepted) return "Declined"
    return "Unknown"
  }

  return (
    <div className="sponsorRequestsContainer">
      <h3> Sponsor Requests </h3>
      <div className="sponsorRequestsCardContainer">
      {
        project.sponsorRequests.map((request) => {
          return (
            <div key={request._id} className="sponsorRequestCard">
              <img src={request.imageURL ? request.imageURL : imagePlaceholder} alt="Logo" />
              <p className="sponsorRequestName"> {request.requestedOrganisation.name} </p>
              <p className="sponsorRequestStatus" > Status: {requestStatus(request)} </p>
              <button onClick={() => {
                if (loading) return
                sendDeleteOrgSponsorRequest(dispatch, setLoading, null, request, setShowModal)
              }} className="standardButtonWithoutColour mcRedBG" style={{ fontSize: "small" }}>
              {
                loading === request._id ? <LoadingSpinner size="1x" style={{minHeight: "fit-content", padding: "0.3em 0.6em"}} /> : "Cancel Request"
              }
              </button>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

const SelectedOrgs = ({ selectedSponsorKeys, setSelectedSponsorKeys, sponsorDict, project }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (selectedSponsorKeys.length === 0) return null

  return (
    <>
    <div className="selectedSponorsContainer">
      {
        selectedSponsorKeys.map((key) => {
          return (
            <div className="selectedSponsor" key={key}>
              <FontAwesomeIcon icon={faTimesCircle} onClick={() => {
                const newArray = selectedSponsorKeys.filter((val) => { return val !== key })
                setSelectedSponsorKeys(newArray)
              }} />
              <img src={sponsorDict[key].imageURL ? sponsorDict[key].imageURL : imagePlaceholder} alt="Logo" />
              <p> {sponsorDict[key].name} </p>
            </div>
          )
        })
      }
    </div>
    <button className="standardButtonWithoutColour mcGreenBG" onClick={() => {
      sendOrgSponsorRequest(dispatch, project, setLoading, setSuccess, selectedSponsorKeys, sponsorDict)
    }}>
      {
        loading ? <LoadingSpinner size="1x" style={{minHeight: "fit-content", padding: "0.3em 0.6em"}} /> : "Send Request"
      }
    </button>
    {success &&
      <p className="successReply"> Your request has been sent. </p>
    }
    </>
  )
}

const OrgSearchResultsDropDown = ({ project, orgSearchResults, loading, selectedSponsorKeys, setSelectedSponsorKeys }) => {
  if (loading) return (
    <div className="orgSearchResultsContainer">
      <LoadingSpinner size="2x" style={{ minHeight: "50px" }} />
    </div>
  )

  if (!orgSearchResults || orgSearchResults.length === 0) return null

  return (
    <div className="orgSearchResultsContainer">
      {
        Object.keys(orgSearchResults).map((key) => {
          return (
            <div key={key} onClick={() => {
              if (selectedSponsorKeys.includes(key)) return
              if (checkSponsoredSingle(key, project)) return
              const newSelectedSponsorKeys = selectedSponsorKeys.concat(key)
              setSelectedSponsorKeys(newSelectedSponsorKeys)
            }}>
              <img src={orgSearchResults[key].imageURL ? orgSearchResults[key].imageURL : imagePlaceholder} alt="Logo" />
              <p> {orgSearchResults[key].name} </p>
            </div>
          )
        })
      }
    </div>
  )
}

const checkSponsoredSingle = (selected, project) => {
  if (!project.sponsorRequests) { project.sponsorRequests = [] }
  for (let i = 0; i < project.sponsorRequests.length; i++) {
    if (selected === project.sponsorRequests[i].requestedOrganisation._id) return true
  }
  return false
}

const checkSponsored = (selectedSponsors, project) => {
  if (!project.sponsorRequests) { project.sponsorRequests = [] }
  for (let i = 0; i < selectedSponsors.length; i++) {
    for (let j = 0; j < project.sponsorRequests.length; j++) {
      if (project.sponsorRequests[j].requestedOrganisation._id === selectedSponsors[i]) {
        return true
      }
    }
    if (!project.sponsors) { project.sponsors = [] }
    for (let j = 0; j < project.sponsors.length; j++) {
      if (project.sponsors[j]._id === selectedSponsors[i]) {
        return true
      }
    }
  }
  return false
}

const sendDeleteOrgSponsorRequest = (dispatch, setLoading, setSuccess, selectedRequest, setShowModal) => {
  setLoading(selectedRequest._id)

  axios({
    method: 'delete',
    url: rootURL(production)+API+'/project/deleteSponsorRequest/'+selectedRequest._id,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
    credentials: 'include',
  }).then((res) => {
    setLoading(false)
    // setShowModal(false)
    dispatch(getUserInfoBackground())
  })
  .catch((err) => {
    setLoading(false)
  })
}

const sendOrgSponsorRequest = (dispatch, project, setLoading, setSuccess, selectedSponsorKeys, sponsorDict) => {
  if (checkSponsored(selectedSponsorKeys, project)) return
  setLoading(true)
  axios({
    method: 'post',
    url: rootURL(production)+API+'/project/createSponsorRequest/'+project._id,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
    credentials: 'include',
    data: {
      selectedSponsors: selectedSponsorKeys
    }
  })
  .then((res) => {
    setLoading(false)
    setSuccess(true)
    dispatch(getUserInfoBackground())
    return
  })
  .catch((error) => {
    setLoading(false)
    setSuccess(false)
  });
}

const searchOrgName = (searchText, setSearchResults, setLoading) => {
  setLoading(true)
  axios({
    method: 'get',
    url: rootURL(production)+API+'/organisation/search',
    headers: {'Content-Type': 'application/json'},
    params: {
      search: searchText
    },
    withCredentials: true,
    credentials: 'include'
  })
  .then((res) => {
    setLoading(false)
    if (res.data && res.data.length !== 0) {
      const dict = {}
      res.data.forEach(element => {
        dict[element._id] = element
      });
      return setSearchResults(dict)
    }
    return setSearchResults(res.data)
  })
  .catch((error) => {
    setLoading(false)
  });
}

export default SponsorDonorModal