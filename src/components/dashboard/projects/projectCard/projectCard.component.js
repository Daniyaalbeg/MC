import React from 'react';

import ProjectCardSheet from './projectCardSheet.component';
import imagePlaceholder from '../../../../assets/Images/temp.jpg';

const ProjectCard = ({ project, setSelectedProject }) => {
  let image = null
  if (project.images && project.images.length !== 0) {
    image = project.images[0]
  } else {
    image = imagePlaceholder
  }

  return (
    <div className="projectCardContainer">
      <div className="projectCardSheet">
        <ProjectCardSheet project={project} />
      </div>
      <div className="projectCard" onClick={() => setSelectedProject(project)}>
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