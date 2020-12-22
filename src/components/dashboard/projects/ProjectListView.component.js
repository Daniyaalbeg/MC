import React from 'react'
import { Link } from 'react-router-dom';

import ProjectList from './projectList.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/pro-duotone-svg-icons';

const ProjectListView = ({ selectedOrgID, setSelectedOrgID, orgsDict }) => {
  if (!orgsDict[selectedOrgID].projects || orgsDict[selectedOrgID].projects.length === 0) {
    return <EmptyProjects selectedOrgID={selectedOrgID} setSelectedOrgID={setSelectedOrgID} />
  } else {
    return <ProjectList org={orgsDict[selectedOrgID]} setSelectedOrgID={setSelectedOrgID} />
  }
}

const EmptyProjects = ({ selectedOrgID, setSelectedOrgID }) => {
  return (
    <>
      <div className="headerButtonsContainer">
        <button className="standardButtonWithoutColour mcGreenBG" onClick={() => setSelectedOrgID(null)}> <FontAwesomeIcon icon={faChevronCircleLeft} style={{textAlign: 'left', marginRight: "0.3em"}}/> Back </button>
      </div>
      <div className="emptyDBContainer">
        <p> <FontAwesomeIcon icon={faExclamationTriangle} className="cnicExclamationIcon" /> No projects to display </p>
        <Link to={"createProject/" + selectedOrgID}><button className="standardButtonWithoutColour mcGreenBG"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}}/>  Create Project </button></Link>
      </div>
    </>
  )
}

export default ProjectListView