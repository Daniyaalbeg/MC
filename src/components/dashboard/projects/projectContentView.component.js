import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import OrgSelection from './orgSelection.component'
import ProjectListView from './ProjectListView.component'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/pro-duotone-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ProjectContentView = ({ orgsIdList, orgsDict }) => {
  if (!orgsIdList || orgsIdList.length === 0) {
    return (
      <div className="emptyDBContainer">
        <p> <FontAwesomeIcon icon={faExclamationTriangle} className="cnicExclamationIcon" /> You have not created any organisations yet. </p>
        <Link to="signupOrg"><button className="standardButtonWithoutColour mcGreenBG"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}} /> Create Organisation </button></Link>
      </div>
    )
  } else {
    return (
      <OrgSelection orgsIdList={orgsIdList} orgsDict={orgsDict} orgBGColour="orgCardGreen" orgTextColour="orgTextWhite" >
        <ProjectListView />
      </OrgSelection>
    )
  }
}

const MapStateToProps = (state) => ({
  orgsIdList: state.userInfo.entityIds.createdOrganisations,
  orgsDict: state.userInfo.createdOrganisations,
})

export default connect(MapStateToProps)(ProjectContentView)