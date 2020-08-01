import React from 'react';
import StandardCard from '../../sharedComponents/standardCard.component';

const OrganisationCard = ({ org, setSelectedOrg }) => {
  return (
    <div className="orgCardDash grow" onClick={() => setSelectedOrg(org)}>
      <StandardCard name={org.name} image={org.imageURL} />
    </div>
  )
}

export default OrganisationCard