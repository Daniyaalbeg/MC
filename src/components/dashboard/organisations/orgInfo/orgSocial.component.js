import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/pro-solid-svg-icons';

import SocialMediaIcons from '../../../sharedComponents/socialMediaIcons.component';
import WhichLogo from '../../../sharedComponents/whichLogo.component';

const OrgSocial = ({ org }) => {
  return (
    <div className="orgCard orgCardD">
      {org.websiteURL && (
        <>
        <p className="orgTitle"> Website </p>
        <a href={org.websiteURL} key={org.websiteURL} target="_blank" rel="noopener noreferrer" className="iconSpecific websiteIcon"> <FontAwesomeIcon icon={faGlobe}/></a>
        </>
      )
      }
      <SocialMediaIcons org={org} />
      <WhichLogo icon={org.facebookURL} />
      <WhichLogo icon={org.twitterURL} />
      <WhichLogo icon={org.instagramURL} />
    </div>
  )
}

export default OrgSocial
