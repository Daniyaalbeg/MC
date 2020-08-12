import React from 'react';
import StandardCard from '../../sharedComponents/standardCard.component';

const OrganisationCard = ({ org, setSelectedOrg, orgBGColour, orgTextColour }) => {
  return (
    <div className={"orgCardDash grow " + orgBGColour} onClick={() => setSelectedOrg(org)}>
      <StandardCard name={org.name} image={org.imageURL} orgTextColour={orgTextColour} />
    </div>
  )
}

export default OrganisationCard