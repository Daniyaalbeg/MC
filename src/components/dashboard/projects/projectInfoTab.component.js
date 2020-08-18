import React from 'react';

import ImageCarousel from '../../sharedComponents/imageCarousel.component';

const ProjectInfoTab = ({ project }) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 

  return (
    <div className="projectDashInfoContainer">
      <div className="projectDashCard projectInfoCardA">
        <p className="projectTitle"> Name </p>
        <p className="projectText"> {project.name} </p>
        <p className="projectTitle"> Description </p>
        <p className="projectText"> {project.description} </p>
        <p className="projectTitle"> Ending on </p>
        <p> {new Date(project.completionDate).toLocaleDateString("en-US", dateOptions)} </p>
      </div>
      <div className="projectDashCard projectInfoCardB">
        <p className="projectTitle"> Images </p>
        <ImageCarousel images={project.images} />
      </div>
      <div className="projectDashCard projectInfoCardC">
        <ProjectInfoSolutionProblem project={project} />
      </div>
    </div>
  )
}

const ProjectInfoSolutionProblem = ({ project }) => {
  return (
    <>
      <p className="projectTitle"> Problem </p>
      <p className="projectText"> {project.problem} </p>
      <p className="projectTitle"> Solution </p>
      <p className="projectText"> {project.solution} </p>
    </>
  )
}

export default ProjectInfoTab;