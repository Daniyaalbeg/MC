import React from 'react';

import UpdateListItem from './updateListItem.component';
import GenericModal from '../../../sharedComponents/genericModal.component';
import AddUpdateForm from './addUpdateForm.component';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const UpdateList = ({ project, updatesDict, setSelectedUpdate, addUpdateModal, setAddUpdateModal }) => {
  return (
    <>
    <div className="headerButtonsContainerSingleRight">
      <button onClick={() => {
        setAddUpdateModal(true)
      }} className="standardButtonWithoutColour mcGreenBG"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}} /> Add Update </button>
    </div>
    <div>
      {
        project.updates.map((update) => {
          return <UpdateListItem key={update} update={updatesDict[update]} onClick={() => setSelectedUpdate(update)} />
        })
      }
    </div>
    {addUpdateModal &&
      <GenericModal showModal={setAddUpdateModal}>
        <AddUpdateForm project={project} showModal={setAddUpdateModal} />
      </GenericModal>
    }
    </>
  )
}

export default UpdateList