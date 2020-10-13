import React from 'react';

import ImagePlaceholder from '../../assets/Images/temp.jpg'
import { formatDate } from '../utilities/dateUtilities.component';


const MainProjectAuthor = ({ project, date }) => {
  return (
    <div className="mainProjectAuthor">
      { project.createdByOrganisation.imageURL ?
        <img src={project.createdByOrganisation.imageURL} alt="Organisation Logo" />
        :
        <img src={ImagePlaceholder} alt="Organisation Logo" />
      }
      <div>
        <p> {project.createdByOrganisation.name} </p>
        <p> {formatDate(date, true, '/')} </p>
      </div>
    </div>
  )
}

export default MainProjectAuthor