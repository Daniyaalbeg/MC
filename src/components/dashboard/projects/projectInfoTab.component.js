import React from 'react';

import ProjectInfoSponsorDonor from './infoTab/sponsorDonor.component';

import ImageCarousel from '../../sharedComponents/imageCarousel.component';
import { iconForText } from '../../iconController/iconCategories.component';

const ProjectInfoTab = ({ project }) => {

  return (
    <div className="projectDashInfoContainer">
      <div className="projectDashCard projectInfoCardA">
        <ProjectInfoAbout project={project} />
        <ProjectInfoCategory project={project} />
      </div>
      <div className="projectDashCard projectInfoCardB">
        <p className="projectTitle"> Images </p>
        <ImageCarousel images={project.images} height="90%" width="100%" />
      </div>
      <div className="projectDashCard projectInfoCardC">
        <ProjectInfoSolutionProblem project={project} />
      </div>
      <div className="projectDashCard projectInfoCardD">
        <ProjectInfoSponsorDonor project={project} />
      </div>
    </div>
  )
}

const ProjectInfoAbout = ({ project }) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 

  return (
    <>
      <p className="projectTitle"> Name </p>
      <p className="projectText"> {project.name} </p>
      <p className="projectTitle"> Tagline </p>
      <p className="projectText"> {project.tagline} </p>
      <p className="projectTitle"> Description </p>
      <p className="projectText"> {project.description} </p>
      <p className="projectTitle"> Ending on </p>
      <p> {new Date(project.completionDate).toLocaleDateString("en-US", dateOptions)} </p>
    </>
  )
}

const ProjectInfoCategory = ({ project }) => {
  if (!project.primaryCategory || !project.secondaryCategories) return null
  return (
    <>
      <p className="projectTitle"> Primary Category </p>
      <p className="projectText"> {iconForText(project.primaryCategory)} </p>
      <p className="projectTitle"> Secondary Categories </p>
      <div className="categoryBadgeContainer" style={{justifyContent: 'flex-start'}}>
        {
          project.secondaryCategories.map((category) => {
            return <span key={category}> {iconForText(category)} </span>
          })
        }
      </div>
    </>
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