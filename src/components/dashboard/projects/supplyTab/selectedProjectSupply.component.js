import React from 'react';
import { useDispatch } from 'react-redux';

import ProjectSupplyReceivedList from './projectSupplyReceivedListItem.component';
import ProjectCardDashProgressInfo from '../../../sharedComponents/projectCardDashProgressRing';
import {  selectProjectDashSupply } from '../../../../Actions/projectActions'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

const SelectedProjectSupply = ({ project, supply }) => {
  const dispatch = useDispatch()

  return (
    <>
    <div className="headerButtonsContainer">
      <button className="standardButtonWithoutColour mcGreenBG" onClick={() => dispatch(selectProjectDashSupply(null))}> <FontAwesomeIcon icon={faChevronCircleLeft} style={{textAlign: 'left', marginRight: "0.3em"}}/> Back </button>
    </div>
    <div className="projectDashSupplyContainer">
      <div className="projectDashCard projectSupplyCardA">
        <ProjectCardDashProgressInfo empty={false} title={'Total Received'} percent={supply.amountReceived/supply.amountNeeded*100} colour={'#1589C9'} />
      </div>
      <div className="projectDashCard projectSupplyCardB">
        <ProjectSupplyDetails supply={supply} />
      </div>
      <div className="projectDashCard projectSupplyCardC">
        <p className="projectTitle"> Description </p>
        <p className="projectText"> {supply.description} </p>
      </div>
      <div className="projectSupplyCardD">
        <ProjectSupplyReceivedList project={project} supply={supply} />
      </div>
    </div>
    </>      
  )
}

const ProjectSupplyDetails = ({ supply }) => {
  return (
    <>
    <p className="projectTitle"> Name </p>
    <p className="projectText"> {supply.name} </p>
    <p className="projectTitle"> Received </p>
    <p className="projectText"> {supply.amountReceived} </p>
    <p className="projectTitle"> Needed </p>
    <p className="projectText"> {supply.amountNeeded} </p>
    </>
  )
}

export default SelectedProjectSupply