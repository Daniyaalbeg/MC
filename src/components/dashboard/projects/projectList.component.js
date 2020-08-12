import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import imagePlaceholder from '../../../assets/Images/temp.jpg';
import ProgressCircle from '../../sharedComponents/progressCircle.component';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from '@fortawesome/pro-solid-svg-icons';

const ProjectList = ({ org, setSelectedOrg }) => {
  const [selectedProject, setSelectedProject] = useState(null)
  
  if (selectedProject) {
    return <SelectedProjectView project={selectedProject} setSelectedProject={setSelectedProject} />
  } else {
    return (
      <>
      <div className="headerButtonsContainer">
        <button className="standardButtonWithoutColour mcGreenBG" onClick={() => setSelectedOrg(null)}> <FontAwesomeIcon icon={faChevronCircleLeft} style={{textAlign: 'left', marginRight: "0.3em"}}/> Back </button>
        <Link to={"createProject/" + org._id}><button className="standardButtonWithoutColour mcGreenBG"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}}/>  Create Project </button></Link>
      </div>
      <div className="cardsDashContainer">
        {
          org.projects.map((project) => {
            return <ProjectCard key={project._id} project={project} setSelectedProject={setSelectedProject} />
          })
        }
      </div>
      </>
    )
  }
}

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

const ProjectCardSheet = ({ project }) => {
  let renderedCircleFunction = null
  let renderedCircleSupplies = null
  let renderedCircleVolunteers = null

  if (project.funding || true) {
    renderedCircleFunction = (<ProgressInfo text="Funding" progress={82} colour={"#FFD71A"} />)
  }
  if (true || project.supplies && project.supplies.length !== 0) {
    renderedCircleSupplies = (<ProgressInfo text="Supplies" progress={78} colour={"#1589C9"} />)
  }
  if (project.volunteer || true) {
    renderedCircleVolunteers = (<ProgressInfo text="Volunteers" progress={46} colour={"#EF2A30"} />)
  }

  const renderedCircles = [ renderedCircleFunction, renderedCircleSupplies, renderedCircleVolunteers]

  return renderedCircles
}

const ProgressInfo = ({ text, progress, colour }) => {
  return (
    <div className="progressCircleContainer">
      <ProgressCircle
        size={50}
        progress={progress}
        strokeWidth={12}
        circleStrokeBg={"#ffffff"}
        circleStroke={colour}
        initalOffset={100}
      />
      <p> {text} </p>
    </div>
  )
}

const SelectedProjectView = ({ project, setSelectedProject }) => {
  return (
    <>
    <div className="headerButtonsContainer">
        <button className="standardButtonWithoutColour mcGreenBG" onClick={() => setSelectedProject(null)}> <FontAwesomeIcon icon={faChevronCircleLeft} style={{textAlign: 'left', marginRight: "0.3em"}}/> Back </button>
      </div>
    <div className="singleProjectContainerDash">
      <div className="projectInfoDash growSmall"> Project Info </div>
      <div className="projectFundingDash growSmall">
        <ProjectCardDashProgressInfo empty={project.funding} title="Funding" colour="#FFD71A" />
      </div>
      <div className="projectSuppliesDash growSmall">
        <ProjectCardDashProgressInfo empty={project.supplies && project.supplies.length !== 0} title="Supplies" colour="#1589C9" />
      </div>
      <div className="projectVolunteersDash growSmall">
        <ProjectCardDashProgressInfo empty={true} title="Volunteers" colour="#EF2A30" />
      </div>
      <div className="projectCommentsDash growSmall"> Comments </div>
      <div className="projectUpdatesDash growSmall"> Updates </div>
      <div className="projectFaqDash growSmall"> FAQ </div>
      <div className="projectCategoriesDash growSmall"> Categories </div>
      <div className="projectPublish growSmall"> Publish </div>
    </div>
    </>
  )
}

const ProjectCardDashProgressInfo = ({ empty, title, colour }) => {
  if (!empty) {
    return (
      <>
      <FontAwesomeIcon className="projectCardAddIcon" icon={faPlus} size="1x" style={{ color: colour, borderColor: colour }} />
      <p className="projectCardSmallTitle"> Add {title} </p>
      </>
    )
  } else {
    return (
      <>
      <ProgressCircle
          size={60}
          progress={74}
          strokeWidth={12}
          circleStrokeBg={"#ffffff"}
          circleStroke={colour}
          initalOffset={160}
      />
      <p className="projectCardSmallTitle"> {title} </p>
      </>
    )
  }
}

export default ProjectList