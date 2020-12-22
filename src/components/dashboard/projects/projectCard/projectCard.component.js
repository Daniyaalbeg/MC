import React from 'react';

import ProjectCardSheet from './projectCardSheet.component';
import imagePlaceholder from '../../../../assets/Images/temp.jpg';

const ProjectCard = ({ project, suppliesDict, volunteerDict, onClick }) => {
  let image = null
  if (project.images && project.images.length !== 0) {
    image = project.images[0]
  } else {
    image = imagePlaceholder
  }

  return (
    <div className="projectCardContainer">
      <div className="projectCardSheet">
        <ProjectCardSheet project={project} suppliesDict={suppliesDict} volunteerDict={volunteerDict} />
      </div>
      <div className="projectCard" onClick={onClick}>
        <div className="projectCardTop">
          <img src={image} />
        </div>
        <div className="projectCardBottom">
          <p> {project.name} </p>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard