import React from 'react'

import HeaderIcons from '../HeaderIcons.component';
import ProjectContentView from './projectContentView.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram } from '@fortawesome/pro-solid-svg-icons'

const ProjectView = ({ orgsIdList }) => {
  return (
    <div className="projectViewContainer">
      {/* <div className="projectViewHeader">
        <div className="projectViewTextIcon">
          <FontAwesomeIcon icon={faProjectDiagram} />
          <p> Projects </p>
        </div>
        <HeaderIcons />
      </div> */}
      <div className="projectViewContent">
        <ProjectContentView />
      </div>
    </div>
  )
}

export default ProjectView