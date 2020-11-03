import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SponsorDonorModal from './sponsorDonorModal.component.js'
import { GenericModalPortal, GenericModalNew } from '../../../sharedComponents/genericModal.component';
import imagePlaceholder from '../../../../assets/Images/temp.jpg';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faExternalLinkSquareAlt } from '@fortawesome/pro-solid-svg-icons'

const SponsorDonor = ({ project }) => {
  const [showModal, setShowModal] = useState(null)

  return (
    <>
      <Sponsor project={project} setShowModal={setShowModal} />
      {/* <Donor project={project} setShowModal={setShowModal} /> */}
      {showModal &&
        <GenericModalPortal>
          <GenericModalNew scheme="light" showModal={() => setShowModal(null)}>
            <SponsorDonorModal project={project} showModal={showModal} setShowModal={setShowModal} />
          </GenericModalNew>
        </GenericModalPortal>
      }
    </>
  )
}

const Sponsor = ({ project, setShowModal }) => {
  if (!project.sponsors || project.sponsors.length === 0) {
    return (
      <div className="dashSponsorDonor">
        <p> This project has no sponsors </p>
        <button className="standardButtonWithoutColour mcGreenBG" onClick={() => {
          setShowModal("SPONSOR")
        }}> <FontAwesomeIcon icon={faPlus} /> Add Sponsor </button>
      </div>
    )
  } else {
    return (
      <div className="dashSponsorDonorHave">
        <div className="dashSponsorDonorHaveHeader">
          <p> Project Sponsors </p>
          <button className="standardButtonWithoutColour mcGreenBG grow" onClick={() => {
            setShowModal("SPONSOR")
          }}> <FontAwesomeIcon icon={faPlus} /> </button>
        </div>
        {
          project.sponsors.map((sponsor) => {
            return (
              <div key={sponsor._id} className="sponsorRequestCard">
                <img src={(sponsor.imageURL && sponsor.imageURL.length !== 0) ? sponsor.imageURL[0] : imagePlaceholder} alt="Logo" />
                <p className="sponsorRequestName"> {sponsor.name} </p>
                <Link to={`/organisations/${sponsor.sponsorID}`}>
                  <FontAwesomeIcon icon={faExternalLinkSquareAlt} size="2x" />
                </Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}

// const Donor = ({ project, setShowModal }) => {
//   if (!project.donors || project.donors.length === 0) return (
//     <div className="dashSponsorDonor">
//       <p> This project has no donors </p>
//       <button className="standardButtonWithoutColour mcGreenBG" onClick={() => {
//         setShowModal("DONOR")
//       }}> <FontAwesomeIcon icon={faPlus} /> Add Donor </button>
//     </div>
//   )
// }

export default SponsorDonor