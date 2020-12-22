import React from 'react';

import ProgressCircle from '../../../sharedComponents/progressCircle.component';
import { calculateSupplyPercent, calculateFundingPercent, calculateVolunteersPercent } from '../../../utilities/projectUtils.component';

const ProjectCardSheet = ({ project, suppliesDict, volunteerDict }) => {
  let renderedCircleFunction = null
  let renderedCircleSupplies = null
  let renderedCircleVolunteers = null

  if (project.funding) {
    renderedCircleFunction = (<ProgressInfo key="1" text="Funding" progress={calculateFundingPercent(project)} colour={"#FFD71A"} />)
  }
  if (project.supplies && project.supplies.length !== 0) {
    renderedCircleSupplies = (<ProgressInfo key="2" text="Supplies" progress={calculateSupplyPercent(project, suppliesDict)} colour={"#1589C9"} />)
  }
  if (project.volunteeringInfo) {
    renderedCircleVolunteers = (<ProgressInfo key="3" text="Volunteers" progress={calculateVolunteersPercent(project, volunteerDict)} colour={"#EF2A30"} />)
  }

  const renderedCircles = [ renderedCircleFunction, renderedCircleSupplies, renderedCircleVolunteers]

  if (renderedCircles.every(element => element === null)) {
    return <p className="emptyProjectSheet"> No Info </p>
  }

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

export default ProjectCardSheet