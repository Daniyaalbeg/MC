import React, { useState } from 'react';

import CallToActionModal from './callToActionModal.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHelping, faMoneyBillWave, faBox } from '@fortawesome/pro-solid-svg-icons'

const CallToActionButtonViews = ({ project, setActiveTab, auth }) => {
  const [showFundingModal , setShowFundingModal] = useState(false)
  const [showVolunteerModal , setShowVolunteerModal] = useState(false)
  const [showSupplyModal , setShowSupplyModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <div className="callToActionProgressButtons">
    {project.funding &&
      <button className="standardButtonWithoutColour mcGreenBG" onClick={() => {
        setActiveTab(1);
        // if (auth) {
        //   setShowFundingModal(true)
        // } else {
        //   setShowLoginModal(true)
        // }
      }}> <FontAwesomeIcon icon={faMoneyBillWave} style={{marginRight: "8px"}} /> Donate Funds </button>
    }
    {project.volunteers &&
      <button onClick={() => {
        if (auth) {
          setShowVolunteerModal(true)
        } else {
          setShowLoginModal(true)
        }
      }} className="standardButtonWithoutColour mcRedOrange"> <FontAwesomeIcon icon={faHandsHelping} style={{marginRight: "8px"}} /> Volunteer Time </button>
    }
    {project.supplies &&
      <button onClick={() => {
        if (auth) {
          setShowSupplyModal(true)
        } else {
          setShowLoginModal(true)
        }
      }} className="standardButtonWithoutColour mcBlueBG"> <FontAwesomeIcon icon={faBox} style={{marginRight: "8px"}} /> Contribute Supplies </button>
    }
    <CallToActionModal login={showLoginModal} auth={auth} funding={showFundingModal} volunteer={showVolunteerModal} supply={showSupplyModal} project={project} closeModal={() => closeModal(setShowFundingModal, setShowSupplyModal, setShowVolunteerModal, setShowLoginModal)} />
    </div>
  )
}

const closeModal = (setShowFunding, setShowVolunteer, setShowSupply, setShowLoginModal) => {
  setShowFunding(false)
  setShowVolunteer(false)
  setShowSupply(false)
  setShowLoginModal(false)
}

export default CallToActionButtonViews