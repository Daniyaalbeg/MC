import React from 'react';

import ProgressCircle from '../../../sharedComponents/progressCircle.component';

const ProjectCardSheet = ({ project }) => {
  let renderedCircleFunction = null
  let renderedCircleSupplies = null
  let renderedCircleVolunteers = null

  if (project.funding || true) {
    renderedCircleFunction = (<ProgressInfo key="1" text="Funding" progress={82} colour={"#FFD71A"} />)
  }
  if (true || project.supplies && project.supplies.length !== 0) {
    renderedCircleSupplies = (<ProgressInfo key="2" text="Supplies" progress={78} colour={"#1589C9"} />)
  }
  if (project.volunteer || true) {
    renderedCircleVolunteers = (<ProgressInfo key="3" text="Volunteers" progress={46} colour={"#EF2A30"} />)
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

export default ProjectCardSheet