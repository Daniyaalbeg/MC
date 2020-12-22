import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import SingleOrganisationInfo from './singleOrganisationInfo.component';
import OrganisationCard from './organisationCard.component';

import { selectOrgDash } from '../../../Actions/orgActions';

const OrganisationDashboardContent = ({ orgsIdList, selectedOrg, orgsDict }) => {

  if (selectedOrg) {
    return (
      <SingleOrganisationInfo org={orgsDict[selectedOrg]} />
    )
  } else {
    return <OrganisationCards orgsIdList={orgsIdList} orgsDict={orgsDict} />
  }
}

const OrganisationCards = ({ orgsIdList, orgsDict }) => {
  const dispatch = useDispatch()

  return (
    <>
    <div className="createNewOrganisationButton">
      <Link to="signupOrg"><button className="standardButtonWithoutColour mcYellowBG"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}} /> Create Organisation </button></Link>
    </div>
    <div className="cardsDashContainer">
      {
        orgsIdList.map((org) => {
          return <OrganisationCard org={orgsDict[org]} key={orgsDict[org]._id} setSelectedOrg={() => dispatch(selectOrgDash(org))} orgBGColour="orgCardYellow" orgTextColour="orgTextBlack" />
        })
      }
    </div>
    </>
  )
}

const MapStateToProps = (state) => ({
  selectedOrg: state.orgInfo.orgDashInfo.selectedOrg,
  orgsDict: state.userInfo.createdOrganisations
})

export default connect(MapStateToProps)(OrganisationDashboardContent)