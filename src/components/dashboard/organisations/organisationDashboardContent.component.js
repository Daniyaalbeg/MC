import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import SingleOrganisationInfo from './singleOrganisationInfo.component';
import OrganisationCard from './organisationCard.component';

const OrganisationDashboardContent = ({ orgs }) => {
  const [selectedOrg, setSelectedOrg] = useState(null)

  if (selectedOrg) {
    return (
      <SingleOrganisationInfo org={selectedOrg} setSelectedOrg={setSelectedOrg} />
    )
  } else {
    return <OrganisationCards orgs={orgs} setSelectedOrg={setSelectedOrg} />
  }
}

const OrganisationCards = ({ orgs, setSelectedOrg }) => {
  return (
    <>
    <div className="createNewOrganisationButton">
      <Link to="signupOrg"><button className="standardButtonWithoutColour mcYellowBG"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}} /> Create Organisation </button></Link>
    </div>
    <div className="cardsDashContainer">
      {
        orgs.map((org) => {
          return <OrganisationCard org={org} key={org._id} setSelectedOrg={setSelectedOrg} orgBGColour="orgCardYellow" orgTextColour="orgTextBlack" />
        })
      }
    </div>
    </>
  )
}

export default OrganisationDashboardContent