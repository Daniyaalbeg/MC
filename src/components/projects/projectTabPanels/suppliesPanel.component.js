import React from "react";

import ProjectSupplyItem from "./projectSupplyItem.component";

const ProjectSuppliesPanel = ({ project }) => {
  if (!project.supplies || project.supplies.length === 0) {
    return (
      <p className="mainProjectEmpty">
        This project does not need any supplies.
      </p>
    );
  }

  return (
    <div className="mainProjectSuppliesContainer">
      <p className="mainProjectTitle"> Supplies Requested </p>
      {project.supplies.map((supply) => {
        return <ProjectSupplyItem key={supply._id} supply={supply} />;
      })}
    </div>
  );
};

export default ProjectSuppliesPanel;
