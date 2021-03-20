import React from "react";

import ProgressCircle from "../../sharedComponents/progressCircle.component";
import {
  calculateSupplyPercentPublic,
  calculateFundingPercentPublic,
  calculateVolunteersPercentPublic,
} from "../../utilities/projectUtils.component";

const ProjectCardSheet = ({ project }) => {
  let renderedCircleFunction = null;
  let renderedCircleSupplies = null;
  let renderedCircleVolunteers = null;

  if (project.funding) {
    renderedCircleFunction = (
      <ProgressInfo
        key="1"
        text="Funding"
        progress={calculateFundingPercentPublic(project)}
        colour={"#FFD71A"}
      />
    );
  }
  if (project.supplies && project.supplies.length !== 0) {
    renderedCircleSupplies = (
      <ProgressInfo
        key="2"
        text="Supplies"
        progress={calculateSupplyPercentPublic(project)}
        colour={"#1589C9"}
      />
    );
  }
  if (project.volunteeringInfo && project.volunteeringInfo.volunteersNeeded) {
    renderedCircleVolunteers = (
      <ProgressInfo
        key="3"
        text="Volunteers"
        progress={calculateVolunteersPercentPublic(project)}
        colour={"#EF2A30"}
      />
    );
  }

  const renderedCircles = [
    renderedCircleFunction,
    renderedCircleSupplies,
    renderedCircleVolunteers,
  ];

  if (renderedCircles.every((element) => element === null)) {
    return <p className="emptyProjectSheet"> No Info </p>;
  }

  return renderedCircles;
};

const ProgressInfo = ({ text, progress, colour }) => {
  return (
    <div className="progressCircleContainer">
      <ProgressCircle
        size={50}
        progress={progress === 0 ? 1 : progress}
        strokeWidth={12}
        circleStrokeBg={"#f1f1f1"}
        circleStroke={colour}
        initalOffset={119}
      />
      <p> {text} </p>
    </div>
  );
};

export default ProjectCardSheet;
