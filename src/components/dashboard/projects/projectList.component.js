import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SelectedProjectView from './selectedProjectView.component';
import ProjectCard from './projectCard/projectCard.component';

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

export default ProjectList