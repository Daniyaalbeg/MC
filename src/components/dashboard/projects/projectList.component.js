import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SelectedProjectView from './selectedProjectView.component';
import ProjectCard from './projectCard/projectCard.component';

import { selectProjectDash } from '../../../Actions/projectActions'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from '@fortawesome/pro-solid-svg-icons';

const ProjectList = ({ dispatch, org, setSelectedOrgID, selectedProjectID, projectDict, suppliesDict, volunteerDict, volunteerRequestDict, updatesDict }) => {
  if (selectedProjectID) {
    return <SelectedProjectView project={projectDict[selectedProjectID]} suppliesDict={suppliesDict} volunteerDict={volunteerDict} volunteerRequestDict={volunteerRequestDict} updatesDict={updatesDict} />
  } else {
    return (
      <>
        <div className="headerButtonsContainer">
          <button className="standardButtonWithoutColour mcGreenBG" onClick={() => setSelectedOrgID(null)}> <FontAwesomeIcon icon={faChevronCircleLeft} style={{textAlign: 'left', marginRight: "0.3em"}}/> Back </button>
          <Link to={"createProject/" + org._id}><button className="standardButtonWithoutColour mcGreenBG"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}}/>  Create Project </button></Link>
        </div>
        <div className="cardsDashContainer">
          {
            org.projects.map((projectID) => {
              return <ProjectCard key={projectID} project={projectDict[projectID]} suppliesDict={suppliesDict} volunteerDict={volunteerDict} onClick={() => dispatch(selectProjectDash(projectID))} />
            })
          }
        </div>
      </>
    )
  }
}

const MapStateToProps = (state) => ({
  selectedProjectID: state.projectInfo.createProject.selectedProjectDashBoardID,
  projectDict: state.userInfo.projects,
  suppliesDict: state.userInfo.supplies,
  volunteerDict: state.userInfo.volunteeringInfo,
  volunteerRequestDict: state.userInfo.volunteerRequests,
  updatesDict: state.userInfo.updates,
  //TODO:add funding dict
})

export default connect(MapStateToProps)(ProjectList)