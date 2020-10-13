import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SelectedProjectView from './selectedProjectView.component';
import ProjectCard from './projectCard/projectCard.component';

import { selectProjectDash } from '../../../Actions/projectActions'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from '@fortawesome/pro-solid-svg-icons';

const ProjectList = ({ dispatch, org, setSelectedOrg, selectedProject }) => {
  if (selectedProject) {
    return <SelectedProjectView project={selectedProject} />
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
              return <ProjectCard key={project._id} project={project} onClick={() => dispatch(selectProjectDash(project))} />
            })
          }
        </div>
      </>
    )
  }
}

const MapStateToProps = (state) => ({
  selectedProject: state.projectInfo.createProject.selectedProjectDashBoard
})

export default connect(MapStateToProps)(ProjectList)