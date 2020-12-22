import React from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'

import imagePlaceholder from '../../../../assets/Images/temp.jpg';

const OrgSponsoring = ({ org }) => {
  if (!org.sponsoring || org.sponsoring.length === 0) {
    return (
      <div className="orgCard orgCardE">
        <p style={{marginBottom: "0px"}}> You are not sponsoring any projects. </p>
      </div>
    )
  }

  return (
    <div className="orgCard orgCardE">
      <p> Projects you sponsor </p>
      {
        org.sponsoring.map((sponsor) => {
          return (
            <div key={sponsor._id} className="sponsorRequestCard">
              <img src={(sponsor.imageURL && sponsor.imageURL.length !== 0) ? sponsor.imageURL[0] : imagePlaceholder} alt="Logo" />
              <p className="sponsorRequestName"> {sponsor.name} </p>
              <Link to={`/projects/${sponsor.sponsorID}`}>
                <FontAwesomeIcon icon={faExternalLinkSquareAlt} size="2x" />
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default OrgSponsoring