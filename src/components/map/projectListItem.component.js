import React from 'react';

import { getIcon } from '../iconController/iconCategories.component';

const ProjectListItem = ({ project }) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 
  return (
      <div className="list-view-container">
        <div className="list-left">
          {getIcon(project.primaryCategory, "list-left-image")}
        </div>
        <div className="list-right">
          <p className="eventListTitle"> {project.name} </p>
          <p className="eventListDate"> {new Date(project.completionDate).toLocaleDateString("en-US", dateOptions)} </p>
        </div>
      </div>
  )
}

export default ProjectListItem