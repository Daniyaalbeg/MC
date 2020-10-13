import React from 'react';

import ImageCarousel from '../../sharedComponents/imageCarousel.component';
import MainProjectAuthor from '../mainProjectAuthor.component';

const ProjectUpdatesPanel = ({ project }) => {
  if (!project.updates || project.updates.length === 0) {
    return <p className="mainProjectEmpty"> This project does not have any updates yet. </p>
  }

  return (
    <div className="mainProjectUpdatesContainer">
      {
        project.updates.map((update) => {
          return <ProjectUpdate key={update._id} update={update} project={project} />
        })
      }
    </div>
  )
}

const ProjectUpdate = ({ update, project }) => {
  return (
    <div className="mainProjectUpdate">
      <h3> {update.title} </h3>
      <MainProjectAuthor project={project} date={update.createdAt} />
      <p> {update.description} </p>
      <ImageCarousel images={update.images} width="100%" height="400px" />
    </div>
  )
}

export default ProjectUpdatesPanel