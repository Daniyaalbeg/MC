import React from 'react';
import StandardCard from '../sharedComponents/standardCard.component';

const OrganisationCnicCard = ({ org, setSelectedOrg }) => {
  return (
    <div className="orgCnicCard grow" onClick={() => setSelectedOrg(org)}>
      <StandardCard name={org.name} image={org.imageURL} />
    </div>
  )
}

export default OrganisationCnicCard