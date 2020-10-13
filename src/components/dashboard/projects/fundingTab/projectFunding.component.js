import React, { useState } from 'react';

import ProjectFundingForm from './projectFundingForm.component';
import ProjectFundingInfo from './projectFundingInfo.component';

const ProjectFunding = ({ project }) => {
  const [editing, setEditing] = useState(false)

  if (editing || !project.funding) {
    return <ProjectFundingForm project={project} setEditing={setEditing} />
  } else {
    return <ProjectFundingInfo project={project} setEditing={setEditing} />
  }
}



export default ProjectFunding