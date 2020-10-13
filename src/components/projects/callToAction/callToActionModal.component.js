import React, { useState } from 'react';

import GenericModal from '../../sharedComponents/genericModal.component';
import LoginForm from '../../dashboard/loginForm.component';
import SubmitSupply from './submitSupply.component';
import ContributedMessage from './contributedMessage.component';

const CallToActionModal = ({ funding, volunteer, supply, login, auth, project, closeModal }) => {
  const [submitted, setSubmitted] = useState(null)

  if (login && !auth) {
    return (
      <GenericModal showModal={closeModal}>
        <div className="loginFormModalContainer">
          <LoginForm />
        </div>
      </GenericModal>
    )
  }

  if (submitted) {
    return (
      <GenericModal showModal={() => {
        setSubmitted(null)
        closeModal()
      }}>
        <ContributedMessage type={submitted} closeModal={() => {
          setSubmitted(null)
          closeModal()
        }} />
      </GenericModal>
    )
  }

  if (funding) {
    return (
      <GenericModal showModal={closeModal}>
        <p>a</p>
      </GenericModal>
    )
  }

  if (volunteer) {
    return (
      <GenericModal showModal={closeModal}>
        <p>Volunteer Sign Up</p>
      </GenericModal>
    )
  }

  if (supply) {
    return (
      <GenericModal showModal={closeModal}>
        <SubmitSupply project={project} setSubmitted={setSubmitted} />
      </GenericModal>
    )
  }
  
  return null
}

export default CallToActionModal