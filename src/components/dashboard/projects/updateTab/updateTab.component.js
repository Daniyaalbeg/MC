import React, { useState, useEffect } from 'react';

import GenericModal from '../../../sharedComponents/genericModal.component';
import UpdateListOrSelect from './updateListOrSelect.component';
import AddUpdateForm from './addUpdateForm.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const UpdateTab = ({ project, updatesDict }) => {
  const [addUpdateModal, setAddUpdateModal] = useState(false)

  if (!project.updates || project.updates.length === 0) {
    return (
      <>
      <div className="emptyDBContainer">
        <p> <FontAwesomeIcon icon={faExclamationTriangle} className="cnicExclamationIcon" style={{color: 'red'}} /> You have not created any updates's yet. </p>
        <button onClick={() => {
          setAddUpdateModal(true)
        }} className="standardButtonWithoutColour mcGreenBG"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}} /> Add Update </button>
      </div>
      {addUpdateModal &&
        <GenericModal showModal={setAddUpdateModal}>
          <AddUpdateForm project={project} showModal={setAddUpdateModal} />
        </GenericModal>
      }
      </>
    )
  } else {
    return <UpdateListOrSelect project={project} addUpdateModal={addUpdateModal} setAddUpdateModal={setAddUpdateModal} updatesDict={updatesDict} />
  }
}

export default UpdateTab