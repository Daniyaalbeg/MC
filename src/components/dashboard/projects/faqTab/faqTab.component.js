import React, { useState } from 'react';

import GenericModal from '../../../sharedComponents/genericModal.component';
import AddFaqForm from './addFaqForm.component';
import FaqListItem from './faqListItem.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const FaqTab = ({ project }) => {
  const [addFaqModal, setAddFaqModal] = useState(false)

  if (!project.faqs || project.faqs.length === 0) {
    return (
      <>
      <div className="emptyDBContainer">
        <p> <FontAwesomeIcon icon={faExclamationTriangle} className="cnicExclamationIcon" style={{color: 'red'}} /> You have not created any faq's yet. </p>
        <button onClick={() => setAddFaqModal(true)} className="standardButtonWithoutColour mcGreenBG"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}} /> Add FAQ </button>
      </div>
      {addFaqModal &&
        <GenericModal showModal={setAddFaqModal}>
          <AddFaqForm project={project} showModal={setAddFaqModal} />
        </GenericModal>
      }
      </>
    )
  } else {
    return (
      <FaqView project={project} addFaqModal={addFaqModal} setAddFaqModal={setAddFaqModal} />
    )
  }
}

const FaqView = ({ project, addFaqModal, setAddFaqModal }) => {
  return (
    <>
    <div className="headerButtonsContainerSingleRight">
      <span className="standardButtonWithoutColour mcGreenBG" onClick={() => setAddFaqModal(true)}> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}}/>  Add FAQ </span>
    </div>
    <div className="projectDashFaqList">
      {
        project.faqs.map((faq) => {
          return <FaqListItem key={faq._id} faq={faq} project={project} />
        })
      }
    </div>
    {addFaqModal &&
        <GenericModal showModal={setAddFaqModal}>
          <AddFaqForm project={project} showModal={setAddFaqModal} />
        </GenericModal>
      }
    </>
  )
}

export default FaqTab