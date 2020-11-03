import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import SingleOrganisationInfo from './singleOrganisationInfo.component';
import OrganisationCard from './organisationCard.component';

import { selectOrgDash } from '../../../Actions/orgActions';

const OrganisationDashboardContent = ({ orgs, selectedOrg }) => {

  if (selectedOrg) {
    return (
      <SingleOrganisationInfo org={selectedOrg} />
    )
  } else {
    return <OrganisationCards orgs={orgs} />
  }
}

const OrganisationCards = ({ orgs }) => {
  const dispatch = useDispatch()

  return (
    <>
    <div className="createNewOrganisationButton">
      <Link to="signupOrg"><button className="standardButtonWithoutColour mcYellowBG"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}} /> Create Organisation </button></Link>
    </div>
    <div className="cardsDashContainer">
      {
        orgs.map((org) => {
          return <OrganisationCard org={org} key={org._id} setSelectedOrg={(org) => dispatch(selectOrgDash(org))} orgBGColour="orgCardYellow" orgTextColour="orgTextBlack" />
        })
      }
    </div>
    </>
  )
}

const MapStateToProps = (state) => ({
  selectedOrg: state.orgInfo.orgDashInfo.selectedOrg
})

export default connect(MapStateToProps)(OrganisationDashboardContent)