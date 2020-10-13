import React from 'react';

import MapForDisplay from '../../sharedComponents/mapForDisplay.component';

const ProjectInfoPanel = ({ project }) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 

  return (
    <div className="mainProjectInfoContainer">
      <div className="mainProjectInfoContainerLeft">
        <p className="mainProjectTitle"> Problem </p>
        <p className="mainProjectText"> {project.problem} </p>
        <p className="mainProjectTitle"> Solution </p>
        <p className="mainProjectText"> {project.solution} </p>
        <p className="mainProjectTitle"> Description </p>
        <p className="mainProjectText"> {project.description} </p>
        <p className="mainProjectTitle"> Contact Info </p>
        <p className="mainProjectText"> {project.createdByOrganisation.contactName} ({project.createdByOrganisation.contactNumber}) </p>
        <p className="mainProjectTitle"> Date </p>
        <p className="mainProjectText"> {new Date(project.completionDate).toLocaleDateString("en-US", dateOptions)} </p>
      </div>
      <div className="mainProjectInfoContainerRight">
        <MapForDisplay location={project.location} />
      </div>
    </div>
  )
}

export default ProjectInfoPanel