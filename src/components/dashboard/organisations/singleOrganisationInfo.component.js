import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { API, rootURL, production } from '../../../config'
import axios from 'axios'
import { getUserInfoBackground } from '../../../Actions/userInfoActions'
import { selectOrgDash } from '../../../Actions/orgActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faCheck, faTimes, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/pro-duotone-svg-icons';
import { faGlobe } from '@fortawesome/pro-solid-svg-icons';

import CheckOldOrNewAddress from '../../sharedComponents/address.component';
import MoneyNumberDetails from '../../sharedComponents/numberMoneyDetails.component';
import BankingDetails from '../../sharedComponents/bankingDetails.component';
import SocialMediaIcons from '../../sharedComponents/socialMediaIcons.component';
import WhichLogo from '../../sharedComponents/whichLogo.component';
import { WhatCategories } from '../../iconController/iconCategories.component'
import LoadingSpinner from '../../utilities/loadingSpinner.component';

import imagePlaceholder from '../../../assets/Images/temp.jpg';

const OrgInfo = ({ org }) => {
  return (
    <div className=" orgCard orgCardA">
      <p className="orgTitle"> Name </p>
      <p className="orgText"> {org.name} </p>
      <p className="orgTitle"> Description </p>
      <p className="orgText"> {org.description} </p>
      <p className="orgTitle"> Address </p>
      <CheckOldOrNewAddress address={org.address} />

      <p className="orgTitle"> Point of Contact </p>
      <p className="orgText"> {org.contactName} </p>

      <p className="orgTitle"> Contact Number </p>
      <p className="orgText"> {org.contactNumber} </p>

      {org.contactInfo &&
        <>
        <p className="orgTitle"> Other Info </p>
        <p className="orgText"> {org.contactInfo} </p>
        </>
      }

      <p className="orgTitle"> Type of Work </p>
      <div className="orgInfoIcons">
        <WhatCategories types={org.areaOfWork} />
      </div>

    </div>
  )
}

const OrgLogo = ({ org }) => {
  return (
    <div className=" orgCard orgCardB">
      <p className="orgTitle"> Logo </p>
      <img src={org.imageURL ? org.imageURL : imagePlaceholder} alt=""/>
    </div>
  )
}

const OrgBank = ({ org }) => {
  return (
    <div className="orgCard orgCardC">
      <BankingDetails bankingDetails={org.bankingDetails} />
      <MoneyNumberDetails name="EasyPaisa" number={org.bankingDetails.easyPaisa} />
      <MoneyNumberDetails name="JazzCash" number={org.bankingDetails.jazzCash} />
    </div>
  )
}

const OrgSocial = ({ org }) => {
  return (
    <div className="orgCard orgCardD">
      {org.websiteURL && (
        <>
        <p className="orgTitle"> Website </p>
        <a href={org.websiteURL} key={org.websiteURL} target="_blank" rel="noopener noreferrer" className="iconSpecific websiteIcon"> <FontAwesomeIcon icon={faGlobe}/></a>
        </>
      )
      }
      <SocialMediaIcons org={org} />
      <WhichLogo icon={org.facebookURL} />
      <WhichLogo icon={org.twitterURL} />
      <WhichLogo icon={org.instagramURL} />
    </div>
  )
}

const OrgSponsoring = ({ org }) => {
  if (!org.sponsoring || org.sponsoring.length === 0) {
    return (
      <div className="orgCard orgCardE">
        <p style={{marginBottom: "0px"}}> You are not sponsoring any projects. </p>
      </div>
    )
  }

  return (
    <div className="orgCard orgCardE">
      <p> Projects you sponsor </p>
      {
        org.sponsoring.map((sponsor) => {
          return (
            <div key={sponsor._id} className="sponsorRequestCard">
              <img src={(sponsor.imageURL && sponsor.imageURL.length !== 0) ? sponsor.imageURL[0] : imagePlaceholder} alt="Logo" />
              <p className="sponsorRequestName"> {sponsor.name} </p>
              <Link to={`/projects/${sponsor.sponsorID}`}>
                <FontAwesomeIcon icon={faExternalLinkSquareAlt} size="2x" />
              </Link>
            </div>
          )
        })
      }
    </div>
  )

}

const OrgSponsoringRequsts = ({ org }) => {
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
        org.sponsorRequests.map((request) => {
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

const SingleOrganisationInfo = ({ org }) => {
  const dispatch = useDispatch()

  return (
    <>
      <div className="headerButtonsContainer">
        <button className="standardButtonWithoutColour mcYellowBG mcBlack" onClick={() => dispatch(selectOrgDash(null))}> <FontAwesomeIcon icon={faChevronCircleLeft} style={{textAlign: 'left', marginRight: "0.3em"}}/> Back </button>
        <Link to={"/updateOrg/" + org._id} className="supplierEditButton">
          <button className="standardButtonWithoutColour editIconVersion mcYellowBG mcBlack">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </Link>
      </div>

      <div className="organisationDashCardContainer">
        <OrgInfo org={org} />
        <OrgLogo org={org} />
        <OrgBank org={org} />
        <OrgSocial org={org} />
        <OrgSponsoring org={org} />
        <OrgSponsoringRequsts org={org} />
      </div>


      <p className="profileTitle"> Approved </p>
      <p className="profileText"> {org.approved ? "Your organisation has been approved" : "Your organisation has not been approved"} </p>
    </>
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

export default SingleOrganisationInfo