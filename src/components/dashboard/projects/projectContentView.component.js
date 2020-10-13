import React from 'react'
import { Link } from 'react-router-dom'

import OrgSelection from './orgSelection.component'
import ProjectListView from './ProjectListView.component'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/pro-duotone-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ProjectContentView = ({ orgs }) => {
  if (!orgs || orgs.length === 0) {
    return (
      <div className="emptyDBContainer">
        <p> <FontAwesomeIcon icon={faExclamationTriangle} className="cnicExclamationIcon" /> You have not created any organisations yet. </p>
        <Link to="signupOrg"><button className="standardButtonWithoutColour mcGreenBG"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}} /> Create Organisation </button></Link>
      </div>
    )
  } else {
    return (
      <OrgSelection orgs={orgs} orgBGColour="orgCardGreen" orgTextColour="orgTextWhite" >
        <ProjectListView />
      </OrgSelection>
    )
  }
}

export default ProjectContentView