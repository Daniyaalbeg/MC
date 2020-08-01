import React from 'react';
import { Link } from 'react-router-dom';

import HeaderIcons from '../HeaderIcons.component';

import OrganisationDashboardContent from './organisationDashboardContent.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSitemap } from '@fortawesome/pro-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/pro-duotone-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const OrganisationInfoViewDash = ({ orgs }) => {
  if (!orgs || orgs.length === 0) {
    return (
      <div className="supplierInfoContainer">
        <div className="supplierInfoHeader">
          <div className="supplierTextIcon">
            <FontAwesomeIcon icon={faSitemap} />
            <p> Organisation </p>
          </div>
          <HeaderIcons />
        </div>
        <div className="supplierInfoContent">
          <div className="emptyDBContainer">
            <p> <FontAwesomeIcon icon={faExclamationTriangle} className="cnicExclamationIcon" /> You have not created an organisation yet. </p>
            <Link to="signupOrg"><button className="standardButtonWithoutColour mcYellowBG mcBlack"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}} /> Create Organisation </button></Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="supplierInfoContainer">
      <div className="supplierInfoHeader">
        <div className="supplierTextIcon">
          <FontAwesomeIcon icon={faSitemap} />
          <p> Organisation </p>
        </div>
        <HeaderIcons />
      </div>
      <div className="supplierInfoContent">
        <OrganisationDashboardContent orgs={orgs} />
      </div>
    </div>
  )
}

export default OrganisationInfoViewDash