import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { selectOrgDash } from '../../../Actions/orgActions';

import OrgProfileInfo from './orgInfo/orgProfileInfo.component';
import OrgLogo from './orgInfo/orgLogo.component';
import OrgBank from './orgInfo/orgBank.component';
import OrgSocial from './orgInfo/orgSocial.component';
import OrgSponsoring from './orgInfo/orgSponsoring.components';
import OrgSponsoringRequests from './orgInfo/orgSponsoringRequests.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/pro-duotone-svg-icons';



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
        <OrgProfileInfo org={org} />
        <OrgLogo org={org} />
        <OrgBank org={org} />
        <OrgSocial org={org} />
        <OrgSponsoring org={org} />
        <OrgSponsoringRequests org={org} />
      </div>


      <p className="profileTitle"> Approved </p>
      <p className="profileText"> {org.approved ? "Your organisation has been approved" : "Your organisation has not been approved"} </p>
    </>
  )
}

export default SingleOrganisationInfo