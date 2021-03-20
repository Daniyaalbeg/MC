import React from "react";

import ProjectCardSheet from "./mainProjectCardSheet.component";
import imagePlaceholder from "../../../assets/Images/temp.jpg";

const ProjectCard = ({ project, onClick }) => {
  let image = null;
  if (project.images && project.images.length !== 0) {
    image = project.images[0];
  } else {
    image = imagePlaceholder;
  }

  return (
    <div className="mainProjectCardContainer">
      {/* <div className="mainProjectCardSheet">
        <ProjectCardSheet project={project} />
      </div> */}
      <div className="mainProjectCard" onClick={onClick}>
        <div className="mainProjectCardTop">
          <img src={image} />
        </div>
        <div className="mainProjectCardBottom">
          <p className="projectCardTitle"> {project.name} </p>
          <p className="projectCardSubtitle">
            {" "}
            {checkTaglineLength(project.tagline)}{" "}
          </p>
          <hr className="projectCardSeperator" />
          <div className="projectSheet">
            <ProjectCardSheet project={project} />
          </div>
          <p className="projectCardBy">
            {" "}
            By {project.createdByOrganisation.name}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

const checkTaglineLength = (tagline) => {
  if (!tagline) return null;
  if (tagline.length > 55) {
    return tagline.substring(0, Math.min(tagline.length, 55)) + "...";
  }
  return tagline;
};

export default ProjectCard;
