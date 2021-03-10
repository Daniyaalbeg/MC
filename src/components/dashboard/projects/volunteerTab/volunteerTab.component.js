import React, { useState } from 'react';

import GenericModal from '../../../sharedComponents/genericModal.component';
import ProjectVolunteerRequestForm from './projectVolunteerRequestForm.component';
import VolunteerInfo from './volunteerInfo.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const VolunteerTab = ({ project, volunteerRequestDict, volunteerDict }) => {
  const [addVolunteerInfoModal, setAddVolunteerModal] = useState(false)

  if (!project.volunteeringInfo) {
    return (
      <>
      <div className="emptyDBContainer">
        <p> <FontAwesomeIcon icon={faExclamationTriangle} className="cnicExclamationIcon" style={{color: 'red'}} /> You have not created a volunteer request yet. </p>
        <button onClick={() => {
          setAddVolunteerModal(true)
        }} className="standardButtonWithoutColour mcGreenBG"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}} /> Create Volunteer Request </button>
      </div>
      {addVolunteerInfoModal &&
        <GenericModal showModal={setAddVolunteerModal}>
          <ProjectVolunteerRequestForm project={project} showModal={setAddVolunteerModal} />
        </GenericModal>
      }
      </>
    )
  } else {
    return <VolunteerInfo volunteer={volunteerDict[project.volunteeringInfo]} volunteerRequestDict={volunteerRequestDict} />
  }
}

export default VolunteerTab